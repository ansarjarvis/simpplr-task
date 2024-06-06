import Movie from "../models/movie.js";

export let getMovies = async (req, res) => {
  try {
    let foundMovie = await Movie.find();
    res.status(200).json({ foundMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export let createMovie = async (req, res) => {
  try {
    let { moviename, director, year, rating, language } = req.body;

    let newMovie = new Movie({ moviename, director, year, language, rating });

    let savedMovie = await newMovie.save();

    res.status(200).json({ data: savedMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export let getMovieWithId = async (req, res) => {
  try {
    let { id } = req.params;

    let foundMovie = await Movie.findById(id);

    if (!foundMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ foundMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export let updateMovie = async (req, res) => {
  try {
    let { id } = req.params;
    let { moviename, director, year, rating, language } = req.body;

    let updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        moviename,
        director,
        year,
        language,
        rating,
      },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({ data: updatedMovie });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export let deleteMovie = async (req, res) => {
  try {
    let { id } = req.params;

    await Movie.findByIdAndDelete(id);

    res.status(200).json({ message: "movie is deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
