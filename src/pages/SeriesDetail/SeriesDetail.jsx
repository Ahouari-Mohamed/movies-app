import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from '../../api/tmdb';
import DetailLayout from '../../components/DetailLayout/DetailLayout';
import styles from './SeriesDetail.module.css';

export default function SeriesDetail() {
  const { id } = useParams();

  const { data: show, isLoading, isError } = useQuery({
    queryKey: ['tv', id],
    queryFn: () => tmdbApi.getTV(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Chargement de la série…</p>
      </div>
    );
  }

  if (isError || !show) {
    return <Navigate to="/" replace />;
  }

  const trailerKey = show.videos?.results?.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  )?.key || show.videos?.results?.[0]?.key;

  const cast = show.credits?.cast || [];
  const similar = show.similar?.results || [];

  return (
    <DetailLayout
      item={show}
      type="series"
      trailerKey={trailerKey}
      cast={cast}
      similar={similar}
    />
  );
}
