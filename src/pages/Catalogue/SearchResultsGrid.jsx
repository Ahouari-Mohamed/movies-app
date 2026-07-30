import MediaCard from '../../components/MediaCard/MediaCard';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import styles from './SearchResultsGrid.module.css';

export default function SearchResultsGrid({ tmdbResults, gameResults, isLoading }) {
  const movies = tmdbResults.filter(r => r.media_type === 'movie');
  const series = tmdbResults.filter(r => r.media_type === 'tv');

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} type="portrait" />
        ))}
      </div>
    );
  }

  const total = movies.length + series.length + gameResults.length;

  if (total === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🔍</div>
        <p className={styles.emptyText}>Aucun résultat trouvé</p>
        <p className={styles.emptySub}>Essayez un autre terme de recherche</p>
      </div>
    );
  }

  return (
    <div className={styles.sections}>
      {movies.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className="section-divider divider-movie" />
            <h2 className={styles.sectionTitle}>Films ({movies.length})</h2>
          </div>
          <div className={styles.grid}>
            {movies.map(m => <MediaCard key={m.id} item={m} type="movie" />)}
          </div>
        </div>
      )}

      {series.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className="section-divider divider-series" />
            <h2 className={styles.sectionTitle}>Séries ({series.length})</h2>
          </div>
          <div className={styles.grid}>
            {series.map(s => <MediaCard key={s.id} item={s} type="series" />)}
          </div>
        </div>
      )}

      {gameResults.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className="section-divider divider-game" />
            <h2 className={styles.sectionTitle}>Jeux ({gameResults.length})</h2>
          </div>
          <div className={styles.grid}>
            {gameResults.map(g => <MediaCard key={g.id} item={g} type="game" />)}
          </div>
        </div>
      )}
    </div>
  );
}
