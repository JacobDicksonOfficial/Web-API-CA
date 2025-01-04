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

// Assignment 2 - Two new API endpoints  (can fetch from either Mongo/TMDB). Should include one parameterised URL

// Get Movies by Genre (TMDB)
router.get('/genre/:genreId', asyncHandler(async (req, res) => {
    const { genreId } = req.params;
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&with_genres=${genreId}`
    );
    const data = await response.json();
    res.status(200).json(data.results);
}));

// Get Movie Recommendations (TMDB)
router.get('/:movieId/recommendations', asyncHandler(async (req, res) => {
    const { movieId } = req.params;
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.TMDB_KEY}`
    );
    const data = await response.json();
    res.status(200).json(data.results);
}));


// Get Movies from A Specific Year (TMDB)
router.get('/year/:year', asyncHandler(async (req, res) => {
    const { year } = req.params; // Extract year from the URL
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&primary_release_year=${year}`
    );
    if (!response.ok) {
        res.status(response.status).json({ error: `Failed to fetch movies for year ${year}` });
    } else {
        const data = await response.json();
        res.status(200).json(data.results);
    }
}));

// Search Movies by Title (TMDB Only)
router.get('/search', asyncHandler(async (req, res) => {
    const { title } = req.query;

    // Check if the title is provided
    if (!title) {
        return res.status(400).json({ error: 'Missing title query parameter' });
    }

    // Fetch data from TMDB
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(title)}`
    );

    // Check if TMDB API responded successfully
    if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch movies from TMDB' });
    }

    const data = await response.json();

    // Return the results to the client
    res.status(200).json(data.results);
}));

export default router;
