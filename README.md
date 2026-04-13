# CineScope

CineScope is a movie discovery web application that allows users to search, browse, and view detailed information about movies in real time.

## Live :
https://cine-scope-okrb.vercel.app/

## Features
- Real-time movie search
- Browse popular and trending movies
- Detailed movie information (rating, overview, release date, poster)
- Responsive and user-friendly interface
- Server-side API proxy for secure key handling

## Tech Stack
- React
- Vite
- JavaScript
- HTML, CSS
- TMDB API
- Vercel (Deployment)

## Architecture
The application uses a backend proxy to securely interact with the The Movie Database API.

Flow:
Frontend → Serverless API (Vercel) → TMDB API

This approach prevents exposing API keys on the client side.

## Environment Variables

Create a `.env` file in the root directory and add:

VITE_TMDB_API_KEY=your_tmdb_api_key

For deployment on Vercel, configure:

TMDB_API_KEY=your_tmdb_api_key

## Installation

1. Clone the repository:

git clone https://github.com/AnushkaMowade1/cinescope.git cd cinescope

2. Install dependencies:

npm install

3. Add environment variables

4. Start development server:

npm run dev

## Deployment

The project is deployed using Vercel.  
Environment variables must be configured in the Vercel dashboard before deployment.

## Future Improvements
- Debounced search for optimized API calls
- Pagination UI
- Loading and error states
- Watchlist or favorites feature

## License
This project is for educational and portfolio purposes.
