import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const DEV_API_KEY = import.meta.env.DEV ? import.meta.env.VITE_TMDB_API_KEY : '';
const USE_DIRECT_TMDB = Boolean(DEV_API_KEY);

const tmdbClient = axios.create({
  baseURL: USE_DIRECT_TMDB ? BASE_URL : '/api/tmdb',
});

const ensureLocalApiKey = () => {
  if (!DEV_API_KEY || DEV_API_KEY === 'your_key_here') {
    throw new Error('Missing TMDB API key. Add VITE_TMDB_API_KEY to your local .env file.');
  }
};

const request = async (url, params = {}) => {
  const requestParams = USE_DIRECT_TMDB
    ? {
        ...params,
        api_key: DEV_API_KEY,
        language: 'en-US',
      }
    : {
        path: url,
        ...params,
      };

  if (USE_DIRECT_TMDB) {
    ensureLocalApiKey();
  }

  const { data } = await tmdbClient.get(USE_DIRECT_TMDB ? url : '', {
    params: requestParams,
  });

  return data;
};

export const getTrending = ({ window = 'day', mediaType = 'movie' } = {}) =>
  request(`/trending/${mediaType}/${window}`);

export const getPopularMovies = ({ page = 1, genreId } = {}) => {
  if (genreId) {
    return request('/discover/movie', {
      page,
      sort_by: 'popularity.desc',
      with_genres: genreId,
      include_adult: false,
      include_video: false,
    });
  }

  return request('/movie/popular', { page });
};

export const getTopRatedMovies = ({ page = 1 } = {}) => request('/movie/top_rated', { page });

export const searchMulti = (query, page = 1) =>
  request('/search/multi', {
    query,
    page,
    include_adult: false,
  });

export const getGenres = (mediaType = 'movie') => request(`/genre/${mediaType}/list`);

export const getMediaDetails = (mediaType, id) =>
  request(`/${mediaType}/${id}`, {
    append_to_response: 'videos,credits,recommendations',
  });

export default tmdbClient;
