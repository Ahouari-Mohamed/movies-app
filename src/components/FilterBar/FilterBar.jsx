import styles from './FilterBar.module.css';

const FILTERS = [
  { key: 'tout', label: 'Tout' },
  { key: 'films', label: 'Films' },
  { key: 'series', label: 'Séries' },
  { key: 'jeux', label: 'Jeux' },
];

export default function FilterBar({ active, onChange }) {
  return (
    <div className={styles.bar}>
      {FILTERS.map(f => (
        <button
          key={f.key}
          className={`${styles.tab} ${active === f.key ? styles.active : ''}`}
          onClick={() => onChange(f.key)}
          data-key={f.key}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
