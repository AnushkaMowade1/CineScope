import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBookmark, FiCheck, FiStar } from 'react-icons/fi';
import { useWatchlist } from '../hooks/useWatchlist';
import { formatRating, pickMediaType, pickReleaseDate, pickTitle } from '../utils/formatters';
import { getTmdbImage } from '../utils/image';

const MovieCard = ({ item, priority = false }) => {
  const { isWatchlisted, toggleWatchlist } = useWatchlist();
  const mediaType = pickMediaType(item);
  const inWatchlist = isWatchlisted(item.id, mediaType);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-panel shadow-card transition-colors duration-300 hover:border-white/15"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.45 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.01 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <button
        aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        className={`absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border transition ${
          inWatchlist
            ? 'border-accent/60 bg-accent text-white'
            : 'border-white/[0.08] bg-black/[0.55] text-white hover:border-accent/40 hover:bg-black'
        }`}
        onClick={() => toggleWatchlist(item, mediaType)}
        type="button"
      >
        {inWatchlist ? <FiCheck /> : <FiBookmark />}
      </button>

      <Link className="block h-full" to={`/${mediaType}/${item.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden bg-panel-soft">
          {getTmdbImage(item.poster_path, priority ? 'w500' : 'w342') ? (
            <img
              alt={pickTitle(item)}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              loading={priority ? 'eager' : 'lazy'}
              src={getTmdbImage(item.poster_path, priority ? 'w500' : 'w342')}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-panel-soft px-6 text-center">
              <span className="font-display text-2xl font-semibold text-white/80">
                {pickTitle(item)}
              </span>
            </div>
          )}

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
            <FiStar className="text-accent" />
            {formatRating(item.vote_average)}
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.25em] text-mist">
            <span>{mediaType}</span>
            <span>{pickReleaseDate(item).slice(0, 4) || 'TBA'}</span>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{pickTitle(item)}</h3>
            <p className="mt-2 text-sm leading-6 text-mist">
              {item.overview
                ? `${item.overview.slice(0, 100)}${item.overview.length > 100 ? '...' : ''}`
                : 'No synopsis available yet.'}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default MovieCard;
