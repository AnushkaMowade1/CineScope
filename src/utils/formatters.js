export const formatRating = (value) => {
  if (typeof value !== 'number') {
    return 'NR';
  }

  return value.toFixed(1);
};

export const formatRuntime = (minutes) => {
  if (!minutes || Number.isNaN(minutes)) {
    return 'Runtime unavailable';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (!hours) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

export const pickTitle = (item) => item?.title || item?.name || 'Untitled';

export const pickReleaseDate = (item) => item?.release_date || item?.first_air_date || '';

export const pickRuntime = (item) => item?.runtime || item?.episode_run_time?.[0] || 0;

export const pickMediaType = (item, fallback = 'movie') => item?.media_type || fallback;
