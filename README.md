# Movie Search App

A React-based movie search application built as a final project for ALX Front-End course.

**Author**: Goh Emmanuel Mawuli

## Features

- **Search**: Query movies by title using OMDb API
- **Filtering**: Filter results by year and type
- **Movie Details**: View comprehensive information about selected movies
- **Favorites**: Save and persist favorite movies locally

## Tech Stack

- **Frontend**: React, React Router
- **State Management**: Zustand with persistence middleware
- **API**: OMDb API
- **Styling**: CSS & Tailwindcss

## Components

- `Navbar` - Navigation header
- `SearchBar` - Movie search input
- `Filter` - Year and type filters
- `MovieList` - Display search results
- `MovieCard` - Individual movie card
- `MovieDetails` - Detailed movie information
- `FavoritesPage` - Saved favorites
- `FavoritesToggle` - Add/remove favorites button
- `movieSearchStore.js` - Global state management

## Project Timeline

| Week  | Focus                                             |
| ----- | ------------------------------------------------- |
| **1** | Setup, routing, SearchBar & MovieList integration |
| **2** | MovieDetails component & second API call          |
| **3** | Zustand favorites & data persistence              |
| **4** | Filter integration & error/loading states         |
| **5** | Responsive design & testing                       |

## Getting Started

1. Clone repository
2. Install dependencies: `npm install`
3. Add OMDb API key to `.env`
4. Run: `npm start`
