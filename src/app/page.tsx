import { MyLists, MovieList } from '@/components/MyLists';
import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import { MY_EMAIL_KEY } from '../constants/email';

const GET_MOVIE_LISTS = gql`
query GetMovieLists($email: String!) {
  getMovieLists(email: $email) {
    name
    id
  }
}
`;

export default async function Home() {
  const { getMovieLists } = await client.request<{ getMovieLists: MovieList[] }>(GET_MOVIE_LISTS, {
    email: MY_EMAIL_KEY,
  });

  return (
      <div>
        <MyLists list={getMovieLists ?? []} />
      </div>
  );
}
