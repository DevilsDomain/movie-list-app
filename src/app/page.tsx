import { gql } from 'graphql-request';
import { MY_EMAIL_KEY } from '../constants/email';
import { client } from '@/lib/client';

const GET_MOVIE_BY_TITLE = gql`
query SearchMovieByTitle($title: String!) {
  searchMovieByTitle(title: $title) {
    Title
  }
}
`;

export default async function Home() {
  const {  searchMovieByTitle } = await client.request<{  searchMovieByTitle}>(GET_MOVIE_BY_TITLE, {
    title: "Pirate",
  });

  console.log( searchMovieByTitle);

  return (
    <div>
      {searchMovieByTitle.map((movie, movieIndex) => {
        return(
          <h1 key={movieIndex} className="text-3xl font-bold underline">
            {movie.Title}
          </h1>
        );
      })}
    </div>
  );
}
