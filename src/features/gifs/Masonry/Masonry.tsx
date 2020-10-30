import React from "react";
import { FlexRow, FlexColumn } from "foundations/components/layout";

export interface Size {
  width: number;
  height: number;
}

type getSizeForItem<T> = (item: T) => Size;

const layoutItems = <T extends {}>(
  items: T[],
  columns: number,
  getSizeForItem: getSizeForItem<T>,
  prevHeights?: number[],
  prevBaseline?: number
): [T[][], number[], number] => {
  const columnData: T[][] = new Array(columns).fill(null).map(() => []);
  const heights = prevHeights || new Array(columns).fill(0);
  let baseline = prevBaseline || 1000;
  // sort into columns with masonry math
  let position = 0;
  let itemIndex = 0;

  if (items.length === 0) {
    return [columnData, heights, baseline];
  }

  // continue until all items are placed
  while (true) {
    const item = items[itemIndex];
    const fullHeight = getSizeForItem(item).height;
    const threshold = fullHeight * 0.5;

    // test if the item fits in the current row
    if (heights[position] + threshold < baseline) {
      // place item
      columnData[position].push(item);
      heights[position] += fullHeight;
      // after placing, move to the next item and next row
      itemIndex++;
    }

    position++;
    // all items placed
    if (itemIndex >= items.length) {
      break;
    }

    if (position === columns) {
      // loop around
      position = 0;
      // recalculate baseline
      const newBaseline = heights.reduce((a, b) => (a > b ? a : b));
      // prevent infinite loop
      if (newBaseline === baseline) {
        baseline = newBaseline + getSizeForItem(items[itemIndex]).height;
      } else {
        baseline = newBaseline;
      }
    }
  }
  return [columnData, heights, baseline];
};

// organize by column instead of by page
const byColumn = <T extends {}>(finalColumns: T[][][], columns: number) => {
  return finalColumns.reduce((combined, page) => {
    page.forEach((column, index) => {
      combined[index].push(column);
    });
    return combined;
  }, new Array(columns).fill(null).map(() => []) as T[][][]);
};

type RenderItem<T> = (item: T, key: string) => React.ReactNode;
// all the gifs in one page that go in the same column
interface BatchProps<T> {
  items: T[];
  id: string;
  render: RenderItem<T>;
}

const Batch = <T extends {}>({ items, id, render }: BatchProps<T>) => {
  return <>{items.map((item, index) => render(item, `${id}.${index}`))}</>;
};

interface MasonryProps<T> {
  groupedItems: T[][];
  columns: number;
  // changing the value of reset key indicates existing pages should be invalidated
  reset: string;
  getSizeForItem: getSizeForItem<T>;
  render: RenderItem<T>;
}

// React.memo doesn't work with generics, so we have to workaround it a bit
const typed = <T extends {}>() => {
  const MemoBatch = (React.memo(Batch, (old, current) => {
    // if the id changes, the masonry has recieved completely new content
    return old.id === current.id && old.items.length === current.items.length;
  }) as unknown) as React.FC<BatchProps<T>>;

  const Masonry = ({
    groupedItems,
    columns,
    reset,
    getSizeForItem,
    render
  }: MasonryProps<T>) => {
    // layout each page using reisdual space from previous set
    const finalColumns: T[][][] = [];
    let heights: number[] = new Array(columns).fill(0);
    let baseline = 1000;
    for (const page of groupedItems) {
      const [columnData, newHeights, newBaseline] = layoutItems(
        page,
        columns,
        getSizeForItem,
        heights,
        baseline
      );
      finalColumns.push(columnData);
      baseline = newBaseline;
      heights = newHeights;
    }
    const sorted = byColumn(finalColumns, columns);
    // render split columns
    return (
      <FlexRow alignItems="flex-start" justifyContent="space-between">
        {sorted.map((column, index) => {
          return (
            <FlexColumn
              key={`col-${index}`}
              maxWidth={`calc(${100 / columns}% - 5px)`}
            >
              {column.map((items, batch) => (
                <MemoBatch
                  key={`col-${index}.batch-${batch}`}
                  id={reset}
                  items={items}
                  render={render}
                />
              ))}
            </FlexColumn>
          );
        })}
      </FlexRow>
    );
  };

  return (React.memo(Masonry) as unknown) as React.FC<MasonryProps<T>>;
};

export { typed };
