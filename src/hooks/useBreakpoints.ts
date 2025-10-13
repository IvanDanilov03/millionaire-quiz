import { useEffect, useMemo, useState } from 'react';

import { breakpointValues } from 'theme';

interface BreakpointMatches {
  isUpMobile: boolean;
  isUpTablet: boolean;
  isUpLaptop: boolean;
  isUpDesktop: boolean;
  isUpLarge: boolean;
}

type BreakpointKey = keyof BreakpointMatches;

const defaultMatches: BreakpointMatches = {
  isUpMobile: false,
  isUpTablet: false,
  isUpLaptop: false,
  isUpDesktop: false,
  isUpLarge: false,
};

const breakpointMap: Record<keyof typeof breakpointValues, number> = {
  mobile: breakpointValues.mobile,
  tablet: breakpointValues.tablet,
  laptop: breakpointValues.laptop,
  desktop: breakpointValues.desktop,
  large: breakpointValues.large,
};

const getMatchMedia = (query: string): MediaQueryList | null => {
  if (typeof globalThis.matchMedia !== 'function') {
    return null;
  }

  return globalThis.matchMedia(query);
};

const createInitialState = (
  queries: Record<BreakpointKey, string>,
): BreakpointMatches => {
  if (typeof globalThis.matchMedia !== 'function') {
    return defaultMatches;
  }

  return (
    Object.entries(queries) as Array<[BreakpointKey, string]>
  ).reduce<BreakpointMatches>(
    (accumulator, [key, query]) => {
      const mediaQueryList = getMatchMedia(query);

      return {
        ...accumulator,
        [key]: mediaQueryList?.matches ?? false,
      };
    },
    { ...defaultMatches },
  );
};

const addListener = (
  mediaQueryList: MediaQueryList,
  listener: (event: MediaQueryListEvent) => void,
) => {
  if (typeof mediaQueryList.addEventListener === 'function') {
    mediaQueryList.addEventListener('change', listener);
    return;
  }

  mediaQueryList.addListener(listener);
};

const removeListener = (
  mediaQueryList: MediaQueryList,
  listener: (event: MediaQueryListEvent) => void,
) => {
  if (typeof mediaQueryList.removeEventListener === 'function') {
    mediaQueryList.removeEventListener('change', listener);
    return;
  }

  mediaQueryList.removeListener(listener);
};

export const useBreakpoints = (): BreakpointMatches => {
  const queries = useMemo(
    () => ({
      isUpMobile: `(min-width: ${breakpointMap.mobile}px)`,
      isUpTablet: `(min-width: ${breakpointMap.tablet}px)`,
      isUpLaptop: `(min-width: ${breakpointMap.laptop}px)`,
      isUpDesktop: `(min-width: ${breakpointMap.desktop}px)`,
      isUpLarge: `(min-width: ${breakpointMap.large}px)`,
    }),
    [],
  );

  const [matches, setMatches] = useState<BreakpointMatches>(() =>
    createInitialState(queries),
  );

  useEffect(() => {
    const mediaQueryLists = (
      Object.entries(queries) as Array<[BreakpointKey, string]>
    )
      .map(([key, query]) => {
        const mediaQueryList = getMatchMedia(query);

        return mediaQueryList
          ? {
              key,
              mediaQueryList,
            }
          : null;
      })
      .filter(
        (
          entry,
        ): entry is { key: BreakpointKey; mediaQueryList: MediaQueryList } =>
          entry !== null,
      );

    const handleChange = () => {
      setMatches(createInitialState(queries));
    };

    mediaQueryLists.forEach(({ mediaQueryList }) => {
      addListener(mediaQueryList, handleChange);
    });

    handleChange();

    return () => {
      mediaQueryLists.forEach(({ mediaQueryList }) => {
        removeListener(mediaQueryList, handleChange);
      });
    };
  }, [queries]);

  return matches;
};
