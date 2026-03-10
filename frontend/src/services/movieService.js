const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-utn-tp-final-crespi.onrender.com/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const movieService = {
  async getMovies(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const url = queryParams.toString() 
        ? `${BASE_URL}/movies?${queryParams.toString()}`
        : `${BASE_URL}/movies`;

      const response = await fetch(url, {
        method: "GET",
        headers: getHeaders()
      });
      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.error);
      }
      
      return responseData.data;
    } catch (error) {
      throw new Error("Error al traer peliculas, el servidor no responde");
    }
  },

  async addMovie(dataMovie) {
    try {
      const response = await fetch(`${BASE_URL}/movies`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(dataMovie)
      });
      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.error);
      }
      
      return responseData.data;
    } catch (error) {
      throw new Error(error.message || "Error al agregar película");
    }
  },

  async updateMovie(id, updatedData) {
    try {
      const res = await fetch(`${BASE_URL}/movies/${id}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(updatedData)
      });

      const dataUpdatedMovie = await res.json();
      
      if (!dataUpdatedMovie.success) {
        throw new Error(dataUpdatedMovie.error);
      }

      return dataUpdatedMovie.data;
    } catch (error) {
      throw new Error(error.message || "No se puede actualizar");
    }
  },

  async deleteMovie(id) {
    try {
      const res = await fetch(`${BASE_URL}/movies/${id}`, { 
        method: "DELETE",
        headers: getHeaders()
      });
      const responseData = await res.json();
      
      if (!responseData.success) {
        throw new Error(responseData.error);
      }
      
      return responseData.data;
    } catch (error) {
      throw new Error(error.message || "Error al borrar película");
    }
  }
};

export default movieService;