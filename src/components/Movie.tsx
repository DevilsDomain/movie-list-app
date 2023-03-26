"use client";
import { useState } from 'react';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import Link from 'next/link';


export type Movie = {
  id: number;
  desc: string;
  finished: boolean;
  movie: {Title: string};
  imdb_id: string;
};

type MovieProps = {
  listId: number;
  list: Movie[];
};
const CREATE_TODO_MUTATION = gql`
mutation AddTODO($listId: Int!, $desc: String!) {
  addTODO(listId: $listId, desc: $desc) {
    id
    desc
    finished
  }
}
`;

const REMOVE_MOVIE = gql`
mutation RemoveMovie($removeMovieId: Int!, $listId: Int!) {
    removeMovie(id: $removeMovieId, listId: $listId)
  }
`;



export const Movies = ({ list = [], listId }: MovieProps) => {

const [movies, setMovies] = useState<Movie[]>(list);
const onAddHandler = async (desc: string) => {
  const res = await client.request<{ addTODO: Movie }>(CREATE_TODO_MUTATION, {
    listId: listId,
    desc: desc,
  });
  setMovies([...movies, res.addTODO]);
};

  const onRemoveHandler = async (id: number) => {
    const res = await client.request<{ removeMovie: Movie }>(REMOVE_MOVIE, {
      listId: listId,
      removeMovieId: id,
    });
    const newMovies = movies.filter((movies) => movies.id !== id);

    setMovies(newMovies);
  };
  
  return (
    <div>
      <h2 className="text-center text-5xl mb-10">List items</h2>
      <ul>
        {movies.map((item) => (
          <li
            key={item.id}
          >
            <Link href={'/movie/'+item.imdb_id}>{item.movie.Title}</Link>

            {!item.finished && (
              <div className="flex gap-2">
                <button
                  onClick={() => onRemoveHandler(item.id)}
                >
                    Remove
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {/* <AddTodo onAdd={onAddHandler} /> */}
    </div>
  );
};
