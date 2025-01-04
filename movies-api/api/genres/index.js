// Gets Genres of All Movies - Assignment 2

import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}`
    );
    if (!response.ok) {
        res.status(response.status).json({ error: 'Failed to fetch genres' });
    } else {
        const data = await response.json();
        res.status(200).json(data.genres);
    }
}));

export default router;
