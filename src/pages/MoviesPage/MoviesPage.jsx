import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../services/movies-api';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const searchedMovies = await searchMovies(query);
        setMovies(searchedMovies);
      } catch (error) {
        console.error('Failed to search movies', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (searchQuery) => {
    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={css.moviesPage}>
      <SearchBar onSearch={handleSearch} />
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;



