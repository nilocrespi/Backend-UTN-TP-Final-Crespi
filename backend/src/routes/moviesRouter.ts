import { Router } from "express"
import { getMovies, createMovie, updateMovie, deleteMovie } from "../controllers/movie.controller"

const movieRouter = Router()

movieRouter.get("/", getMovies)
movieRouter.post("/", createMovie)
movieRouter.patch("/:id", updateMovie)
movieRouter.delete("/:id", deleteMovie)

export { movieRouter }