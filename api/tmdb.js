const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const getApiKey = () => process.env.TMDB_API_KEY || process.env.VITE_TMDB_API_KEY || '';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = getApiKey();
  const requestedPath = request.query.path;

  if (!apiKey || apiKey === 'your_key_here') {
    return response.status(500).json({
      error:
        'TMDB API key is missing on the server. Set TMDB_API_KEY or VITE_TMDB_API_KEY in Vercel project settings.',
    });
  }

  if (!requestedPath || Array.isArray(requestedPath) || !requestedPath.startsWith('/')) {
    return response.status(400).json({ error: 'A valid TMDB path is required.' });
  }

  try {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(request.query)) {
      if (key === 'path' || typeof value === 'undefined') {
        continue;
      }

      if (Array.isArray(value)) {
        value.forEach((entry) => searchParams.append(key, entry));
        continue;
      }

      searchParams.set(key, value);
    }

    searchParams.set('api_key', apiKey);

    if (!searchParams.has('language')) {
      searchParams.set('language', 'en-US');
    }

    const tmdbResponse = await fetch(`${TMDB_BASE_URL}${requestedPath}?${searchParams.toString()}`);
    const data = await tmdbResponse.json();

    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    return response.status(tmdbResponse.status).json(data);
  } catch (error) {
    return response.status(500).json({
      error: 'Failed to fetch data from TMDB.',
      details: error.message,
    });
  }
}
