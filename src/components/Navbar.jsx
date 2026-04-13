import { Link, NavLink } from 'react-router-dom';
import { FiBookmark, FiFilm } from 'react-icons/fi';
import { useWatchlist } from '../hooks/useWatchlist';
import SearchBar from './SearchBar';

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? 'border border-white/[0.08] bg-panel-soft text-white'
      : 'text-mist hover:bg-panel-soft hover:text-white'
  }`;

const Navbar = () => {
  const { count } = useWatchlist();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-canvas/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link className="flex items-center gap-3" to="/">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/60 bg-accent text-white shadow-glow">
              <FiFilm className="text-xl" />
            </div>
            <div>
              <p className="font-display text-lg font-bold tracking-tight text-white">CineScope</p>
              <p className="text-xs uppercase tracking-[0.3em] text-mist">Movie Explorer</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <NavLink className={navLinkClass} to="/">
              Discover
            </NavLink>
            <NavLink className={navLinkClass} to="/watchlist">
              Watchlist
            </NavLink>
          </nav>

          <Link className="button-secondary hidden md:inline-flex" to="/watchlist">
            <FiBookmark />
            {count} saved
          </Link>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SearchBar />
          <div className="flex items-center gap-2 md:hidden">
            <NavLink className={navLinkClass} to="/">
              Discover
            </NavLink>
            <NavLink className={navLinkClass} to="/watchlist">
              Watchlist ({count})
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
