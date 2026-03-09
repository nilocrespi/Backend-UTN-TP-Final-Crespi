import React, { useState, useEffect } from 'react';

const MovieForm = React.forwardRef(({ onSubmit, onCancel, editingMovie }, ref) => {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    rating: '',
    director: ''
  });

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        year: editingMovie.year,
        genre: editingMovie.genre,
        rating: editingMovie.rating,
        director: editingMovie.director
      });
    } else {
      setFormData({
        title: '',
        year: '',
        genre: '',
        rating: '',
        director: ''
      });
    }
  }, [editingMovie]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.year || !formData.genre || !formData.rating || !formData.director) {
      alert("debes completar el formulario");
      return;
    }

    const dataToSubmit = {
      title: formData.title,
      year: Number(formData.year),
      genre: formData.genre,
      rating: Number(formData.rating),
      director: formData.director
    };

    onSubmit(dataToSubmit);
  };

  return (
    <div className="movie-form" ref={ref}>
      <h2>{editingMovie ? 'Actualizar película:' : 'Ingresar nueva película:'}</h2>
      <input 
        id="title" 
        type="text" 
        placeholder="Enter title" 
        autoComplete="off"
        value={formData.title}
        onChange={handleChange}
      />
      <input 
        id="year" 
        type="number" 
        placeholder="Enter year" 
        autoComplete="off"
        value={formData.year}
        onChange={handleChange}
      />
      <input 
        id="genre" 
        type="text" 
        placeholder="Enter genre" 
        autoComplete="off"
        value={formData.genre}
        onChange={handleChange}
      />
      <input 
        id="rating" 
        type="number" 
        placeholder="Enter rating" 
        autoComplete="off"
        value={formData.rating}
        onChange={handleChange}
      />
      <input 
        id="director" 
        type="text" 
        placeholder="Enter director" 
        autoComplete="off"
        value={formData.director}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>
        {editingMovie ? 'Editar pelicula' : 'Agregar pelicula'}
      </button>
      {editingMovie && (
        <button onClick={onCancel} className="btn-cancel">
          Cancelar
        </button>
      )}
    </div>
  );
});

MovieForm.displayName = 'MovieForm';
export default MovieForm;