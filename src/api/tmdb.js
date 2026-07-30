import axios from 'axios';

const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: TMDB_KEY, language: 'fr-FR' },
});

export const tmdbApi = {
  // Catalogue
  getTrendingMovies: (page = 1) =>
    tmdb.get('/trending/movie/week', { params: { page } }).then(r => r.data),
  getTrendingTV: (page = 1) =>
    tmdb.get('/trending/tv/week', { params: { page } }).then(r => r.data),
  getPopularMovies: (page = 1) =>
    tmdb.get('/movie/popular', { params: { page } }).then(r => r.data),
  getPopularTV: (page = 1) =>
    tmdb.get('/tv/popular', { params: { page } }).then(r => r.data),
  getTopRatedMovies: (page = 1) =>
    tmdb.get('/movie/top_rated', { params: { page } }).then(r => r.data),
  getTopRatedTV: (page = 1) =>
    tmdb.get('/tv/top_rated', { params: { page } }).then(r => r.data),

  // Detail pages
  getMovie: (id) =>
    tmdb.get(`/movie/${id}`, { params: { append_to_response: 'credits,videos,similar,images' } }).then(r => r.data),
  getTV: (id) =>
    tmdb.get(`/tv/${id}`, { params: { append_to_response: 'credits,videos,similar,images' } }).then(r => r.data),

  // Search
  searchMulti: (query, page = 1) =>
    tmdb.get('/search/multi', { params: { query, page } }).then(r => r.data),
  searchMovies: (query, page = 1) =>
    tmdb.get('/search/movie', { params: { query, page } }).then(r => r.data),
  searchTV: (query, page = 1) =>
    tmdb.get('/search/tv', { params: { query, page } }).then(r => r.data),

  // Genre
  getMovieGenres: () =>
    tmdb.get('/genre/movie/list').then(r => r.data.genres),
  getTVGenres: () =>
    tmdb.get('/genre/tv/list').then(r => r.data.genres),
  getMoviesByGenre: (genreId, page = 1) =>
    tmdb.get('/discover/movie', { params: { with_genres: genreId, page } }).then(r => r.data),
  getTVByGenre: (genreId, page = 1) =>
    tmdb.get('/discover/tv', { params: { with_genres: genreId, page } }).then(r => r.data),
};

export const buildImageUrl = (path, size = 'w500') =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null;
