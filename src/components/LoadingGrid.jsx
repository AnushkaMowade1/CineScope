import SkeletonCard from './SkeletonCard';

const LoadingGrid = ({ cardCount = 6, details = false }) => {
  if (details) {
    return (
      <div className="grid gap-8 lg:grid-cols-[320px,1fr]">
        <div className="aspect-[2/3] animate-pulse rounded-[32px] bg-white/[0.06]" />
        <div className="space-y-5">
          <div className="h-4 w-32 animate-pulse rounded-full bg-white/[0.08]" />
          <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-5 w-48 animate-pulse rounded-full bg-white/[0.08]" />
          <div className="h-32 w-full animate-pulse rounded-3xl bg-white/[0.06]" />
          <div className="flex flex-wrap gap-3">
            {[...Array(4)].map((_, index) => (
              <div className="h-10 w-24 animate-pulse rounded-full bg-white/[0.06]" key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(cardCount)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default LoadingGrid;
