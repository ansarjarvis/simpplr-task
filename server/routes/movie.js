import express from "express";
import {
  createMovie,
  deleteMovie,
  getMovieWithId,
  getMovies,
  updateMovie,
} from "../controllers/movie.js";

let router = express.Router();

/* fetching all movies */

router.get("/", getMovies);

/* create a new movie */

router.post("/", createMovie);

/* fetching movie with given id */

router.get("/:id", getMovieWithId);

/* update the movie */

router.put("/:id", updateMovie);

/* deleting a movie */

router.delete("/:id", deleteMovie);

export default router;
