import Movie from "../models/movie.model.js";

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// just for easier adding in mongodb
export const createMovie = async (req, res) => {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
};
