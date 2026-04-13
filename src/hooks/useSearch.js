import { useEffect, useState } from 'react';
import { searchMulti } from '../services/tmdb';
import useDebounce from './useDebounce';

const useSearch = (query) => {
  const debouncedQuery = useDebounce(query, 450);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const getResults = async () => {
      const trimmedQuery = debouncedQuery.trim();

      if (!trimmedQuery) {
        setResults([]);
        setLoading(false);
        setError('');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await searchMulti(trimmedQuery);
        const filteredResults = (response.results || [])
          .filter((item) => ['movie', 'tv'].includes(item.media_type))
          .slice(0, 8);

        if (isMounted) {
          setResults(filteredResults);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Unable to load search results.');
          setResults([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getResults();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  return {
    results,
    loading,
    error,
    debouncedQuery,
  };
};

export default useSearch;
