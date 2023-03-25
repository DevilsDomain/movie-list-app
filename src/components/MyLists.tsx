'use client';

import Link from 'next/link';
import CreateList from './CreateList';
import { useState } from 'react';

export type MovieList = {
  id: number;
  created_at: string;
  name: string;
  email: string;
};

type MyListsProps = {
  list: MovieList[];
};

export const MyLists = ({ list = [] }: MyListsProps) => {
  const [MovieLists, setMovieLists] = useState<MovieList[]>(list);

  const onCreateHandler = (newMovieList: MovieList) => {
    setMovieLists([...MovieLists, newMovieList]);
  };

  return (
    <div>
      <h1>{MovieLists.length > 0 ? 'My TODO lists' : 'No lists yet!'}</h1>
      <ul>
        {MovieLists.map((item) => (
          <li key={item.id}>
            <Link
              href={item.id.toString()}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <CreateList onCreate={onCreateHandler} />
    </div>
  );
};
