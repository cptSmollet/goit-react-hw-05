
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits } from '../../services/movies-api';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        const movieCredits = await fetchMovieCredits(movieId);
        setMovie(movieDetails);
        setCredits(movieCredits);
      } catch (error) {
        console.error('Failed to fetch movie details or credits', error);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div className={css.movieDetailsPage}>
      {loading ? (
        <Loader />
      ) : (
        movie && (
          <div className={css.movieDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={css.moviePoster}
            />
            <div className={css.movieInfo}>
              <h1 className={css.movieTitle}>{movie.title}</h1>
              <p className={css.movieOverview}>{movie.overview}</p>
              <h2>Cast</h2>
              <ul className={css.castList}>
                {credits.map(actor => (
                  <li key={actor.cast_id} className={css.castItem}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      className={css.actorPhoto}
                    />
                    <p className={css.actorName}>{actor.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MovieDetailsPage;

