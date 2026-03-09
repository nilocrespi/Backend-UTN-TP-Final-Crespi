# Backend - Movie Management API

API REST para gestión de películas con autenticación JWT. Desarrollada con Node.js, Express y TypeScript.

---

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura](#estructura)
- [Endpoints](#endpoints)
- [Autenticación](#autenticación)
- [Validación](#validación)
- [Solución de Problemas](#solución-de-problemas)

---

## 📦 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz del backend:

```env
# Base de datos
MONGO_URI=mongodb://localhost:27017/movies

# Servidor
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura_aqui

# Opcional
LOG_LEVEL=debug
```

### 3. Iniciar MongoDB

**Local:**
```bash
mongod
```

**O usar MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/movies
```

---

## ⚙️ Configuración

### Archivo `.env` requerido

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MONGO_URI` | URL de conexión MongoDB | `mongodb://localhost:27017/movies` |
| `PORT` | Puerto del servidor | `5000` |
| `JWT_SECRET` | Clave para firmar tokens JWT | `tu_secreto_aqui` |
| `NODE_ENV` | Ambiente de ejecución | `development` o `production` |

---

## 🚀 Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor en modo desarrollo con recarga automática.

### Producción
```bash
npm run build
npm start
```

### Compilar TypeScript
```bash
npm run build
```

---

## 📁 Estructura del Proyecto

```
src/
├── config/
│   └── mongodb.ts              # Conexión a MongoDB
├── controllers/
│   ├── auth.controller.ts      # Lógica de autenticación
│   │   ├── register()          # Registro de usuarios
│   │   ├── login()             # Login de usuarios
│   │   └── logout()            # Cierre de sesión
│   └── movie.controller.ts     # Lógica de películas
│       ├── getAllMovies()      # Obtener todas
│       ├── getMovieById()      # Obtener por ID
│       ├── createMovie()       # Crear película
│       ├── updateMovie()       # Actualizar película
│       └── deleteMovie()       # Eliminar película
├── interfaces/
│   └── IPayload.ts             # Interface para JWT payload
├── middleware/
│   └── authMiddleware.ts       # Validación de JWT
├── models/
│   ├── user.model.ts           # Esquema de Mongoose para usuarios
│   └── movie.model.ts          # Esquema de Mongoose para películas
├── routes/
│   ├── authRouter.ts           # Rutas de autenticación
│   └── moviesRouter.ts         # Rutas de películas
├── validators/
│   ├── authValidator.ts        # Validación de credenciales
│   └── movieValidator.ts       # Validación de datos de películas
└── index.ts                    # Archivo principal
```

---

## 🔌 Endpoints

### Base URL
```
http://localhost:5000/api
```

### Autenticación

#### Registro
```http
POST /auth/register
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "miContraseña123!",
  "name": "Juan Pérez"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "usuario@example.com",
    "name": "Juan Pérez"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "miContraseña123!"
}
```

**Response (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "usuario@example.com"
  }
}
```

### Películas

#### Obtener todas las películas
```http
GET /movies
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Inception",
      "genre": "Sci-Fi",
      "year": 2010,
      "rating": 8.8,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Obtener película por ID
```http
GET /movies/:id
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Crear película
```http
POST /movies
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Inception",
  "genre": "Sci-Fi",
  "year": 2010,
  "rating": 8.8
}
```

#### Actualizar película
```http
PUT /movies/:id
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Inception (Director's Cut)",
  "rating": 8.9
}
```

#### Eliminar película
```http
DELETE /movies/:id
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔐 Autenticación

### Flujo JWT

1. Usuario realiza **login** o **registro**
2. Servidor devuelve un **token JWT**
3. Cliente envía el token en el header `Authorization: Bearer <token>`
4. Middleware valida el token en cada solicitud protegida
5. Si es válido, continúa; si no, devuelve error 401

### Headers requeridos

```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Errores comunes

| Código | Mensaje | Solución |
|--------|---------|----------|
| 401 | No autorizado | Token no proporcionado o inválido |
| 403 | Token expirado | Debe hacer login nuevamente |
| 400 | Datos inválidos | Validar formato de solicitud |

---

## ✅ Validación

### Usuarios

| Campo | Requisito |
|-------|-----------|
| `email` | Formato válido, único |
| `password` | Mínimo 6 caracteres |
| `name` | Requerido, máximo 100 caracteres |

### Películas

| Campo | Requisito |
|-------|-----------|
| `title` | Requerido, máximo 200 caracteres |
| `genre` | Requerido |
| `year` | Año válido (1800-presente) |
| `rating` | Número entre 0 y 10 |

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"
```bash
# Verificar si MongoDB está corriendo
mongosh

# O revisar MONGO_URI en .env
MONGO_URI=mongodb://localhost:27017/movies
```

### Error: "JWT secret is required"
```bash
# Agregar JWT_SECRET en .env
JWT_SECRET=tu_clave_secreta_aqui
```

### Error: "Port already in use"
```bash
# Cambiar puerto en .env
PORT=3001

# O matar proceso en puerto actual
# En Windows: netstat -ano | findstr :5000
# En Mac/Linux: lsof -i :5000
```

### Error de CORS
- Asegúrate que el frontend está en `http://localhost:5173`
- Configura CORS en `index.ts` si es necesario

---

## 📚 Recursos

- [Express Documentación](https://expressjs.com/)
- [MongoDB Documentación](https://docs.mongodb.com/)
- [JWT Documentación](https://jwt.io/)
- [TypeScript Guía](https://www.typescriptlang.org/)

---

## 📝 Notas Importantes

- Las contraseñas se hashean con bcrypt antes de guardarse
- Los tokens JWT expiran después de 24 horas
- Todos los datos se validan en el servidor
- Use variables de entorno para información sensible
- No commite el archivo `.env` a git

---
