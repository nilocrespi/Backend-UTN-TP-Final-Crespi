import {Movie} from "../models/movie.model"
import {Request, Response} from "express"
import mongoose from "mongoose"
import {moviePartialValidate, movieValidate} from "../validators/movieValidator"

const getMovies = async (req: Request, res: Response) => {
    try {
        const {title, genre, year, minYear, maxYear, rating, minRating, maxRating, director} = req.query

        // Filtrado mediante query params
        const filters: any = {}

        if (title) {
            filters.title = {$regex: title, $options: "i"}
        }

        if (genre) {
            filters.genre = genre
        }

        if (year) {
            filters.year = Number(year)
        }

        if (minYear || maxYear) {
            filters.year = {}
            if (minYear) {
                filters.year.$gte = Number(minYear)
            }
            if (maxYear) {
                filters.year.$lte = Number(maxYear)
            }
        }

        if (rating) {
            filters.rating = Number(rating)
        }

        if (minRating || maxRating) {
            filters.rating = {}
            if (minRating) {
                filters.rating.$gte = Number(minRating)
            }
            if (maxRating) {
                filters.rating.$lte = Number(maxRating)
            }
        }

        if (director) {
            filters.director = {$regex: director, $options: "i"}
        }

        const movies = await Movie.find(filters).sort({year: -1})
        res.json({success: true, data: movies})
    } catch (error) {
        const err = error as Error
        res.status(500).json({success: false, error: err.message})
    }
}

const createMovie = async (req: Request, res: Response) => {
    try {
        const body = req.body
        const {title, year, genre, rating, director} = body

        const validate = movieValidate.safeParse(body)

        if (!validate.success) {
            return res.status(400).json({success: false, error: validate.error.flatten().fieldErrors})
        }

        const createdMovie = await Movie.create ({title, year, genre, rating, director})

        res.status(201).json({ success: true, data: createdMovie })
    } catch (error) {
        const err = error as Error
        res.status(500).json({success: false, error: err.message})
    }
}

const updateMovie = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const updates = req.body

        const validate = moviePartialValidate.safeParse(updates)

        if (!validate.success) {
            return res.status(400).json({ success: false, error: validate.error.flatten().fieldErrors })
        }

        const updatedMovie = await Movie.findByIdAndUpdate (id, updates, { new: true })

        if (!updatedMovie) {
            return res.status(404).json({success: false, error: "no existe pelicula para actualizar"})
        }

        res.json ({success: true, data: updatedMovie})
    } catch (error) {
        const err = error as Error
        return res.status(500).json({success: false, error: err.message})
    }
}

const deleteMovie = async (req: Request, res: Response) => {
    const id = req.params.id as string
 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status (400).json({
            success: false,
            error: "ID incorrecto, ingresar un valor valido"
        })
    }

    try {
        const deletedMovie = await Movie.findByIdAndDelete (id)

        if (!deletedMovie) {
            return res.status(404).json ({success: false, error: "no existe pelicula para eliminar"})
        }

        res.json({success: true, data: deletedMovie})
    } catch (error) {
        const err = error as Error
        res.status(500).json({success: false, error: err.message})
    }
}

export {getMovies, createMovie, updateMovie, deleteMovie}