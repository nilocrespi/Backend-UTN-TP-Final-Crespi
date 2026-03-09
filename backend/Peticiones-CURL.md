# API REST
## Patron de diseño

### MVC
    model-view (routes)-controller (modelo vista-controlador)

### Responsabilidades:

#### .src/index.js
	- ejecuta el servidor
	- punto de entrada de la req

#### .src/routes/moviesRouter.js
	- analizar metodo y ruta

#### .src/controllers/movie.controller.js
	- resolver la logica de negocio
	- usar el modelo
	- responder al usuario

#### .src/models/movie.model.js
	- conexion con db
	- crea el modelo con la data


## Peticiones CURL

#### Peticion curl para obtener peliculas
curl http://localhost:50000/movies

#### Peticion curl para agregar pelicula
curl -X POST http://localhost:50000/movies \
-H "Content-Type: application/json" \
-d '{* json *}'

#### Peticion curl para modificar pelicula
curl -X PATCH http://localhost:50000/movies/ **ACA VA EL ID** \
-H "Content-Type: application/json" \
-d '{* json modificado *}'

#### Peticion curl para eliminar pelicula
curl -X DELETE http://localhost:50000/movies/ **ACA VA EL ID**