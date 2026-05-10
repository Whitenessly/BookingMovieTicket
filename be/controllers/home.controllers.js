import mongoose from "mongoose";
import Movie from "../models/movie.model.js";

const homeController = {
    getHome: async (req, res) => {
        try {
            const genre = req.query.genre;
            const sortBy = req.query.sortBy;
            const movies = await Movie.find(genre ? { genres: { $regex: genre, $options: 'i' } } : {})
                .sort(sortBy === 'rating' ? { rating: -1 } : { releaseDate: -1 })
                .limit(7);


            return res.status(200).json({
                message: 'Data retrieved successfully',
                data: movies
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Server error',
                data: null
            });
        }
    }
}

export default homeController;