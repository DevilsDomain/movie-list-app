import React from 'react'

function MovieList({movie}) {
  return (
    <h1 key={movieIndex} className="text-3xl font-bold">
        {movie.name}
    </h1>
  )
}

export default MovieList