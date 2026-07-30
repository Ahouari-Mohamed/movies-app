import styles from './SkeletonCard.module.css';

export default function SkeletonCard({ type = 'portrait' }) {
  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={`skeleton ${styles.image}`} />
      <div className={styles.info}>
        <div className={`skeleton ${styles.title}`} />
        <div className={`skeleton ${styles.sub}`} />
      </div>
    </div>
  );
}
