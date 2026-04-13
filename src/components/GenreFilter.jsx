const GenreFilter = ({ genres = [], selectedGenre, onChange }) => (
  <div className="flex flex-wrap gap-3">
    <button
      className={`chip ${selectedGenre ? '' : 'chip-active'}`}
      onClick={() => onChange(null)}
      type="button"
    >
      All genres
    </button>
    {genres.map((genre) => (
      <button
        className={`chip ${selectedGenre === genre.id ? 'chip-active' : ''}`}
        key={genre.id}
        onClick={() => onChange(genre.id)}
        type="button"
      >
        {genre.name}
      </button>
    ))}
  </div>
);

export default GenreFilter;
