# 🍿 Movie Management Application

Aplicación full-stack para la gestión de películas con autenticación y análisis de contenido. Desarrollada como trabajo final de Desarrollo Web Backend en UTN.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Pre-requisitos](#pre-requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [API](#api)
- [Contribuciones](#contribuciones)

---

## ✨ Características

### Backend
- **Autenticación segura** con JWT
- **Gestión de películas** con CRUD completo
- **Validación de datos** en todas las solicitudes
- **Middleware personalizado** para autenticación
- **Base de datos MongoDB**
- **TypeScript** para mayor seguridad de tipos

### Frontend (Opcional)
- Interfaz moderna con **React**
- **Vite** como bundler rápido
- Gestión de estado con **Context API**
- Sistema de autenticación completo
- Catálogo de películas interactivo

---

## 🛠️ Tecnologías

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **MongoDB** - Base de datos NoSQL
- **JWT** - Autenticación

### Frontend
- **React 18+** - Librería UI
- **Vite** - Herramienta de construcción
- **JavaScript/JSX** - Lenguaje del cliente

---

## 📦 Pre-requisitos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **MongoDB** (local o Atlas)
- **Git**

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repo-url>
cd backend-utn-tp-final-crespi
```

### 2. Instalación Backend

```bash
cd backend
npm install
```

Crear archivo `.env` con las variables de entorno:

```env
MONGO_URI=mongodb://localhost:27017/movies
PORT=5000
JWT_SECRET=tu_secret_key_aqui
NODE_ENV=development
```

### 3. Instalación Frontend (Opcional)

```bash
cd frontend
npm install
```

---

## 📁 Estructura del Proyecto

```
backend-utn-tp-final-crespi/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── mongodb.ts          # Configuración de BD
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts  # Lógica de autenticación
│   │   │   └── movie.controller.ts # Lógica de películas
│   │   ├── interfaces/
│   │   │   └── IPayload.ts         # Interfaces de TypeScript
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts   # Validación de JWT
│   │   ├── models/
│   │   │   ├── user.model.ts       # Esquema de usuarios
│   │   │   └── movie.model.ts      # Esquema de películas
│   │   ├── routes/
│   │   │   ├── authRouter.ts       # Rutas de auth
│   │   │   └── moviesRouter.ts     # Rutas de películas
│   │   ├── validators/
│   │   │   ├── authValidator.ts    # Validación de datos
│   │   │   └── movieValidator.ts   # Validación de películas
│   │   └── index.ts                # Punto de entrada
│   ├── .env                        # Variables de entorno
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/             # Componentes React
│   │   │   ├── FilterMovies.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieForm.jsx
│   │   │   └── MovieList.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Estado global de auth
│   │   ├── router/
│   │   │   └── RouterApp.jsx       # Configuración de rutas
│   │   ├── services/
│   │   │   ├── authService.js      # API auth
│   │   │   └── movieService.js     # API películas
│   │   ├── views/                  # Páginas
│   │   │   ├── About.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── NotFound.jsx
│   │   ├── styles/
│   │   │   └── Home.css
│   │   ├── utils/
│   │   │   └── popup.js
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
```

---

## 🚀 Uso

### Iniciar Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

### Iniciar Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 🔌 API

### Autenticación

#### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123",
  "name": "Nombre"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

### Películas

#### Obtener todas las películas
```http
GET /api/movies
Authorization: Bearer <token>
```

#### Obtener película por ID
```http
GET /api/movies/:id
Authorization: Bearer <token>
```

#### Crear película
```http
POST /api/movies
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nombre de la película",
  "genre": "Drama",
  "year": 2024,
  "rating": 8.5
}
```

#### Actualizar película
```http
PUT /api/movies/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nuevo título",
  "genre": "Acción"
}
```

#### Eliminar película
```http
DELETE /api/movies/:id
Authorization: Bearer <token>
```

---

## 📝 Notas de Desarrollo

- Las contraseñas se hashean antes de guardarse en la base de datos
- El JWT expira después de 24 horas
- Todos los datos se validan en el servidor
- Los errores devuelven códigos HTTP apropiados

---

## 👨‍💻 Autor

Desarrollado como Trabajo Final de Comisión 999198248 - UTN

---

## 📄 Licencia

Este proyecto es de uso educativo.
