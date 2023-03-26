'use client';
import Link from 'next/link';
import Form from './Form';
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
    <div className='flex flex-col items-center'>
      <h1 className='text-6xl	text-center underline underline-offset-2	'>{MovieLists.length > 0 ? 'My lists' : 'No lists yet!'}</h1>
      <ul>
        {MovieLists.map((item) => (
          <li key={item.id} className='bg-indigo-200 w-96 h-12	 rounded mt-5 text-center	'>
            <Link href={'/my-lists/'+item.id.toString()} className='text-4xl		'>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Form onCreate={onCreateHandler} />
    </div>
  );
};
