import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FiArrowLeft,
  FiBookmark,
  FiCalendar,
  FiClock,
  FiPlayCircle,
  FiStar,
} from 'react-icons/fi';
import EmptyState from '../components/EmptyState';
import LoadingGrid from '../components/LoadingGrid';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import useTmdbData from '../hooks/useTmdbData';
import { useWatchlist } from '../hooks/useWatchlist';
import { getMediaDetails } from '../services/tmdb';
import {
  formatDate,
  formatRating,
  formatRuntime,
  pickRuntime,
  pickTitle,
} from '../utils/formatters';
import { getTmdbImage } from '../utils/image';

const MediaDetailsPage = () => {
  const { mediaType, id } = useParams();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { isWatchlisted, toggleWatchlist } = useWatchlist();

  const { data, loading, error } = useTmdbData(() => getMediaDetails(mediaType, id), [mediaType, id]);

  const trailer = useMemo(
    () =>
      data?.videos?.results?.find(
        (video) =>
          video.site === 'YouTube' &&
          (video.type === 'Trailer' || video.type === 'Teaser') &&
          (video.official || video.name?.toLowerCase().includes('trailer')),
      ) || data?.videos?.results?.find((video) => video.site === 'YouTube'),
    [data],
  );

  const cast = data?.credits?.cast?.slice(0, 6) || [];
  const recommendations = data?.recommendations?.results?.slice(0, 4) || [];
  const runtime = pickRuntime(data);
  const inWatchlist = isWatchlisted(Number(id), mediaType);

  if (loading) {
    return <LoadingGrid details />;
  }

  if (error || !data) {
    return (
      <EmptyState
        description={error || 'The requested title could not be found.'}
        title="Details are unavailable"
      />
    );
  }

  return (
    <div className="space-y-10">
      <section className="section-shell relative overflow-hidden">
        <div className="absolute inset-0">
          {getTmdbImage(data.backdrop_path || data.poster_path, 'original') ? (
            <img
              alt={pickTitle(data)}
              className="h-full w-full object-cover"
              src={getTmdbImage(data.backdrop_path || data.poster_path, 'original')}
            />
          ) : null}
          <div className="absolute inset-0 bg-black/65" />
        </div>

        <div className="relative grid gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[320px,1fr] lg:gap-10 lg:px-12 lg:py-14">
          <div className="overflow-hidden rounded-[26px] border border-white/[0.08] bg-panel shadow-card">
            {getTmdbImage(data.poster_path, 'w780') ? (
              <img
                alt={pickTitle(data)}
                className="aspect-[2/3] h-full w-full object-cover"
                src={getTmdbImage(data.poster_path, 'w780')}
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center bg-panel-soft px-8 text-center">
                <span className="font-display text-4xl font-semibold text-white/[0.85]">
                  {pickTitle(data)}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6 rounded-[26px] border border-white/[0.08] bg-black/40 p-6 backdrop-blur-sm">
            <Link className="button-secondary w-fit" to="/">
              <FiArrowLeft />
              Back to discover
            </Link>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-mist">
                <span>{mediaType}</span>
                <span>|</span>
                <span>{data.status}</span>
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                {pickTitle(data)}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="chip">
                  <FiStar className="mr-2 inline-flex text-accent" />
                  {formatRating(data.vote_average)}
                </span>
                <span className="chip">
                  <FiClock className="mr-2 inline-flex text-accent" />
                  {formatRuntime(runtime)}
                </span>
                <span className="chip">
                  <FiCalendar className="mr-2 inline-flex text-accent" />
                  {formatDate(data.release_date || data.first_air_date)}
                </span>
              </div>
            </div>

            <p className="max-w-3xl text-sm leading-8 text-white/80 sm:text-base">
              {data.overview || 'No overview has been added for this title yet.'}
            </p>

            <div className="flex flex-wrap gap-3">
              {data.genres?.map((genre) => (
                <span className="chip" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className={`button-primary ${trailer ? '' : 'cursor-not-allowed opacity-60'}`}
                disabled={!trailer}
                onClick={() => setIsTrailerOpen(true)}
                type="button"
              >
                <FiPlayCircle />
                {trailer ? 'Watch trailer' : 'Trailer unavailable'}
              </button>
              <button
                className="button-secondary"
                onClick={() => toggleWatchlist({ ...data, media_type: mediaType }, mediaType)}
                type="button"
              >
                <FiBookmark />
                {inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              </button>
            </div>

            <div className="grid gap-4 rounded-[22px] border border-white/[0.08] bg-panel-soft/90 p-5 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-mist">Language</p>
                <p className="mt-2 text-lg font-semibold text-white">{data.original_language?.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-mist">Popularity</p>
                <p className="mt-2 text-lg font-semibold text-white">{Math.round(data.popularity)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-mist">Votes</p>
                <p className="mt-2 text-lg font-semibold text-white">{data.vote_count?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {cast.length ? (
        <section className="section-shell space-y-6 p-6 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">Cast</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Top billed talent</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cast.map((person) => (
              <div
                className="rounded-[24px] border border-white/10 bg-white/5 p-4"
                key={person.cast_id || person.credit_id}
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-panel-soft">
                    {getTmdbImage(person.profile_path, 'w185') ? (
                      <img
                        alt={person.name}
                        className="h-full w-full object-cover"
                        src={getTmdbImage(person.profile_path, 'w185')}
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-white">{person.name}</p>
                    <p className="text-sm text-mist">{person.character || 'Cast member'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {recommendations.length ? (
        <section className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">Next up</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">More like this</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {recommendations.map((item) => (
              <MovieCard item={{ ...item, media_type: mediaType }} key={item.id} />
            ))}
          </div>
        </section>
      ) : null}

      <TrailerModal
        onClose={() => setIsTrailerOpen(false)}
        open={isTrailerOpen && Boolean(trailer)}
        title={pickTitle(data)}
        trailerKey={trailer?.key}
      />
    </div>
  );
};

export default MediaDetailsPage;
