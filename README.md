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

Install dependencies:

bash
Copy code
npm install
Create a .env file in the root directory with the following placeholders:

makefile
Copy code
NODEENV=development
PORT=8080
HOST=localhost
MONGO_DB=YourMongoDBConnectionString
TMDB_KEY=YourTMDBAPIKey
SECRET=YourJWTSecret
Initialize the database (in development mode only):

bash
Copy code
npm run dev
API Configuration
Before running the API, make sure you:

Create a .env file in the root directory with placeholders for your MongoDB connection string, TMDB API Key, and JWT secret key. Below is an example of what your .env file should look like:

makefile
Copy code
NODEENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://YourUser:YourPassword@YourCluster.mongodb.net/?retryWrites=true&w=majority
TMDB_KEY=YourTMDBAPIKey
SECRET=YourJWTSecret
API Design
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
/api/reviews/:id | PUT | Updates an existing review by its ID.
/api/reviews/:id | DELETE | Deletes a review by its ID.
Watchlists
/api/watchlists | GET | Retrieves all watchlists.
/api/watchlists/:id | GET | Retrieves a single watchlist by its ID.
/api/watchlists | POST | Adds a new watchlist.
/api/watchlists/:id | PUT | Updates an existing watchlist by its ID.
/api/watchlists/:id | DELETE | Deletes a watchlist by its ID.
Security and Authentication
Authentication: JWT-based authentication is implemented.
Protected Routes:
/api/movies (and its subroutes) require a valid JWT token for access.
/api/reviews and /api/watchlists require authentication for creation, updating, and deletion.
Password Security: Passwords are hashed using bcrypt.
Integrating with React App
Integration: The React app fetches data from the Web API instead of TMDB for the following:

User reviews: Displays and allows users to add/edit/delete reviews.
User watchlists: Displays and allows users to add/edit/delete watchlists.
Other Updates:

Implemented authentication for the React app, including user login and signup.
Protected routes in React to ensure only authenticated users can access specific features.
Independent Learning
Added MongoDB Collections:
reviews: To handle user reviews of movies.
watchlists: To manage personalized movie watchlists.
Implemented Parameterized Endpoints:
/api/movies/genre/:genreId: Fetch movies based on genre.
/api/movies/year/:year: Fetch movies released in a particular year.
Improved Validation:
Passwords are validated using regex to ensure security.
