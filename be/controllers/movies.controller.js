import mongoose from "mongoose";
import Movie from "../models/movie.model.js";

const moviesController = {
    getMovies: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const sortBy = req.query.sortBy || 'releaseDate';
            const search = req.query.search || '';
            const skip = (page - 1) * 10;

            const movies = await Movie.find({
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { genres: { $regex: search, $options: 'i' } }
                ]
            })
                .skip(skip)
                .limit(10)
                .sort({ [sortBy]: -1 });

            return res.status(200).json({
                message: 'Data retrieved successfully',
                sortBy: sortBy,
                page: page,
                totalPages: Math.ceil(await Movie.countDocuments({
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { genres: { $regex: search, $options: 'i' } }
                    ]
                }) / 10),
                data: movies
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Server error',
                data: null
            });
        }
    },

    getMovie: async (req, res) => {
        try{
            const id = req.params.id;
            
            const movie = await Movie.findById(id);

            if (!movie) {
                return res.status(404).json({
                    message: 'Movie not found',
                    data: null
                });
            }

            return res.status(200).json({
                message: 'Data retrieved successfully',
                data: movie
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Server error',
                data: null
            });
        }
    }
}

export default moviesController;