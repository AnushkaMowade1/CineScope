import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiLoader, FiSearch, FiTv } from 'react-icons/fi';
import useSearch from '../hooks/useSearch';
import { formatRating, pickReleaseDate, pickTitle } from '../utils/formatters';
import { getTmdbImage } from '../utils/image';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { results, loading, error, debouncedQuery } = useSearch(query);

  const hasResults = useMemo(() => results.length > 0, [results]);
  const isDebouncing = query.trim() && query.trim() !== debouncedQuery.trim();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setOpen(false);
    setQuery('');
  }, [location.pathname]);

  const handleSelect = (mediaType, id) => {
    setOpen(false);
    navigate(`/${mediaType}/${id}`);
  };

  const shouldShowResults = open && query.trim();

  return (
    <div className="relative w-full md:max-w-xl" ref={containerRef}>
      <label className="input-shell w-full">
        <FiSearch className="text-lg text-accent" />
        <input
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-mist"
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Search movies and TV shows"
          type="text"
          value={query}
        />
        {loading ? <FiLoader className="animate-spin text-mist" /> : null}
      </label>

      {shouldShowResults ? (
        <div className="absolute inset-x-0 top-[calc(100%+12px)] z-50 overflow-hidden rounded-[24px] border border-white/[0.08] bg-canvas-soft/96 p-2 shadow-card backdrop-blur-2xl">
          <div className="max-h-[70vh] overflow-y-auto">
            {error ? (
              <div className="rounded-2xl px-4 py-6 text-sm text-rose-300">{error}</div>
            ) : null}

            {!error && (loading || isDebouncing) ? (
              <div className="rounded-2xl px-4 py-6 text-sm text-mist">
                Searching TMDB for <span className="font-semibold text-white">{query.trim()}</span>
                ...
              </div>
            ) : null}

            {!error && !loading && !isDebouncing && !hasResults && debouncedQuery.trim() ? (
              <div className="rounded-2xl px-4 py-6 text-sm text-mist">
                No titles matched your search.
              </div>
            ) : null}

            {!error && hasResults
              ? results.map((result) => (
                  <button
                    className="flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition hover:bg-white/[0.06]"
                    key={`${result.media_type}-${result.id}`}
                    onClick={() => handleSelect(result.media_type, result.id)}
                    type="button"
                  >
                    <div className="h-20 w-14 shrink-0 overflow-hidden rounded-2xl bg-white/5">
                      {getTmdbImage(result.poster_path, 'w342') ? (
                        <img
                          alt={pickTitle(result)}
                          className="h-full w-full object-cover"
                          src={getTmdbImage(result.poster_path, 'w342')}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-panel text-accent">
                          <FiTv />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-base font-semibold text-white">
                        {pickTitle(result)}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-mist">
                        <span>{result.media_type}</span>
                        <span>|</span>
                        <span>{pickReleaseDate(result).slice(0, 4) || 'TBA'}</span>
                        <span>|</span>
                        <span>{formatRating(result.vote_average)} rating</span>
                      </div>
                    </div>
                  </button>
                ))
              : null}
          </div>

          <div className="border-t border-white/[0.06] px-3 py-3 text-xs text-mist">
            Live search is debounced to keep TMDB requests efficient.
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
