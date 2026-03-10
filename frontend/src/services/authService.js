const BASE_URL = "https://backend-utn-tp-final-crespi.onrender.com/api";

const authService = {
  async register(userData) {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      return data.data;
    } catch (error) {
      throw new Error(error.message || "Error al registrarse");
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      // Guardar token en localStorage
      localStorage.setItem("token", data.data);

      return data.data;
    } catch (error) {
      throw new Error(error.message || "Error al iniciar sesión");
    }
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }
};

export default authService;
