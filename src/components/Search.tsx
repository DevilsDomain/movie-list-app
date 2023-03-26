'use client';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import React, { useState } from 'react';

interface SearchResults {
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
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

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  
  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  
    if (value) {
      const { searchMovieByTitle } = await client.request<{ searchMovieByTitle: SearchResults[] }>(
        GET_MOVIE_BY_TITLE,
        {
          title: value,
        }
      );
      setSearchResults(searchMovieByTitle);
    } else {
      setSearchResults([]);
    }
  };
  
  
  
  
  return (
    <div>
      <input placeholder='Search Movie...' value={searchQuery} onChange={handleSearch} />
      {searchResults !== null && searchResults.length !== 0 ? (
        searchResults.map((movie, movieIndex) => {
            return <p key={movieIndex}>{movie.Title}</p>;
        })
        ) : (
        <p>Search some movies!</p>
        )}
    </div>
  );
}

export default Search;
