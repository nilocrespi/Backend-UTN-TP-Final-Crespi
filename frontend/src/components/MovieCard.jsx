import React from 'react';

const MovieCard = ({ movie, onEdit, onDelete }) => {
  const { title, year, genre, rating, director, _id } = movie;

  return (
    <div className="movie-card">
      <h3>Title: {title}</h3>
      <p>Year: {year}</p>
      <p>Genre: {genre}</p>
      <p>Rating: {rating}</p>
      <p>Director: {director}</p>
      <button onClick={() => onEdit(_id)} className="btn-edit">
        Actualizar
      </button>
      <button onClick={() => onDelete(_id)} className="btn-delete">
        Borrar
      </button>
    </div>
  );
};

export default MovieCard;