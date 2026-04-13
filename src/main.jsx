import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { WatchlistProvider } from './hooks/useWatchlist';

document.documentElement.classList.add('dark');

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </BrowserRouter>,
);
