import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { IGif, ImageAllTypes } from "@giphy/js-types";
import { useVisibility } from "foundations/hooks/useVisibility";
import { StyledBox } from "foundations/components/layout";
import { ThemeContext } from "styled-components";

enum GifSize {
  Preview,
  Full
}

enum GifFormat {
  Image,
  Video
}

interface LoadedGif {
  src: string;
  format: GifFormat;
}

// preload the image/video and choose the optimal format
const load = async (source: ImageAllTypes): Promise<LoadedGif> => {
  const defaultSource = source.mp4 ? source.mp4 : source.webp;
  let image = {
    src: defaultSource,
    format: GifFormat.Video
  };
  if (source.mp4 && source.webp_size < source.mp4_size && (await supportsWebp())) {
    image = {
      src: source.webp,
      format: GifFormat.Image
    };
  }
  // fetch in the background
  const response = await fetch(image.src);
  // blob enures the entire file has loaded
  const blob = await response.blob();
  // return a url for the blob, which will load immediately
  return {
    ...image,
    src: URL.createObjectURL(blob)
  };
};

// null while loading, updated when complete
const useBackgroundLoad = (source: ImageAllTypes): null | LoadedGif => {
  const [data, setData] = useState<null | LoadedGif>(null);
  // prevent refetching the same image multiple times
  const image = useMemo(() => load(source), [source]);
  useEffect(() => {
    let mounted = true;
    let url: null | string = null;
    (async () => {
      const loaded = await image;
      url = loaded.src;
      if (mounted) {
        // only update state if the component is mounted
        setData(loaded);
      }
    })();
    return () => {
      mounted = false;
      // free memory from the image
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [image]);
  return data;
};

// check for webp browser support (needed to support safari)
const supportsWebp = (): Promise<boolean> => {
  return new Promise(resolve => {
    const image = new Image();
    // check that the image is loaded successfully
    image.onload = () => {
      resolve(image.width > 0 && image.height > 0);
    };
    // data uri of animated webp to test for support
    image.src =
      "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA";
  });
};

interface GifDisplayProps {
  source: ImageAllTypes;
  title: string;
}

// load the gif in the background, swapping in for a placeholder when fully loaded
const GifDisplay = React.memo(
  ({ source, title }: GifDisplayProps) => {
    const theme = useContext(ThemeContext);
    const image = useBackgroundLoad(source);
    const ratio = source.height / source.width;
    if (image !== null) {
      if (image.format === GifFormat.Image) {
        return <img src={image.src} alt={title} style={{ width: "100%" }} />;
      } else {
        return (
          <video
            autoPlay
            loop
            muted
            playsInline
            src={image.src}
            style={{ width: "100%" }}
          />
        );
      }
    }
    return (
      <StyledBox
        paddingTop={`${ratio * 100}%`}
        background={theme.backgrounds.primary}
      />
    );
  },
  (prev, next) => {
    return prev.source.url === next.source.url;
  }
);

interface GifProps {
  gif: IGif;
  size: GifSize;
  container?: React.RefObject<HTMLElement> | null;
  onClick?: (gif: IGif) => void;
}

// lazy load a gif, waiting until it is nearly visible to being loading
const Gif = ({ gif, size, container = null, onClick }: GifProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useVisibility(ref, container, 0, "50px 0px", true);
  const username = gif.user ? gif.user.username : gif.username;
  const theme = useContext(ThemeContext);
  const source =
    size === GifSize.Full ? gif.images.original : gif.images.fixed_width;
  const ratio = source.height / source.width;
  return (
    <StyledBox
      title={`${gif.title}${username && ` | @${username}`}`}
      ref={ref}
      onClick={() => onClick && onClick(gif)}
    >
      {isVisible ? (
        <GifDisplay source={source} title={gif.title} />
      ) : (
        <StyledBox
          paddingTop={`${ratio * 100}%`}
          background={theme.backgrounds.primary}
        />
      )}
    </StyledBox>
  );
};

export { Gif, GifDisplay, GifSize };
