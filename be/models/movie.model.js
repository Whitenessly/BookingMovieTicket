import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    totalRating: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    genres: { type: String, required: true }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;