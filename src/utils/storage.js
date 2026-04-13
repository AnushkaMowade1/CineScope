const STORAGE_KEY = 'movie-explorer-watchlist';

export const loadWatchlist = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch (error) {
    console.error('Unable to load watchlist', error);
    return [];
  }
};

export const saveWatchlist = (watchlist) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
};
