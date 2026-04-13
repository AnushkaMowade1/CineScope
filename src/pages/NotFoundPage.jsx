import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="section-shell flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 py-16 text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">404</p>
    <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">Lost in the credits</h1>
    <p className="max-w-xl text-sm leading-7 text-mist sm:text-base">
      The page you are looking for does not exist, but there are plenty of great titles waiting
      back on the home screen.
    </p>
    <Link className="button-primary" to="/">
      Return home
    </Link>
  </div>
);

export default NotFoundPage;
