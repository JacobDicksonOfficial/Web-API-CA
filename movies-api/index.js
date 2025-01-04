import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import genresRouter from './api/genres'; // Assignment 2 - Addition
import authenticate from './authenticate';
import './db';
import defaultErrHandler from './errHandler';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter); // Assignment 2 - Addition
app.use('/api/movies', authenticate, moviesRouter); // Add authentication middleware here

// Default Error Handler
app.use(defaultErrHandler);

// Start the Server
app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
