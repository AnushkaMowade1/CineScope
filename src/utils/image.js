export const getTmdbImage = (path, size = 'w780') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
