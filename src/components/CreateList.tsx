'use client';
import React from 'react'
import { client } from '@/lib/client';
import { gql } from 'graphql-request';
import { MovieList } from '@/components/MyLists';
import { MY_EMAIL_KEY } from '../constants/email';


const CREATE_MOVIE_LIST = gql`
  mutation CreateList($input: CreateListInput!) {
  createList(input: $input) {
    id
    name
  }
}
`;

type CreateListProps = {
  onCreate(list: MovieList): void;
};


function CreateList({ onCreate }: CreateListProps) {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await client.request<{ createList: MovieList }>(CREATE_MOVIE_LIST, {
      input: {
        name: formData.get('listName'),
        email: MY_EMAIL_KEY,
      },
    });

    onCreate(res.createList);
  };

  return (
    <div>
      <h2>Create new List</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="listName"
          name="listName"
          className="input"
          placeholder="List name"
        />
        <button type="submit">
          Create List
        </button>
      </form>
    </div>
  );
}

export default CreateList
