import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from '../../api/tmdb';
import DetailLayout from '../../components/DetailLayout/DetailLayout';
import styles from './MovieDetail.module.css';

export default function MovieDetail() {
  const { id } = useParams();

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => tmdbApi.getMovie(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Chargement du film…</p>
      </div>
    );
  }

  if (isError || !movie) {
    return <Navigate to="/" replace />;
  }

  const trailerKey = movie.videos?.results?.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  )?.key || movie.videos?.results?.[0]?.key;

  const cast = movie.credits?.cast || [];
  const similar = movie.similar?.results || [];

  return (
    <DetailLayout
      item={movie}
      type="movie"
      trailerKey={trailerKey}
      cast={cast}
      similar={similar}
    />
  );
}
