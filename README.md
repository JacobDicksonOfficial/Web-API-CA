# Assignment 2 - Web API

**Name:** Jabez Dickson

---

## Features

A bullet-point list of the **ADDITIONAL features implemented** in the API **that were not in the labs** (or modifications to existing features):

- **Get Movies by Genre**: Fetches movies based on their genre from TMDB.
- **Get Movies from a Specific Year**: Fetches movies released in a specific year from TMDB.
- **Get All Genres**: Fetches all genres from TMDB.
- **Reviews Collection**: 
  - Added MongoDB collection for user reviews.
  - Endpoints to create, retrieve, update, and delete reviews.
- **Watchlists Collection**: 
  - Added MongoDB collection for user watchlists.
  - Endpoints to create, retrieve, update, and delete watchlists.

---

## Install dependencies:

npm install
Create a .env file in the root directory with the following placeholders:

##
makefile
Copy code
NODEENV=development
PORT=8080
HOST=localhost
MONGO_DB=YourMongoDBConnectionString
TMDB_KEY=YourTMDBAPIKey
SECRET=YourJWTSecret
Initialize the database (in development mode only):

##
npm run dev
API Configuration
Before running the API, make sure you:

Create a .env file in the root directory with placeholders for your MongoDB connection string, TMDB API Key, and JWT secret key. Below is an example of what your .env file should look like:

##
NODEENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://YourUser:YourPassword@YourCluster.mongodb.net/?retryWrites=true&w=majority
TMDB_KEY=YourTMDBAPIKey


## API Design
Endpoints Added
TMDB-based Endpoints:

/api/genres | GET | Retrieves a list of all genres from TMDB.

/api/movies/genre/:genreId | GET | Fetches movies by genre from TMDB.

/api/movies/year/:year | GET | Fetches movies released in a specific year from TMDB.

MongoDB-based Endpoints:
Reviews
/api/reviews | GET | Retrieves all reviews.

/api/reviews/:id | GET | Retrieves a single review by its ID.

/api/reviews | POST | Adds a new review.


## Implemented Parameterized Endpoints:

/api/movies/genre/:genreId: Fetch movies based on genre.

/api/movies/year/:year: Fetch movies released in a particular year.

## Improved Validation:
Passwords are validated using regex to ensure security.
