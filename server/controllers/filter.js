import Movie from "../models/movie.js";

export let filterMovies = async (req, res) => {
  try {
    let { moviename, director, year, language, rating } = req.query;

    let query = {};

    if (moviename) {
      query.moviename = new RegExp(moviename, "i");
    }
    if (director) {
      query.director = new RegExp(director, "i");
    }
    if (year) {
      query.year = year;
    }
    if (language) {
      query.language = new RegExp(language, "i");
    }
    if (rating) {
      query.rating = rating;
    }

    let foundMovies = await Movie.find(query);

    if (foundMovies.length === 0) {
      return res.status(404).json({ message: "can not find movies" });
    }

    res.status(200).json(foundMovies);

    console.log(director);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
