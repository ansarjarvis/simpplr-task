import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  moviename: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

let Movie = mongoose.model("Movie", movieSchema);

export default Movie;
