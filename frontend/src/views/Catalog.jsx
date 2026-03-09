import React, { useState, useEffect, useRef } from 'react';
import MovieForm from "../components/MovieForm";
import MovieList from '../components/MovieList';
import FilterMovies from '../components/FilterMovies';
import movieService from '../services/movieService';
import Header from "../components/Header"
import '../styles/Home.css';
import Swal from "sweetalert2"


const Catalog = () => {
  	const [movies, setMovies] = useState([]);
  	const [editingMovie, setEditingMovie] = useState(null);
	const [resetFormKey, setResetFormKey] = useState(0);
	const movieFormRef = useRef(null);

  	useEffect(() => {
    	loadMovies();
 	}, []);

	const loadMovies = async (filters = {}) => {
		try {
		const moviesData = await movieService.getMovies(filters);
		setMovies(moviesData);
		} catch (error) {
		Swal.fire("Error", error.message || "Error al cargar películas", "error");
		}
	};

	const handleAddMovie = async (dataMovie) => {
		try {
		const createdMovie = await movieService.addMovie(dataMovie);
		Swal.fire("Éxito", `Película agregada correctamente (ID: ${createdMovie._id})`, "success");
		loadMovies();
		setResetFormKey(prev => prev + 1);
		} catch (error) {
		Swal.fire("Error", error.message || "Error al agregar película", "error");
		}
	};

	const handleUpdateMovie = async (updatedData) => {
		try {
		const updatedMovie = await movieService.updateMovie(editingMovie._id, updatedData);
		Swal.fire("Éxito", `Película actualizada (ID: ${updatedMovie._id})`, "success");
		loadMovies();
		setEditingMovie(null);
		} catch (error) {
		Swal.fire("Error", error.message || "No se puede actualizar", "error");
		}
	};

	const handleDeleteMovie = async (id) => {
		const validateDelete = await Swal.fire({
			title: "¿Estás seguro?",
			text: "No podrás deshacer esta acción",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar"
		});

		if (!validateDelete.isConfirmed) {
			return;
		}

		try {
			const deletedMovie = await movieService.deleteMovie(id);
			Swal.fire("Eliminada", `La película ${deletedMovie.title} fue borrada`, "success");
			loadMovies();
		} catch (error) {
			Swal.fire("Error", error.message || "No se pudo borrar la película", "error");
		}
	};

	const handleEditingMovie = (id) => {
		const foundMovie = movies.find(m => m._id === id);
		setEditingMovie(foundMovie);
		
		// Scroll al formulario después de actualizar el estado
		setTimeout(() => {
			movieFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}, 50);
	};

	const handleFormSubmit = (dataMovie) => {
		if (editingMovie) {
		handleUpdateMovie(dataMovie);
		} else {
		handleAddMovie(dataMovie);
		}
	};

	const handleCancelEdit = () => {
		setEditingMovie(null);
	};

  	return (
		<>      
			<Header/>
			<div className="app-container">
				<MovieForm 
				ref={movieFormRef}
				onSubmit={handleFormSubmit}
				onCancel={handleCancelEdit}
				editingMovie={editingMovie}
			resetKey={resetFormKey}
				/>

				<MovieList 
					movies={movies}
					onEdit={handleEditingMovie}
					onDelete={handleDeleteMovie}
				/>
			</div>
		</>
  	);
}

export default Catalog;