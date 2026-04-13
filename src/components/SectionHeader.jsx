const SectionHeader = ({ eyebrow, title, description, action }) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="text-sm leading-7 text-mist sm:text-base">{description}</p> : null}
    </div>
    {action ? <div className="flex items-center gap-2">{action}</div> : null}
  </div>
);

export default SectionHeader;
