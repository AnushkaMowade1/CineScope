import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock, FiPlay, FiStar } from 'react-icons/fi';
import { formatDate, formatRating, pickTitle } from '../utils/formatters';
import { getTmdbImage } from '../utils/image';

const HeroSpotlight = ({ movie }) => {
  if (!movie) {
    return (
      <section className="section-shell overflow-hidden p-8 sm:p-10 lg:p-12">
        <div className="space-y-4">
          <div className="chip w-fit">TMDB spotlight</div>
          <h1 className="font-display text-4xl font-bold text-white sm:text-6xl">
            Add your TMDB key to light up the explorer.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-mist sm:text-lg">
            The UI is ready. Once your API key is in place, CineScope will pull live movie data,
            trending lists, and searchable details in real time.
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="section-shell relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="absolute inset-0">
        {getTmdbImage(movie.backdrop_path || movie.poster_path, 'original') ? (
          <img
            alt={pickTitle(movie)}
            className="h-full w-full object-cover"
            src={getTmdbImage(movie.backdrop_path || movie.poster_path, 'original')}
          />
        ) : null}
        <div className="absolute inset-0 bg-black/65" />
      </div>

      <div className="relative grid gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[1.2fr,360px] lg:px-12 lg:py-14">
        <div className="max-w-3xl space-y-6 rounded-[26px] border border-white/[0.08] bg-black/45 p-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip chip-active">Trending highlight</span>
            <span className="chip">
              <FiStar className="mr-2 inline-flex text-accent" />
              {formatRating(movie.vote_average)} audience score
            </span>
            <span className="chip">
              <FiClock className="mr-2 inline-flex text-accent" />
              {formatDate(movie.release_date)}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
              Live from TMDB
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {pickTitle(movie)}
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-white/75 sm:text-base lg:text-lg">
              {movie.overview ||
                'A cinematic standout with style, scale, and a story worth diving into next.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="button-primary" to={`/movie/${movie.id}`}>
              <FiArrowRight />
              Explore details
            </Link>
            <Link className="button-secondary" to="/watchlist">
              <FiPlay />
              Open watchlist
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-[26px] border border-white/[0.08] bg-black/35 shadow-card">
            {getTmdbImage(movie.poster_path, 'w500') ? (
              <img
                alt={pickTitle(movie)}
                className="aspect-[2/3] h-full w-full object-cover"
                src={getTmdbImage(movie.poster_path, 'w500')}
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center bg-panel-soft px-8 text-center">
                <span className="font-display text-3xl font-semibold text-white/[0.85]">
                  {pickTitle(movie)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSpotlight;
