import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { buildImageUrl } from '../../api/tmdb';
import { formatRating, formatYear } from '../../utils/helpers';
import StarRating from '../StarRating/StarRating';
import styles from './Hero.module.css';

export default function Hero({ items = [], isLoading }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % Math.min(items.length, 5));
    }, 6000);
    return () => clearInterval(timer);
  }, [items]);

  if (isLoading || !items.length) {
    return <div className={`${styles.hero} skeleton`} style={{ height: '85vh' }} />;
  }

  const item = items[current];
  const backdrop = item.backdrop_path ? buildImageUrl(item.backdrop_path, 'original') : null;
  const title = item.title || item.name;
  const year = formatYear(item.release_date || item.first_air_date);
  const rating = item.vote_average || 0;
  const isMovie = !!item.title;
  const link = isMovie ? `/film/${item.id}` : `/serie/${item.id}`;
  const type = isMovie ? 'FILM' : 'SÉRIE';
  const typeClass = isMovie ? 'badge-movie' : 'badge-series';

  return (
    <section className={styles.hero}>
      {backdrop && (
        <img
          key={backdrop}
          src={backdrop}
          alt={title}
          className={styles.backdrop}
        />
      )}
      <div className={styles.gradients} />

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={`badge ${typeClass}`}>{type}</span>
          {item.genres?.slice(0, 3).map(g => (
            <span key={g.id} className={styles.genre}>{g.name}</span>
          ))}
        </div>

        <h1 className={styles.title}>{title}</h1>

        <div className={styles.infos}>
          {year && <span className={styles.year}>{year}</span>}
          {item.runtime && <span className={styles.dot}>·</span>}
          {item.runtime && <span>{Math.floor(item.runtime / 60)}h {item.runtime % 60}min</span>}
          <span className={styles.dot}>·</span>
          <StarRating rating={rating} />
          <span className={styles.ratingText}>{formatRating(rating)}/10</span>
        </div>

        {item.overview && (
          <p className={styles.overview}>{item.overview.slice(0, 220)}{item.overview.length > 220 ? '…' : ''}</p>
        )}

        <div className={styles.actions}>
          <Link to={link} className={styles.watchBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Voir maintenant
          </Link>
          <Link to={link} className={styles.infoBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            Plus d'infos
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className={styles.dots}>
        {items.slice(0, 5).map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
