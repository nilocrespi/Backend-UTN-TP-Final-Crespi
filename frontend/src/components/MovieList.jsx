import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onEdit, onDelete }) => {
  return (
    <section className="movie-list">
      {movies.map(movie => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

export default MovieList;