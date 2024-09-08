
import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../services/movies-api';
import Loader from '../../components/Loader/Loader';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async (query) => {
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

  return (
    <div className={css.moviesPage}>
      <SearchBar onSearch={handleSearch} />
      {loading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;


