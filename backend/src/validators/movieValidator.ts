import {z} from "zod"

const movieValidate = z.object ({
    title: z.string(),
    year: z.number(),
    genre: z.string(),
    rating: z.number(),
    director: z.string()
})

const moviePartialValidate = movieValidate.partial()

export {movieValidate, moviePartialValidate}