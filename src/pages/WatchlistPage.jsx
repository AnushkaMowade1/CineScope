import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import MovieCard from '../components/MovieCard';
import SectionHeader from '../components/SectionHeader';
import { useWatchlist } from '../hooks/useWatchlist';

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="space-y-8">
      <SectionHeader
        description="Everything you've saved lives here, ready for the next movie night."
        eyebrow="Your Queue"
        title="Watchlist"
      />

      {!watchlist.length ? (
        <div className="space-y-6">
          <EmptyState
            description="Browse trending titles, tap the bookmark on any card, and your personal lineup will appear here instantly."
            title="Your watchlist is empty"
          />
          <div className="flex justify-center">
            <Link className="button-primary" to="/">
              Discover movies
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {watchlist.map((item) => (
            <MovieCard item={item} key={`${item.media_type}-${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
