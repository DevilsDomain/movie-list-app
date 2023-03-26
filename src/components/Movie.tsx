"use client";
import { useState } from 'react';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import Link from 'next/link';
import Image from 'next/image';


export type MovieTypes = {
  id: number;
  desc: string;
  finished: boolean;
  movie: {
    Title: string
    Poster: string;
    imdbID: string;

  };
  imdb_id: string;
};

type MovieProps = {
  listId: number;
  list: MovieTypes[];
};
const ADD_MOVIE = gql`
mutation AddMovie($imdbId: String!, $listId: Int!) {
    addMovie(imdbId: $imdbId, listId: $listId) {
      movie {
        Title
        imdbRating
        Poster
        imdbID
      }
    }
  }
`;

const REMOVE_MOVIE = gql`
mutation RemoveMovie($removeMovieId: Int!, $listId: Int!) {
    removeMovie(id: $removeMovieId, listId: $listId)
  }
`;



export const Movies = ({ list = [], listId }: MovieProps) => {

const [movies, setMovies] = useState<MovieTypes[]>(list);
const onAddHandler = async (imdb_id: string) => {
  const res = await client.request<{ addMovie: MovieTypes }>(ADD_MOVIE, {
    imdbId: imdb_id,
    listId: listId,
  });
  setMovies([...movies, res.addMovie]);
};

  const onRemoveHandler = async (id: number) => {
    const res = await client.request<{ removeMovie: MovieTypes }>(REMOVE_MOVIE, {
      listId: listId,
      removeMovieId: id,
    });
    const newMovies = movies.filter((movies) => movies.id !== id);

    setMovies(newMovies);
  };

  return (
    <div>
      <ul>
        {movies.map((item) => (
          <li key={item.id}>
            <div>
                <Image src={item.movie.Poster} alt={item.movie.Title} height={300} width={250} />
                <Link href={'/movie/'+item.movie.imdbID}>{item.movie.Title}</Link>
                {!item.finished && (
                <div className="flex gap-2">
                    <button onClick={() => onRemoveHandler(item.id)}
                    className='rounded bg-red-700	text-slate-50	w-16	mb-3	'
                    >Remove</button>

                    <button onClick={() => onAddHandler(item.movie.imdbID)}
                    className='bg-indigo-500 rounded text-slate-50 w-11	mb-3		'
                    >Add</button>
                </div>
                )}
            </div>

        </li>
        ))}
      </ul>
    </div>
  );
};
