import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from '../../api/tmdb';
import { rawgApi } from '../../api/rawg';
import Hero from '../../components/Hero/Hero';
import SectionRow from '../../components/SectionRow/SectionRow';
import FilterBar from '../../components/FilterBar/FilterBar';
import SearchResultsGrid from './SearchResultsGrid';
import styles from './Catalogue.module.css';

export default function Catalogue() {
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState('tout');
  const searchQuery = searchParams.get('recherche');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { data: trendingMovies, isLoading: loadingHero } = useQuery({
    queryKey: ['trending-movies'],
    queryFn: () => tmdbApi.getTrendingMovies(),
  });

  const { data: popularMovies, isLoading: loadingMovies } = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => tmdbApi.getPopularMovies(),
    enabled: filter === 'tout' || filter === 'films',
  });

  const { data: topMovies, isLoading: loadingTopMovies } = useQuery({
    queryKey: ['top-movies'],
    queryFn: () => tmdbApi.getTopRatedMovies(),
    enabled: filter === 'tout' || filter === 'films',
  });

  const { data: popularTV, isLoading: loadingTV } = useQuery({
    queryKey: ['popular-tv'],
    queryFn: () => tmdbApi.getPopularTV(),
    enabled: filter === 'tout' || filter === 'series',
  });

  const { data: topTV, isLoading: loadingTopTV } = useQuery({
    queryKey: ['top-tv'],
    queryFn: () => tmdbApi.getTopRatedTV(),
    enabled: filter === 'tout' || filter === 'series',
  });

  const { data: trendingGames, isLoading: loadingGames } = useQuery({
    queryKey: ['trending-games'],
    queryFn: () => rawgApi.getTrending(),
    enabled: filter === 'tout' || filter === 'jeux',
  });

  const { data: topGames, isLoading: loadingTopGames } = useQuery({
    queryKey: ['top-games'],
    queryFn: () => rawgApi.getTopRated(),
    enabled: filter === 'tout' || filter === 'jeux',
  });

  const { data: searchResults, isLoading: loadingSearch } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => tmdbApi.searchMulti(searchQuery),
    enabled: !!searchQuery,
  });

  const { data: searchGames } = useQuery({
    queryKey: ['search-games', searchQuery],
    queryFn: () => rawgApi.searchGames(searchQuery),
    enabled: !!searchQuery,
  });

  if (searchQuery) {
    return (
      <div className={`${styles.page} page-enter`}>
        <div className={styles.searchHeader}>
          <div className={styles.searchHeaderInner}>
            <p className={styles.searchLabel}>Résultats pour</p>
            <h1 className={styles.searchTitle}>"{searchQuery}"</h1>
          </div>
        </div>
        <SearchResultsGrid
          tmdbResults={searchResults?.results || []}
          gameResults={searchGames?.results || []}
          isLoading={loadingSearch}
        />
      </div>
    );
  }

  const showMovies = filter === 'tout' || filter === 'films';
  const showSeries = filter === 'tout' || filter === 'series';
  const showGames = filter === 'tout' || filter === 'jeux';

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Hero */}
      <Hero
        items={trendingMovies?.results || []}
        isLoading={loadingHero}
      />

      {/* Filter */}
      <div className={styles.filterWrap} id="nouveau">
        <FilterBar active={filter} onChange={setFilter} />
      </div>

      {/* FILMS */}
      {showMovies && (
        <>
          <SectionRow
            id="films"
            title="FILMS POPULAIRES"
            items={popularMovies?.results || []}
            type="movie"
            isLoading={loadingMovies}
            dividerClass="divider-movie"
          />
          <SectionRow
            title="FILMS LES MIEUX NOTÉS"
            items={topMovies?.results || []}
            type="movie"
            isLoading={loadingTopMovies}
            dividerClass="divider-movie"
          />
        </>
      )}

      {/* SÉRIES */}
      {showSeries && (
        <>
          <SectionRow
            id="series"
            title="SÉRIES POPULAIRES"
            items={popularTV?.results || []}
            type="series"
            isLoading={loadingTV}
            dividerClass="divider-series"
          />
          <SectionRow
            title="SÉRIES LES MIEUX NOTÉES"
            items={topTV?.results || []}
            type="series"
            isLoading={loadingTopTV}
            dividerClass="divider-series"
          />
        </>
      )}

      {/* JEUX */}
      {showGames && (
        <>
          <SectionRow
            id="jeux"
            title="JEUX TENDANCE"
            items={trendingGames?.results || []}
            type="game"
            isLoading={loadingGames}
            dividerClass="divider-game"
          />
          <SectionRow
            title="JEUX LES MIEUX NOTÉS"
            items={topGames?.results || []}
            type="game"
            isLoading={loadingTopGames}
            dividerClass="divider-game"
          />
        </>
      )}

      {/* Footer spacer */}
      <div className={styles.footerSpacer} />
    </div>
  );
}
