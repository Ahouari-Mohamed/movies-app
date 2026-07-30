export default function StarRating({ rating, max = 10, outOf = 5 }) {
  const normalized = (rating / max) * outOf;
  const full = Math.floor(normalized);
  const half = normalized - full >= 0.5;
  const empty = outOf - full - (half ? 1 : 0);

  return (
    <div className="stars" title={`${rating}/${max}`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f${i}`} className="star">★</span>
      ))}
      {half && <span className="star">½</span>}
      {Array.from({ length: Math.max(0, empty) }).map((_, i) => (
        <span key={`e${i}`} className="star empty">☆</span>
      ))}
    </div>
  );
}
