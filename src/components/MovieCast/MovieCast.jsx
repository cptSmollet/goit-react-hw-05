
import React from 'react';
import css from './MovieCast.module.css';

const MovieCast = ({ cast }) => {
  return (
    <div className={css.movieCast}>
      <h2>Cast</h2>
      <ul className={css.castList}>
        {cast.map(actor => (
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
  );
};

export default MovieCast;

