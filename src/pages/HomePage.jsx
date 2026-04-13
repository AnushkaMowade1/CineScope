import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import EmptyState from '../components/EmptyState';
import GenreFilter from '../components/GenreFilter';
import HeroSpotlight from '../components/HeroSpotlight';
import LoadingGrid from '../components/LoadingGrid';
import MovieCard from '../components/MovieCard';
import SectionHeader from '../components/SectionHeader';
import useTmdbData from '../hooks/useTmdbData';
import {
  getGenres,
  getPopularMovies,
  getTopRatedMovies,
  getTrending,
} from '../services/tmdb';

const HomePage = () => {
  const [trendingWindow, setTrendingWindow] = useState('day');
  const [selectedGenre, setSelectedGenre] = useState(null);

  const fetchTrending = useCallback(
    () => getTrending({ window: trendingWindow, mediaType: 'movie' }),
    [trendingWindow],
  );
  const fetchPopular = useCallback(
    () => getPopularMovies({ genreId: selectedGenre }),
    [selectedGenre],
  );
  const fetchGenres = useCallback(() => getGenres('movie'), []);
  const fetchTopRated = useCallback(() => getTopRatedMovies(), []);

  const { data: trendingData, loading: trendingLoading, error: trendingError } = useTmdbData(
    fetchTrending,
    [trendingWindow],
  );
  const { data: popularData, loading: popularLoading, error: popularError } = useTmdbData(
    fetchPopular,
    [selectedGenre],
  );
  const { data: genreData } = useTmdbData(fetchGenres, []);
  const { data: topRatedData, loading: topRatedLoading, error: topRatedError } = useTmdbData(
    fetchTopRated,
    [],
  );

  const trendingMovies = trendingData?.results || [];
  const popularMovies = popularData?.results || [];
  const topRatedMovies = topRatedData?.results?.slice(0, 4) || [];
  const genres = genreData?.genres || [];

  const spotlightMovie = useMemo(
    () => trendingMovies[0] || popularMovies[0] || null,
    [trendingMovies, popularMovies],
  );

  return (
    <div className="space-y-10 lg:space-y-14">
      <HeroSpotlight movie={spotlightMovie} />

      <section className="space-y-6">
        <SectionHeader
          action={
            <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
              {['day', 'week'].map((window) => (
                <button
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    trendingWindow === window
                      ? 'bg-accent text-white'
                      : 'text-mist hover:bg-panel-soft hover:text-white'
                  }`}
                  key={window}
                  onClick={() => setTrendingWindow(window)}
                  type="button"
                >
                  {window === 'day' ? 'Daily' : 'Weekly'}
                </button>
              ))}
            </div>
          }
          description="Fresh from TMDB, updated based on the time window you pick."
          eyebrow="Trending Now"
          title="What everyone is watching"
        />

        {trendingLoading ? <LoadingGrid cardCount={4} /> : null}

        {trendingError && !trendingLoading ? (
          <EmptyState description={trendingError} title="Trending titles couldn't load" />
        ) : null}

        {!trendingLoading && !trendingError ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {trendingMovies.slice(0, 8).map((movie, index) => (
              <MovieCard item={movie} key={movie.id} priority={index < 2} />
            ))}
          </div>
        ) : null}
      </section>

      <section className="space-y-6">
        <SectionHeader
          description="Filter popular films by genre to shape your next marathon."
          eyebrow="Genre Explorer"
          title="Popular movies, your way"
        />
        <GenreFilter genres={genres} onChange={setSelectedGenre} selectedGenre={selectedGenre} />

        {popularLoading ? <LoadingGrid cardCount={8} /> : null}

        {popularError && !popularLoading ? (
          <EmptyState description={popularError} title="Popular movies couldn't load" />
        ) : null}

        {!popularLoading && !popularError ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularMovies.slice(0, 12).map((movie) => (
              <MovieCard item={movie} key={movie.id} />
            ))}
          </div>
        ) : null}
      </section>

      <motion.section
        className="section-shell space-y-6 p-6 sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.45 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <SectionHeader
          description="An extra layer of discovery for nights when you want something acclaimed."
          eyebrow="Critics' Picks"
          title="Top rated standouts"
        />

        {topRatedLoading ? <LoadingGrid cardCount={4} /> : null}

        {topRatedError && !topRatedLoading ? (
          <EmptyState description={topRatedError} title="Top rated picks couldn't load" />
        ) : null}

        {!topRatedLoading && !topRatedError ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {topRatedMovies.map((movie) => (
              <MovieCard item={movie} key={movie.id} />
            ))}
          </div>
        ) : null}
      </motion.section>
    </div>
  );
};

export default HomePage;
