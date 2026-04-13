import {
  createElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { pickMediaType, pickReleaseDate, pickTitle } from '../utils/formatters';
import { loadWatchlist, saveWatchlist } from '../utils/storage';

const WatchlistContext = createContext(null);

const normalizeItem = (item, fallbackMediaType = 'movie') => ({
  id: item.id,
  media_type: pickMediaType(item, fallbackMediaType),
  title: pickTitle(item),
  original_title: item.original_title || item.original_name || pickTitle(item),
  poster_path: item.poster_path || '',
  backdrop_path: item.backdrop_path || '',
  vote_average: item.vote_average || 0,
  release_date: pickReleaseDate(item),
  overview: item.overview || '',
  genre_ids: item.genre_ids || item.genres?.map((genre) => genre.id) || [],
  saved_at: new Date().toISOString(),
});

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => loadWatchlist());

  useEffect(() => {
    saveWatchlist(watchlist);
  }, [watchlist]);

  const watchlistIds = useMemo(
    () => new Set(watchlist.map((item) => `${item.media_type}-${item.id}`)),
    [watchlist],
  );

  const isWatchlisted = useCallback(
    (id, mediaType = 'movie') => watchlistIds.has(`${mediaType}-${id}`),
    [watchlistIds],
  );

  const addToWatchlist = useCallback((item, fallbackMediaType = 'movie') => {
    const normalizedItem = normalizeItem(item, fallbackMediaType);

    setWatchlist((currentItems) => {
      const itemKey = `${normalizedItem.media_type}-${normalizedItem.id}`;
      const exists = currentItems.some(
        (currentItem) => `${currentItem.media_type}-${currentItem.id}` === itemKey,
      );

      return exists ? currentItems : [normalizedItem, ...currentItems];
    });
  }, []);

  const removeFromWatchlist = useCallback((id, mediaType = 'movie') => {
    setWatchlist((currentItems) =>
      currentItems.filter((item) => !(item.id === id && item.media_type === mediaType)),
    );
  }, []);

  const toggleWatchlist = useCallback(
    (item, fallbackMediaType = 'movie') => {
      const mediaType = pickMediaType(item, fallbackMediaType);

      if (isWatchlisted(item.id, mediaType)) {
        removeFromWatchlist(item.id, mediaType);
        return false;
      }

      addToWatchlist(item, mediaType);
      return true;
    },
    [addToWatchlist, isWatchlisted, removeFromWatchlist],
  );

  const value = useMemo(
    () => ({
      watchlist,
      count: watchlist.length,
      isWatchlisted,
      addToWatchlist,
      removeFromWatchlist,
      toggleWatchlist,
    }),
    [watchlist, isWatchlisted, addToWatchlist, removeFromWatchlist, toggleWatchlist],
  );

  return createElement(WatchlistContext.Provider, { value }, children);
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider.');
  }

  return context;
};
