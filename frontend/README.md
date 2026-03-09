# Frontend - Movie Management Application

Aplicación React moderna para gestionar películas con autenticación, búsqueda y filtrado. Desarrollada con React, Vite y Context API.

---

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura](#estructura)
- [Componentes](#componentes)
- [Context API](#context-api)
- [Servicios](#servicios)
- [Variables de Entorno](#variables-de-entorno)
- [Solución de Problemas](#solución-de-problemas)

---

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Asegurarse que el backend está corriendo

```bash
# En otra terminal
cd backend
npm run dev
```

---

## 🚀 Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5173` con recarga en caliente.

### Build para producción
```bash
npm run build
```

### Preview de build
```bash
npm run preview
```

### Lint (ESLint)
```bash
npm run lint
```

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── FilterMovies.jsx          # Filtros de búsqueda
│   ├── Header.jsx                # Barra de navegación
│   ├── MovieCard.jsx             # Tarjeta de película
│   ├── MovieForm.jsx             # Formulario de creación/edición
│   └── MovieList.jsx             # Lista de películas
├── context/
│   └── AuthContext.jsx           # Estado global de autenticación
├── router/
│   └── RouterApp.jsx             # Configuración de rutas
├── services/
│   ├── authService.js            # Llamadas API de autenticación
│   └── movieService.js           # Llamadas API de películas
├── views/
│   ├── About.jsx                 # Página Acerca de
│   ├── Catalog.jsx               # Catálogo de películas
│   ├── Login.jsx                 # Página de login
│   ├── Register.jsx              # Página de registro
│   └── NotFound.jsx              # Página 404
├── styles/
│   └── Home.css                  # Estilos globales
├── utils/
│   └── popup.js                  # Utilidades para notificaciones
└── main.jsx                      # Punto de entrada
```

---

## 🧩 Componentes

### Header
Barra de navegación con logo, menú y opciones de usuario.

**Props:**
- `user` - Información del usuario autenticado
- `onLogout` - Función ejecutada al cerrar sesión

### MovieCard
Tarjeta visual de una película.

**Props:**
```jsx
<MovieCard
  movie={{
    _id: "507f1f77bcf86cd799439011",
    title: "Inception",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8
  }}
  onDelete={(id) => deleteMovie(id)}
  onEdit={(id) => editMovie(id)}
/>
```

### MovieList
Lista de películas con soporte para filtrado.

**Props:**
```jsx
<MovieList
  movies={movies}
  filter={filterText}
  onDelete={handleDelete}
  onEdit={handleEdit}
/>
```

### MovieForm
Formulario para crear o editar películas.

**Props:**
```jsx
<MovieForm
  movie={null} // null para crear, objeto para editar
  onSubmit={(data) => handleSubmit(data)}
  onCancel={() => setShowForm(false)}
/>
```

### FilterMovies
Controles para filtrar películas.

**Props:**
```jsx
<FilterMovies
  onFilterChange={(filter) => setFilter(filter)}
/>
```

---

## 🌐 Context API

### AuthContext

Proporciona estado global de autenticación.

**Estados:**
```javascript
{
  user: {
    _id: "507f1f77bcf86cd799439011",
    email: "usuario@example.com"
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  isAuthenticated: true,
  loading: false,
  error: null
}
```

**Métodos:**
```javascript
// Usar el context
const { user, token, isAuthenticated, login, logout, register } = useContext(AuthContext);

// Login
login(email, password);

// Registro
register(email, password, name);

// Logout
logout();
```

---

## 🔌 Servicios

### authService.js

```javascript
// Login
const response = await authService.login(email, password);
// Retorna: { token, user }

// Registro
const response = await authService.register(email, password, name);
// Retorna: { token, user }

// Logout
authService.logout();
```

### movieService.js

```javascript
// Obtener todas las películas
const movies = await movieService.getAll(token);

// Obtener película por ID
const movie = await movieService.getById(id, token);

// Crear película
const newMovie = await movieService.create(movieData, token);

// Actualizar película
const updated = await movieService.update(id, movieData, token);

// Eliminar película
await movieService.delete(id, token);
```

---

## 🔐 Variables de Entorno

### .env requerido

```env
# URL de la API del backend
VITE_API_URL=http://localhost:5000/api
```

### Acceder en el código

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## 🎯 Flujo de Autenticación

```
┌─────────────────┐
│   Login Page    │
└────────┬────────┘
         │
         v
┌──────────────────────┐
│  authService.login() │
└────────┬─────────────┘
         │
         v
┌────────────────────┐
│   Backend API      │
└────────┬───────────┘
         │
         v
┌──────────────────────────────────┐
│  AuthContext (Save token/user)   │
└────────┬───────────────────────────┘
         │
         v
┌──────────────────────────┐
│  localStorage.setItem()  │
└────────┬─────────────────┘
         │
         v
┌──────────────────────┐
│  Catalog Page        │
└──────────────────────┘
```

---

## 📝 Vistas Principales

### Login.jsx
Formulario para iniciar sesión. Valida credenciales con el backend.

### Register.jsx
Formulario para crear una nueva cuenta. Valida datos y crea usuario.

### Catalog.jsx
Página principal que muestra:
- Listado de películas
- Filtros de búsqueda
- Botones para crear, editar y eliminar

### About.jsx
Página informativa sobre la aplicación.

### NotFound.jsx
Página 404 para rutas inexistentes.

---

## 🛠️ Desarrollo

### Agregar una nueva vista

1. Crear archivo en `src/views/MiVista.jsx`
2. Agregar ruta en `RouterApp.jsx`
3. Importar componentes necesarios

```jsx
import { useNavigate } from 'react-router-dom';

export default function MiVista() {
  return <div>Mi nueva vista</div>;
}
```

### Agregar un nuevo componente

1. Crear archivo en `src/components/MiComponente.jsx`
2. Usar en cualquier vista

```jsx
export default function MiComponente({ prop1 }) {
  return <div>{prop1}</div>;
}
```

---

## 🚀 Deployment

### Build para producción

```bash
npm run build
```

Genera una carpeta `dist/` lista para deployar.

### Opciones de hosting

- **Vercel** - Recomendado para React
- **Netlify**
- **GitHub Pages**
- **Heroku**

**Ejemplo con Vercel:**
```bash
npm install -g vercel
vercel
```

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Backend no responde
```bash
# Verificar que el backend esté corriendo
cd backend
npm run dev

# Verificar VITE_API_URL en .env
VITE_API_URL=http://localhost:5000/api
```

### Token expirado después de recargar página
- El token se guarda en localStorage
- Se restaura automáticamente al cargar la app
- Si expira, debes hacer login de nuevo

### CORS errors
```
Access to XMLHttpRequest blocked by CORS policy
```

Asegúrate que:
1. El backend está corriendo en `http://localhost:5000`
2. El frontend está en `http://localhost:5173`
3. CORS está configurado en backend

### Vite no actualiza cambios

```bash
# Reiniciar servidor de desarrollo
npm run dev

# Limpiar caché
rm -rf node_modules/.vite
npm run dev
```

---

## 📚 Recursos

- [React Documentación](https://react.dev)
- [Vite Documentación](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [JavaScript ES6+](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide)

---

## 📝 Buenas Prácticas

1. ✅ Siempre valida datos antes de enviar
2. ✅ Guarda el token en localStorage
3. ✅ Maneja errores de red gracefully
4. ✅ Usa componentes reutilizables
5. ✅ Mantén Context API limpio
6. ✅ No hagas requests sin token

---

## 🎯 Checklist de Desarrollo

- [ ] Backend corriendo en puerto 5000
- [ ] Variables de entorno (.env) configuradas
- [ ] npm install completado
- [ ] npm run dev funciona sin errores
- [ ] Puedo hacer login/register
- [ ] Las películas se cargan correctamente
- [ ] Puedo crear, editar y eliminar películas

---

## 👨‍💻 Soporte

Para problemas:
1. Revisa la consola del navegador (F12)
2. Revisa los logs del servidor backend
3. Verifica que todas las URLs sean correctas
4. Asegúrate de tener conexión con el backend
