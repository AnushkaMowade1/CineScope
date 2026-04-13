import { FiFilm } from 'react-icons/fi';

const EmptyState = ({ title, description }) => (
  <div className="section-shell flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-accent">
      <FiFilm className="text-2xl" />
    </div>
    <div className="space-y-2">
      <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
      <p className="max-w-xl text-sm leading-7 text-mist sm:text-base">{description}</p>
    </div>
  </div>
);

export default EmptyState;
