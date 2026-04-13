const SkeletonCard = () => (
  <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
    <div className="aspect-[2/3] animate-pulse bg-white/[0.06]" />
    <div className="space-y-3 p-5">
      <div className="h-3 w-24 animate-pulse rounded-full bg-white/[0.08]" />
      <div className="h-6 w-2/3 animate-pulse rounded-full bg-white/10" />
      <div className="h-4 w-full animate-pulse rounded-full bg-white/[0.06]" />
      <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/[0.06]" />
    </div>
  </div>
);

export default SkeletonCard;
