import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { buildImageUrl } from '../../api/tmdb';
import { formatRating, formatDate, formatRuntime } from '../../utils/helpers';
import StarRating from '../StarRating/StarRating';
import MediaCard from '../MediaCard/MediaCard';
import styles from './DetailLayout.module.css';

export default function DetailLayout({
  item,
  type, // 'movie' | 'series'
  trailerKey,
  cast = [],
  similar = [],
}) {
  const videoRef = useRef(null);

  const isMovie = type === 'movie';
  const title = item.title || item.name;
  const backdrop = item.backdrop_path ? buildImageUrl(item.backdrop_path, 'original') : null;
  const poster = item.poster_path ? buildImageUrl(item.poster_path, 'w500') : null;
  const rating = item.vote_average || 0;
  const releaseDate = item.release_date || item.first_air_date;
  const genres = item.genres || [];
  const accentColor = isMovie ? 'var(--accent-movie)' : 'var(--accent-series)';
  const badgeClass = isMovie ? 'badge-movie' : 'badge-series';
  const badgeLabel = isMovie ? 'FILM' : 'SÉRIE';
  const dividerClass = isMovie ? 'divider-movie' : 'divider-series';

  const scrollToVideo = () => {
    videoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Backdrop */}
      {backdrop && (
        <div className={styles.backdropWrap}>
          <img src={backdrop} alt={title} className={styles.backdropImg} />
          <div className={styles.backdropGradient} />
        </div>
      )}

      {/* Back button */}
      <div className={styles.backRow}>
        <Link to="/" className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour
        </Link>
      </div>

      {/* Main content */}
      <div className={styles.main}>
        {/* Poster */}
        <div className={styles.posterCol}>
          {poster ? (
            <img src={poster} alt={title} className={styles.poster} />
          ) : (
            <div className={styles.noPoster}>Pas d'image</div>
          )}
          <div className={styles.posterBadge}>
            <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
          </div>
        </div>

        {/* Info */}
        <div className={styles.infoCol}>
          {/* Genres */}
          <div className={styles.genreRow}>
            {genres.map(g => (
              <span key={g.id} className={styles.genreTag} style={{ '--accent': accentColor }}>
                {g.name}
              </span>
            ))}
          </div>

          <h1 className={styles.title}>{title}</h1>

          {/* Metadata row */}
          <div className={styles.metaRow}>
            {releaseDate && (
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {formatDate(releaseDate)}
              </span>
            )}
            {item.runtime && (
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {formatRuntime(item.runtime)}
              </span>
            )}
            {item.number_of_seasons && (
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
                {item.number_of_seasons} saison{item.number_of_seasons > 1 ? 's' : ''}
              </span>
            )}
            {item.vote_count > 0 && (
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                </svg>
                {item.vote_count.toLocaleString('fr-FR')} votes
              </span>
            )}
          </div>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.ratingScore} style={{ '--accent': accentColor }}>
              <span className={styles.ratingNum}>{formatRating(rating)}</span>
              <span className={styles.ratingMax}>/10</span>
            </div>
            <StarRating rating={rating} />
          </div>

          {/* Overview */}
          {item.overview && (
            <div className={styles.overviewBlock}>
              <div className={`section-divider ${dividerClass}`} />
              <h3 className={styles.overviewTitle}>Synopsis</h3>
              <p className={styles.overview}>{item.overview}</p>
            </div>
          )}

          {/* Credits */}
          {isMovie && item.credits?.crew && (
            <div className={styles.creditsRow}>
              {item.credits.crew.filter(c => c.job === 'Director').slice(0, 1).map(d => (
                <div key={d.id} className={styles.creditItem}>
                  <span className={styles.creditLabel}>Réalisateur</span>
                  <span className={styles.creditName}>{d.name}</span>
                </div>
              ))}
              {item.credits?.cast?.slice(0, 4).length > 0 && (
                <div className={styles.creditItem}>
                  <span className={styles.creditLabel}>Avec</span>
                  <span className={styles.creditName}>
                    {item.credits.cast.slice(0, 4).map(a => a.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className={styles.actions}>
            {trailerKey && (
              <button className={styles.trailerBtn} onClick={scrollToVideo} style={{ '--accent': accentColor }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Voir la bande-annonce
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cast */}
      {cast.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={`section-divider ${dividerClass}`} />
            <h2 className={styles.sectionTitle}>Distribution</h2>
          </div>
          <div className={styles.castGrid}>
            {cast.slice(0, 12).map(member => (
              <div key={member.id} className={styles.castCard}>
                {member.profile_path ? (
                  <img
                    src={buildImageUrl(member.profile_path, 'w185')}
                    alt={member.name}
                    className={styles.castPhoto}
                  />
                ) : (
                  <div className={styles.castNoPhoto}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                )}
                <div className={styles.castInfo}>
                  <p className={styles.castName}>{member.name}</p>
                  <p className={styles.castRole}>{member.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trailer */}
      {trailerKey && (
        <section className={styles.section} ref={videoRef}>
          <div className={styles.sectionHeader}>
            <div className={`section-divider ${dividerClass}`} />
            <h2 className={styles.sectionTitle}>Bande-annonce</h2>
          </div>
          <div className={styles.videoWrap}>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Bande-annonce"
              allowFullScreen
              className={styles.video}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </section>
      )}

      {/* Similar */}
      {similar.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={`section-divider ${dividerClass}`} />
            <h2 className={styles.sectionTitle}>Vous aimerez aussi</h2>
          </div>
          <div className={styles.similarRow}>
            {similar.slice(0, 12).map(s => (
              <MediaCard key={s.id} item={s} type={type} />
            ))}
          </div>
        </section>
      )}

      <div style={{ height: '4rem' }} />
    </div>
  );
}
