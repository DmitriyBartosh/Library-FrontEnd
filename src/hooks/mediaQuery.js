import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export const useIsLarge = () => useMediaQuery("(min-width: 1440px)");
export const useIsMedium = () => useMediaQuery("(max-width: 1440px)");
export const useIsTablet = () => useMediaQuery("(max-width: 1024px)");
export const useIsMobile = () => useMediaQuery("(max-width: 600px)");
