import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import WatchlistPage from './pages/WatchlistPage';
import LoadingGrid from './components/LoadingGrid';

const MediaDetailsPage = lazy(() => import('./pages/MediaDetailsPage'));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="watchlist" element={<WatchlistPage />} />
        <Route
          path=":mediaType/:id"
          element={
            <Suspense
              fallback={
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                  <LoadingGrid cardCount={3} details />
                </div>
              }
            >
              <MediaDetailsPage />
            </Suspense>
          }
        />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
