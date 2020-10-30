import React, { useState, useCallback } from "react";
import { PlaceholderMessage, placeholderMessages } from "./PlaceholderMessage";
import { IGif } from "@giphy/js-types";
import { Gif, GifSize } from "../Gif";
import { useDebounce } from "foundations/hooks/useDebounce";
import attribution from "foundations/components/chat/giphy-message/attribution.png";
import { Input } from "foundations/components/presentation";
import { StyledBox, ScrollView } from "foundations/components/layout";
import { typed } from "../Masonry/Masonry";
import { usePagination, GetNextPage } from "foundations/hooks/usePagination";

const Masonry = typed<IGif>();

const PAGE_SIZE = 25;
interface GiphySearch {
  data: IGif[];
  pagination: { total_count: number; count: number; offset: number };
}

// make a request to the giphy search api
const search = async (query: string, offset: number): Promise<GiphySearch> => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${
        process.env.REACT_APP_GIPHY_API_KEY
      }&q=${encodeURIComponent(
        query
      )}&limit=${PAGE_SIZE}&offset=${offset}&rating=G&lang=en`
    );
    const results = (await response.json()) as GiphySearch;
    return results;
  } catch {
    return { data: [], pagination: { total_count: 0, count: 0, offset: 0 } };
  }
};

export type onSelectedHandler = (gif: IGif, query: string) => void;

interface GifPickerOptions {
  onSelected: onSelectedHandler;
}

// gif picker with infinite loading and search
const GifPicker = ({ onSelected }: GifPickerOptions) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const getNextPage: GetNextPage<
    IGif,
    GiphySearch["pagination"],
    string
  > = useCallback(async (prev, _total, query) => {
    // bail out
    const { data: results, pagination } = await search(
      query,
      prev ? prev.offset + prev.count : 0
    );
    return {
      results,
      pagination,
      pagesRemain: pagination.offset + pagination.count < pagination.total_count
    };
  }, []);
  const isEnabled = debouncedQuery.length > 0;
  const {
    results,
    containerRef: picker,
    endRef: bottom,
    responseId: reset
  } = usePagination(
    getNextPage,
    debouncedQuery,
    undefined,
    undefined,
    isEnabled
  );

  const curried = (gif: IGif) => onSelected(gif, query);

  return (
    <StyledBox
      bg="backgrounds.panel"
      border="dark"
      borderRadius="light"
      padding="1"
      maxWidth="calc(100vw - 50px)"
      width="430px"
    >
      <Input
        placeholder="Search GIPHY"
        value={query}
        onChange={e => setQuery(e.target.value)}
        attribution={attribution}
      />
      <ScrollView height="400px" ref={picker}>
        {!query && <PlaceholderMessage message={placeholderMessages.empty} />}
        {query && results?.length === 0 && (
          <PlaceholderMessage message={placeholderMessages.notFound} />
        )}
        <StyledBox>
          {query && results && results.length > 0 && (
            <Masonry
              groupedItems={results || []}
              reset={reset}
              columns={2}
              getSizeForItem={i => {
                const item = i.images.fixed_width;
                // workaround for https://github.com/Giphy/giphy-js/issues/126
                return {
                  height: parseInt((item.height as unknown) as string),
                  width: parseInt((item.width as unknown) as string)
                };
              }}
              render={(item, key) => (
                <StyledBox
                  borderRadius="strong"
                  overflow="hidden"
                  marginTop="1"
                >
                  <Gif
                    gif={item}
                    size={GifSize.Preview}
                    key={key}
                    container={picker}
                    onClick={curried}
                  />
                </StyledBox>
              )}
            />
          )}
        </StyledBox>
        <div ref={bottom} />
      </ScrollView>
    </StyledBox>
  );
};

export { GifPicker };
