import { useRef } from 'react';
import MediaCard from '../MediaCard/MediaCard';
import SkeletonCard from '../SkeletonCard/SkeletonCard';
import styles from './SectionRow.module.css';

export default function SectionRow({ title, items, type, isLoading, accentClass, dividerClass, id }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir * 600, behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.section} id={id}>
      <div className={styles.header}>
        <div>
          <div className={`section-divider ${dividerClass}`} />
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={() => scroll(-1)} aria-label="Précédent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className={styles.arrow} onClick={() => scroll(1)} aria-label="Suivant">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.rowWrap}>
        <div className={styles.row} ref={rowRef}>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} type="portrait" />)
            : items?.map(item => (
                <MediaCard key={item.id} item={item} type={type} />
              ))
          }
        </div>
        <div className={`${styles.fadeLeft}`} />
        <div className={`${styles.fadeRight}`} />
      </div>
    </section>
  );
}
