import { useState, useRef, useEffect } from "react";
import { useVisibility } from "foundations/hooks/useVisibility";

export type GetNextPage<Result, PaginationInfo, ExtraArgs> = (
  prev: PaginationInfo | null,
  currentCount: number | null,
  extraArgs: ExtraArgs
) => Promise<{
  results: Result[];
  pagination: PaginationInfo;
  pagesRemain: boolean;
}>;

export type SavePaginationState<PaginationInfo, ExtraArgs> = (
  extraArgs: ExtraArgs,
  pagination: PaginationInfo,
  count: number | null,
  pagesRemain: boolean
) => void;
export type RestorePaginationState<PaginationInfo> = () =>
  | { pagination: PaginationInfo; count: number | null; pagesRemain: boolean }
  | undefined;

const usePagination = <Result, PaginationInfo, ExtraArgs>(
  getNextPage: GetNextPage<Result, PaginationInfo, ExtraArgs>,
  extraArgs: ExtraArgs,
  savePaginationState?: SavePaginationState<PaginationInfo, ExtraArgs>,
  restorePaginationState?: RestorePaginationState<PaginationInfo>,
  isEnabled = true,
  debounce = 500
) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Result[][] | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [prev, setPagination] = useState<PaginationInfo | null>(null);
  const [pagesRemain, setPagesRemain] = useState<boolean>(true);
  const [responseId, setResponseId] = useState<ExtraArgs>(extraArgs);
  // refs and intersection observers for infinite scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  // TODO: this needs to be a parameter
  const atEnd = useVisibility(endRef, containerRef, 0, "0px 0px 500px 0px");

  // if the extra args change, reset
  useEffect(() => {
    const { count, pagination, pagesRemain } =
      (restorePaginationState && restorePaginationState()) || {};
    setPagination(pagination || null);
    setPagesRemain(pagesRemain === undefined ? true : pagesRemain);
    setCount(count || null);
  }, [extraArgs, restorePaginationState]);

  useEffect(() => {
    setLoading(false);
  }, [extraArgs]);

  const shouldUpdate =
    !loading && (atEnd || prev === null) && pagesRemain && isEnabled;

  // infinite scroll
  useEffect(() => {
    let scheduled: null | number = null;

    if (shouldUpdate) {
      // fetch next page
      (async () => {
        if (scheduled !== null) {
          clearTimeout(scheduled);
        }
        setLoading(true);
        const { results: current, pagination, pagesRemain } = await getNextPage(
          prev,
          count,
          extraArgs
        );

        // update state
        const newCount =
          current.length > 0
            ? prev && count
              ? count + current.length
              : current.length
            : count;
        if (current.length > 0) {
          setResults(old => {
            if (prev && old) {
              return [...old, current];
            } else {
              return [current];
            }
          });
          setResponseId(extraArgs);
        }
        if (!savePaginationState) {
          setCount(newCount);
          setPagination(pagination);
          setPagesRemain(pagesRemain);
        } else {
          savePaginationState(extraArgs, pagination, newCount, pagesRemain);
        }

        // enforce a delay between fetching pages
        scheduled = setTimeout(() => {
          setLoading(false);
        }, debounce);
      })();
    }

    return () => {
      if (scheduled !== null) {
        clearTimeout(scheduled);
      }
    };
  }, [
    getNextPage,
    pagesRemain,
    prev,
    count,
    debounce,
    shouldUpdate,
    extraArgs,
    savePaginationState
  ]);

  return { loading, results, containerRef, endRef, responseId };
};

export { usePagination };
