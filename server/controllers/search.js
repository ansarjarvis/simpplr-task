import Movie from "../models/movie.js";

export let geSearchMovie = async (req, res) => {
  try {
    let { query } = req.query;
    let foundMovie = await Movie.find({ moviename: new RegExp(query, "i") });

    if (foundMovie.length === 0) {
      return res.status(404).json({ message: "movie don't exist" });
    }
    return res.status(200).json({ data: foundMovie });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
