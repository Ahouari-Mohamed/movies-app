export const formatDate = (dateStr) => {
  if (!dateStr) return 'Inconnue';
  return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
};

export const formatYear = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).getFullYear();
};

export const formatRuntime = (minutes) => {
  if (!minutes) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
};

export const formatRating = (rating) => {
  if (!rating) return 'N/A';
  return Number(rating).toFixed(1);
};

export const formatVoteCount = (count) => {
  if (!count) return '0';
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
};

export const platformIcons = {
  'PlayStation 5': 'PS5',
  'PlayStation 4': 'PS4',
  'Xbox Series S/X': 'XBOX',
  'Xbox One': 'XBOX',
  'PC': 'PC',
  'Nintendo Switch': 'NSW',
  'iOS': 'iOS',
  'Android': 'AND',
  'macOS': 'MAC',
  'Linux': 'LNX',
};

export const getPlatformLabel = (platform) => platformIcons[platform] || platform.substring(0, 4).toUpperCase();

export const tmdbGenreNames = {
  28: 'Action', 12: 'Aventure', 16: 'Animation', 35: 'Comédie',
  80: 'Crime', 99: 'Documentaire', 18: 'Drame', 10751: 'Famille',
  14: 'Fantastique', 36: 'Histoire', 27: 'Horreur', 10402: 'Musique',
  9648: 'Mystère', 10749: 'Romance', 878: 'Science-Fiction', 10770: 'Téléfilm',
  53: 'Thriller', 10752: 'Guerre', 37: 'Western', 10759: 'Action & Aventure',
  10762: 'Kids', 10763: 'Actualités', 10764: 'Réalité', 10765: 'Sci-Fi & Fantasy',
  10766: 'Soap', 10767: 'Talk', 10768: 'Guerre & Politique', 37: 'Western',
};
