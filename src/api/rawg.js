import axios from 'axios';

const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const rawg = axios.create({
  baseURL: BASE_URL,
  params: { key: RAWG_KEY },
});

export const rawgApi = {
  getTrending: (page = 1) =>
    rawg.get('/games', { params: { ordering: '-added', page, page_size: 20 } }).then(r => r.data),
  getPopular: (page = 1) =>
    rawg.get('/games', { params: { ordering: '-rating', page, page_size: 20 } }).then(r => r.data),
  getTopRated: (page = 1) =>
    rawg.get('/games', { params: { ordering: '-metacritic', page, page_size: 20 } }).then(r => r.data),
  getGame: (id) =>
    rawg.get(`/games/${id}`).then(r => r.data),
  getGameScreenshots: (id) =>
    rawg.get(`/games/${id}/screenshots`).then(r => r.data),
  getGameTrailers: (id) =>
    rawg.get(`/games/${id}/movies`).then(r => r.data),
  getSimilarGames: (id) =>
    rawg.get(`/games/${id}/game-series`).then(r => r.data),
  searchGames: (query, page = 1) =>
    rawg.get('/games', { params: { search: query, page, page_size: 20 } }).then(r => r.data),
  getGenres: () =>
    rawg.get('/genres').then(r => r.data),
  getGamesByGenre: (slug, page = 1) =>
    rawg.get('/games', { params: { genres: slug, page, page_size: 20 } }).then(r => r.data),
};
