import React from 'react'
import { gql } from 'graphql-request';
import { client } from '@/lib/client';

type MovieDetailsParam = {
  params: { imdbId: string };
}

interface MovieDetails {
  Actors: string;
  Country: string;
  Director: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Year: string;
  Runtime: string;
  Title: string;
  Language: string;
  imdbRating: string;
}

const GET_MOVIE_DETAILS = gql`
query SearchMovieById($searchMovieByIdId: String!) {
  searchMovieById(id: $searchMovieByIdId) {
    Actors
    Country
    Director
    Genre
    Plot
    Poster
    Year
    Runtime
    Title
    Language
    imdbRating
  }
}
`;

async function  page({ params: { imdbId } }: MovieDetailsParam) {
  const { searchMovieById } = await client.request<{ searchMovieById: MovieDetails }>(GET_MOVIE_DETAILS, {
    searchMovieByIdId: imdbId,
  });
  return (
    <div>
      Movie details {imdbId}
      <p>{searchMovieById.Title}</p>
      <p>{searchMovieById.Actors}</p>

    </div>
  )
}

export default page