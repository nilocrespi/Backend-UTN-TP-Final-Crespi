import mongoose from "mongoose"

const MovieSchema = new mongoose.Schema({
  title: {type: String, required: true},
  year: {type: Number, required: true},
  genre: {type: String, default: "Sin genero"},
  rating: {type: Number, default: 0},
  director: {type: String, default: "Sin director" }
}, {
  versionKey: false
})

const Movie = mongoose.model("Movie", MovieSchema)

export {Movie}