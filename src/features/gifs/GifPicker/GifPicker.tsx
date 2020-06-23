import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  Search,
  Marker,
  Results,
  Column,
  Group,
  Scroll,
  Attribution,
} from "./GifPicker.style";
import { PlaceholderMessage, placeholderMessages } from "./PlaceholderMessage";
import { IGif } from "@giphy/js-types";
import { Gif, GifSize } from "../Gif";
import { useVisibility } from "foundations/hooks/useVisibility";
import { useDebounce } from "foundations/hooks/useDebounce";
import attribution from "features/messages/GiphyMessageDisplay/attribution.png";

// separate an array into count subarrays
const splitColumns = <T,>(page: T[], count: number) => {
  return page.reduce((columns, item, index) => {
    columns[index % count].push(item);
    return columns;
  }, new Array(count).fill(0).map((v) => []) as T[][]);
};

const PAGE_SIZE = 24;
// make a request to the giphy search api
const search = async (query: string, page: number): Promise<IGif[]> => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        process.env.REACT_APP_GIPHY_API_KEY
      }&q=${encodeURIComponent(query)}&limit=${PAGE_SIZE}&offset=${
        page * PAGE_SIZE
      }&rating=G&lang=en`
    );
    const results = (await response.json()) as { data: IGif[] };
    return results.data;
  } catch {
    // fail softly
    return [];
  }
};

// hook to fetch gifs with paging and waiting status (wether page should be allowed to incriment)
const useGifs = (query: string, page: number): [boolean, IGif[][] | null] => {
  const [gifs, setGifs] = useState<IGif[][] | null>(null);
  const [waiting, setWaiting] = useState(false);

  // reset when the query changes
  useEffect(() => {
    setGifs(null);
  }, [query]);

  useEffect(() => {
    let mounted = true;
    let scheduled: number;

    (async () => {
      // query cannot be empty
      if (query.length < 1) {
        return;
      }
      setWaiting(true);
      const data = await search(query, page);
      // add the retrived gifs to the results
      if (mounted) {
        // split the page into two columns and add
        setGifs((gifs) =>
          (gifs && page > 0 ? gifs : []).concat(splitColumns<IGif>(data, 2))
        );
        // add a buffer on the end before marking as loaded
        scheduled = setTimeout(() => {
          mounted && setWaiting(false);
        }, 500);
      }
    })();

    // prevent state updates aginst unmounted component
    return () => {
      mounted = false;
      if (scheduled) {
        clearTimeout(scheduled);
      }
    };
  }, [page, query]);

  return [waiting, gifs];
};

// chunking the results allows for minimal rerenders as gifs are added

// all the gifs from a request that should go into a single column (i.e. half the results)
const ResultsGroup = React.memo(
  ({
    results,
    container,
    id,
    onSelected,
  }: {
    results: IGif[];
    container: React.RefObject<HTMLDivElement>;
    id: number;
    onSelected: onClickHandler;
  }) => {
    return (
      <Group>
        {results.map((gif, index) => (
          <Gif
            gif={gif}
            size={GifSize.Preview}
            onClick={onSelected}
            key={`gif-results.group.${id}.gif.${index}`}
            container={container}
          />
        ))}
      </Group>
    );
  }
);

// all of the groups that go in the same column
const ResultsColumn = ({
  results,
  container,
  id,
  markerRef,
  onSelected,
}: {
  results: IGif[][];
  container: React.RefObject<HTMLDivElement>;
  id: number;
  markerRef: React.RefObject<HTMLDivElement>;
  onSelected: onClickHandler;
}) => {
  return (
    <Column>
      {results.map((column, index) => (
        <ResultsGroup
          results={column}
          container={container}
          id={id + 2 * index}
          key={`gif-results.column.${id}.group.${index}`}
          onSelected={onSelected}
        ></ResultsGroup>
      ))}
      <Marker ref={markerRef} />
    </Column>
  );
};

const SearchResults = React.memo(
  ({
    results,
    container,
    refs,
    onSelected,
  }: {
    results: IGif[][];
    container: React.RefObject<HTMLDivElement>;
    refs: React.RefObject<HTMLDivElement>[];
    onSelected: onClickHandler;
  }) => {
    const columns = splitColumns<IGif[]>(results, 2);
    return (
      <>
        {columns.map((column, index) => (
          <ResultsColumn
            results={column}
            container={container}
            id={index}
            key={`gif-results.column.${index}`}
            markerRef={refs[index]}
            onSelected={onSelected}
          ></ResultsColumn>
        ))}
      </>
    );
  }
);

export type onSelectedHandler = (gif: IGif, query: string) => void;
type onClickHandler = (gif: IGif) => void;

interface GifPickerOptions {
  onSelected: onSelectedHandler;
}

// gif picker with infinite loading and search
const GifPicker = ({ onSelected }: GifPickerOptions) => {
  const [query, setQuery] = useState("");
  // prevent excessive fetching
  const debouncedQuery = useDebounce(query, 400);
  const [page, setPage] = useState(0);
  const [waiting, results] = useGifs(debouncedQuery, page);
  // refs for lazy loading
  const picker = useRef<HTMLDivElement>(null);
  // refs and intersection observers for infinite scroll
  const scrollBottomLeft = useRef<HTMLDivElement>(null);
  const scrollBottomRight = useRef<HTMLDivElement>(null);
  const atBottomRight = useVisibility(
    scrollBottomLeft,
    picker,
    0,
    "0px 0px 0px 100px"
  );
  const atBottomLeft = useVisibility(
    scrollBottomRight,
    picker,
    0,
    "0px 0px 0px 100px"
  );

  const curried = (gif: IGif) => onSelected(gif, query);

  // if the search changes, reset the page
  useEffect(() => {
    setPage(0);
  }, [query]);

  // infinite scroll
  useEffect(() => {
    // not waiting, at the bottom, and the last page of results was full
    if (
      !waiting &&
      (atBottomLeft || atBottomRight) &&
      results &&
      results.length > 0 &&
      results[results.length - 1].length >= PAGE_SIZE / 2
    ) {
      // increase the page (new gifs will be fetched)
      setPage((page) => page + 1);
    }
  }, [waiting, atBottomLeft, atBottomRight, results]);

  return (
    <Wrapper ref={picker}>
      <Search
        placeholder="Search GIPHY"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Scroll>
        {!query && <PlaceholderMessage message={placeholderMessages.empty} />}
        {query && results && results[0].length === 0 && (
          <PlaceholderMessage message={placeholderMessages.notFound} />
        )}
        <Results>
          <SearchResults
            results={results || [[], []]}
            container={picker}
            refs={[scrollBottomLeft, scrollBottomRight]}
            onSelected={curried}
          />
        </Results>
      </Scroll>
      <Attribution src={attribution} />
    </Wrapper>
  );
};

export { GifPicker };
