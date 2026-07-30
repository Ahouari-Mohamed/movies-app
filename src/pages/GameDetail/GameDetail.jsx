import { useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { rawgApi } from '../../api/rawg';
import { formatRating, formatDate, getPlatformLabel } from '../../utils/helpers';
import StarRating from '../../components/StarRating/StarRating';
import MediaCard from '../../components/MediaCard/MediaCard';
import styles from './GameDetail.module.css';

export default function GameDetail() {
  const { id } = useParams();
  const screenshotRef = useRef(null);

  const { data: game, isLoading, isError } = useQuery({
    queryKey: ['game', id],
    queryFn: () => rawgApi.getGame(id),
    enabled: !!id,
  });

  const { data: screenshots } = useQuery({
    queryKey: ['game-screenshots', id],
    queryFn: () => rawgApi.getGameScreenshots(id),
    enabled: !!id,
  });

  const { data: trailers } = useQuery({
    queryKey: ['game-trailers', id],
    queryFn: () => rawgApi.getGameTrailers(id),
    enabled: !!id,
  });

  const { data: similar } = useQuery({
    queryKey: ['game-similar', id],
    queryFn: () => rawgApi.getSimilarGames(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Chargement du jeu…</p>
      </div>
    );
  }

  if (isError || !game) {
    return <Navigate to="/" replace />;
  }

  const rating = game.rating ? (game.rating / 5) * 10 : 0;
  const platforms = game.platforms?.map(p => p.platform.name) || [];
  const genres = game.genres || [];
  const tags = game.tags?.slice(0, 8) || [];
  const screenList = screenshots?.results || [];
  const trailerList = trailers?.results || [];
  const similarGames = similar?.results || [];
  const stores = game.stores || [];

  const scrollScreenshots = (dir) => {
    screenshotRef.current?.scrollBy({ left: dir * 480, behavior: 'smooth' });
  };

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Hero backdrop */}
      {game.background_image && (
        <div className={styles.backdropWrap}>
          <img src={game.background_image} alt={game.name} className={styles.backdropImg} />
          <div className={styles.backdropGradient} />
        </div>
      )}

      {/* Back */}
      <div className={styles.backRow}>
        <Link to="/" className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour
        </Link>
      </div>

      {/* Main grid */}
      <div className={styles.main}>
        {/* Cover image */}
        <div className={styles.coverCol}>
          {game.background_image ? (
            <img src={game.background_image} alt={game.name} className={styles.cover} />
          ) : (
            <div className={styles.noCover}>Pas d'image</div>
          )}
          <span className="badge badge-game" style={{ marginTop: '0.75rem', display: 'inline-block' }}>JEU</span>

          {/* Platforms */}
          {platforms.length > 0 && (
            <div className={styles.platformList}>
              {platforms.slice(0, 6).map(p => (
                <span key={p} className={styles.platformTag}>{getPlatformLabel(p)}</span>
              ))}
            </div>
          )}

          {/* Price tag */}
          {game.metacritic && (
            <div className={styles.metacriticBadge}>
              <span className={styles.metacriticLabel}>Metacritic</span>
              <span
                className={styles.metacriticScore}
                style={{ color: game.metacritic >= 75 ? '#4caf50' : game.metacritic >= 50 ? '#ff9800' : '#f44336' }}
              >
                {game.metacritic}
              </span>
            </div>
          )}

          {/* Stores */}
          {stores.length > 0 && (
            <div className={styles.storeSection}>
              <p className={styles.storeLabel}>Disponible sur</p>
              <div className={styles.storeList}>
                {stores.map(s => (
                  <a
                    key={s.store.id}
                    href={`https://${s.store.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.storeBtn}
                  >
                    {s.store.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info column */}
        <div className={styles.infoCol}>
          {/* Genres */}
          <div className={styles.genreRow}>
            {genres.map(g => (
              <span key={g.id} className={styles.genreTag}>{g.name}</span>
            ))}
          </div>

          <h1 className={styles.title}>{game.name}</h1>

          {/* Meta */}
          <div className={styles.metaRow}>
            {game.released && (
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {formatDate(game.released)}
              </span>
            )}
            {game.playtime > 0 && (
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                ~{game.playtime}h de jeu
              </span>
            )}
            {game.ratings_count > 0 && (
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                </svg>
                {game.ratings_count.toLocaleString('fr-FR')} avis
              </span>
            )}
            {game.esrb_rating && (
              <span className={styles.metaItem}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                {game.esrb_rating.name}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className={styles.ratingRow}>
            <div className={styles.ratingScore}>
              <span className={styles.ratingNum}>{formatRating(rating)}</span>
              <span className={styles.ratingMax}>/10</span>
            </div>
            <StarRating rating={rating} />
            {game.ratings?.length > 0 && (
              <div className={styles.ratingBreakdown}>
                {game.ratings.map(r => (
                  <div key={r.id} className={styles.ratingBar}>
                    <span className={styles.ratingBarLabel}>{r.title}</span>
                    <div className={styles.ratingBarTrack}>
                      <div
                        className={styles.ratingBarFill}
                        style={{ width: `${r.percent}%` }}
                      />
                    </div>
                    <span className={styles.ratingBarPct}>{Math.round(r.percent)}%</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          {game.description_raw && (
            <div className={styles.descBlock}>
              <div className="section-divider divider-game" />
              <h3 className={styles.descTitle}>Description</h3>
              <p className={styles.desc}>
                {game.description_raw.slice(0, 600)}
                {game.description_raw.length > 600 ? '…' : ''}
              </p>
            </div>
          )}

          {/* Developers / Publishers */}
          <div className={styles.creditsGrid}>
            {game.developers?.length > 0 && (
              <div className={styles.creditItem}>
                <span className={styles.creditLabel}>Développeur{game.developers.length > 1 ? 's' : ''}</span>
                <span className={styles.creditValue}>{game.developers.map(d => d.name).join(', ')}</span>
              </div>
            )}
            {game.publishers?.length > 0 && (
              <div className={styles.creditItem}>
                <span className={styles.creditLabel}>Éditeur{game.publishers.length > 1 ? 's' : ''}</span>
                <span className={styles.creditValue}>{game.publishers.map(p => p.name).join(', ')}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map(t => (
                <span key={t.id} className={styles.tag}>{t.name}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Screenshots section */}
      {screenList.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className="section-divider divider-game" />
              <h2 className={styles.sectionTitle}>Captures d'écran</h2>
            </div>
            <div className={styles.arrows}>
              <button className={styles.arrowBtn} onClick={() => scrollScreenshots(-1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button className={styles.arrowBtn} onClick={() => scrollScreenshots(1)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.screenshotRow} ref={screenshotRef}>
            {screenList.map(s => (
              <div key={s.id} className={styles.screenshotCard}>
                <img src={s.image} alt="Screenshot" className={styles.screenshot} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trailer */}
      {trailerList.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className="section-divider divider-game" />
              <h2 className={styles.sectionTitle}>Bande-annonce</h2>
            </div>
          </div>
          <div className={styles.videoWrap}>
            <video
              src={trailerList[0].data?.max || trailerList[0].data?.['480']}
              poster={trailerList[0].preview}
              controls
              className={styles.video}
            />
          </div>
        </section>
      )}

      {/* Similar games */}
      {similarGames.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <div className="section-divider divider-game" />
              <h2 className={styles.sectionTitle}>Jeux similaires</h2>
            </div>
          </div>
          <div className={styles.similarRow}>
            {similarGames.slice(0, 12).map(g => (
              <MediaCard key={g.id} item={g} type="game" />
            ))}
          </div>
        </section>
      )}

      <div style={{ height: '4rem' }} />
    </div>
  );
}
