import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits } from '../../services/movies-api';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const backLinkHref = location.state?.from || '/movies';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        const creditsData = await fetchMovieCredits(movieId);
        setMovie(movieData);
        setCredits(creditsData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  const { title, overview, genres, poster_path, vote_average } = movie;

  return (
    <div className={css.container}>
      <Link to={backLinkHref}>Go back</Link>
      <div className={css.header}>
        {poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className={css.poster}
          />
        )}
        <div className={css.details}>
          <h1 className={css.title}>{title}</h1>
          <p className={css.description}>{overview}</p>
          <p className={css.genres}>
            Genres: {genres.map(genre => genre.name).join(', ')}
          </p>
          <p className={css.userScore}>User Score: {vote_average}</p>
        </div>
      </div>
      <h2>Cast</h2>
      <ul className={css.actorsList}>
        {credits && credits.map(actor => (
          <li key={actor.cast_id} className={css.actorItem}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={css.actorImage}
              />
            )}
            <span>{actor.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetailsPage;


