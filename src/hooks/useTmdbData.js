import { useEffect, useState } from 'react';

const useTmdbData = (fetcher, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetcher();

        if (isMounted) {
          setData(response);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Something went wrong while fetching data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
};

export default useTmdbData;
