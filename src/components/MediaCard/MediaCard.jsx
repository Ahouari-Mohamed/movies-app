import { Link } from 'react-router-dom';
import { buildImageUrl } from '../../api/tmdb';
import { formatRating, formatYear } from '../../utils/helpers';
import StarRating from '../StarRating/StarRating';
import styles from './MediaCard.module.css';

export default function MediaCard({ item, type }) {
  const isGame = type === 'game';
  const isMovie = type === 'movie';

  const getLink = () => {
    if (isGame) return `/jeu/${item.id}`;
    if (isMovie) return `/film/${item.id}`;
    return `/serie/${item.id}`;
  };

  const getImage = () => {
    if (isGame) return item.background_image;
    const path = item.poster_path;
    return path ? buildImageUrl(path, 'w342') : null;
  };

  const getTitle = () => {
    if (isGame) return item.name;
    return item.title || item.name;
  };

  const getYear = () => {
    if (isGame) return item.released ? new Date(item.released).getFullYear() : '';
    const d = item.release_date || item.first_air_date;
    return formatYear(d);
  };

  const getRating = () => {
    if (isGame) return item.rating ? (item.rating / 5) * 10 : 0;
    return item.vote_average || 0;
  };

  const getGenres = () => {
    if (isGame && item.genres) return item.genres.slice(0, 2).map(g => g.name).join(' / ');
    if (item.genre_ids && item.genre_ids.length) return null;
    return null;
  };

  const badgeClass = isGame ? 'badge-game' : isMovie ? 'badge-movie' : 'badge-series';
  const badgeLabel = isGame ? 'JEU' : isMovie ? 'FILM' : 'SÉRIE';
  const accentVar = isGame ? 'var(--accent-game-bright)' : isMovie ? 'var(--accent-movie)' : 'var(--accent-series)';

  const img = getImage();
  const rating = getRating();

  return (
    <Link to={getLink()} className={styles.card}>
      <div className={styles.imageWrap}>
        {img ? (
          <img src={img} alt={getTitle()} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.noImage}>
            <span>No Image</span>
          </div>
        )}
        <div className={styles.overlay} style={{ '--accent': accentVar }} />
        <div className={styles.topBadge}>
          <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
        </div>
        {rating > 0 && (
          <div className={styles.ratingBadge} style={{ '--accent': accentVar }}>
            <span className={styles.ratingNum}>{formatRating(rating)}</span>
          </div>
        )}
        <div className={styles.hoverInfo}>
          <StarRating rating={rating} />
          {getGenres() && <p className={styles.genres}>{getGenres()}</p>}
          <span className={styles.viewBtn} style={{ background: accentVar }}>Voir</span>
        </div>
      </div>
      <div className={styles.meta}>
        <h3 className={styles.title}>{getTitle()}</h3>
        <span className={styles.year}>{getYear()}</span>
      </div>
    </Link>
  );
}
