'use client';
import { Movies } from './Movie';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import React, { useState } from 'react';

interface SearchResults {
    Poster: string;
    Title: string;
    Year: string;
    Type: string;
    imbdID: string;
  }



const GET_MOVIE_BY_TITLE = gql`
query SearchMovieByTitle($title: String!) {
    searchMovieByTitle(title: $title) {
      Poster
      Title
      Year
      Type
      imdbID
    }
  }
`;

async function Search() {
    const [searchQuery, setSearchQuery] = useState('pirate');
    const [searchResults, SetSearchResults] = useState<SearchResults[]>('');
    const { searchMovieByTitle } = await client.request<{ searchMovieByTitle: SearchResults }>(GET_MOVIE_BY_TITLE, {
        title: searchQuery,
        });
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  console.log(searchMovieByTitle);
  return (
    <div>
         <input placeholder='Search Movie...' value={searchQuery} onChange={handleSearch} />
         {searchMovieByTitle.map((movie, movieIndex) => {
            return(
                <p key={movieIndex}>{movie.Title}</p>
            );
         })}
    </div>
  )
}

export default Search