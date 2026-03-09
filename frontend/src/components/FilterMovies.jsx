import React, { useState } from 'react';
import Swal from 'sweetalert2';

const FilterMovies = ({ onFilter, onClearFilter }) => {
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    minYear: '',
    maxYear: '',
    minRating: '',
    maxRating: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilter = () => {
    onFilter(filters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({
      title: '',
      genre: '',
      minYear: '',
      maxYear: '',
      minRating: '',
      maxRating: ''
    });
    onClearFilter();
  };

  return (
    <div className="filter-section">
      <button 
        className="btn-filter-toggle"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? '▼ Ocultar Filtros' : '▶ Mostrar Filtros'}
      </button>

      {showFilters && (
        <div className="filter-form">
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={filters.title}
                onChange={handleChange}
                placeholder="Buscar por título"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="genre">Género:</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={filters.genre}
                onChange={handleChange}
                placeholder="Ej: Action, Drama"
              />
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="minYear">Año Mínimo:</label>
              <input
                type="number"
                id="minYear"
                name="minYear"
                value={filters.minYear}
                onChange={handleChange}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="maxYear">Año Máximo:</label>
              <input
                type="number"
                id="maxYear"
                name="maxYear"
                value={filters.maxYear}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="minRating">Rating Mínimo:</label>
              <input
                type="number"
                id="minRating"
                name="minRating"
                value={filters.minRating}
                onChange={handleChange}
                placeholder="Ej: 5"
                min="0"
                max="10"
                step="0.1"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="maxRating">Rating Máximo:</label>
              <input
                type="number"
                id="maxRating"
                name="maxRating"
                value={filters.maxRating}
                onChange={handleChange}
                placeholder="Ej: 10"
                min="0"
                max="10"
                step="0.1"
              />
            </div>
          </div>

          <div className="filter-buttons">
            <button className="btn-apply-filter" onClick={handleFilter}>
              Aplicar Filtros
            </button>
            <button className="btn-clear-filter" onClick={handleClearFilters}>
              Limpiar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMovies;
