import { FiX } from 'react-icons/fi';

const TrailerModal = ({ open, onClose, trailerKey, title }) => {
  if (!open || !trailerKey) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-canvas-soft shadow-card">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Trailer</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-white">{title}</h3>
          </div>
          <button
            aria-label="Close trailer modal"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            onClick={onClose}
            type="button"
          >
            <FiX />
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
            title={`${title} trailer`}
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
