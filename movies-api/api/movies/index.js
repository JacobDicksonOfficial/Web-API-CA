import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies } from '../tmdb-api';
import { getMovieGenres } from '../tmdb-api';



const router = express.Router();

// Get all movies
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit with default values
    [page, limit] = [+page, +limit]; // convert strings to numbers

    // Parallel execution: Count total documents and fetch specific page results
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);

    // Calculate total pages
    const total_pages = Math.ceil(total_results / limit);

    // Construct and send response
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


// Get movie details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({
            message: 'The movie you requested could not be found.',
            status_code: 404,
        });
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getMovieGenres();
    res.status(200).json(genres);
}));



export default router;
