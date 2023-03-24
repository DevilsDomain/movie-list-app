import { gql } from 'graphql-request';
import { MY_EMAIL_KEY } from '../constants/email';
import { client } from '@/lib/client';
import MovieList from '@/components/MovieList';

const GET_MOVIE_BY_TITLE = gql`
query GetMovieLists($email: String!) {
  getMovieLists(email: $email) {
    name
    id
  }
}
`;

export default async function Home() {
  const {  getMovieLists } = await client.request<{ getMovieLists}>(GET_MOVIE_BY_TITLE, {
    email: MY_EMAIL_KEY,
  });

  console.log( getMovieLists);

  return (
    <div>
      {getMovieLists.map((movie, movieIndex) => {
        return(
          <MovieList movie={movie} key={movieIndex} />
        );
      })}
    </div>
  );
}
