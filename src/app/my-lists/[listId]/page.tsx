import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import { Movies } from '@/components/Movie';

type MovieListParams = {
  params: { listId: string };
}

interface MovieListResponse {
  desc: string;
  finished: boolean;
  id: number;
  movie: {Title:string};
  imdb_id: string;
}


const GET_MOVIE_LIST_ITEMS = gql`
query GetMovieListItems($listId: Int!) {
    getMovieListItems(listId: $listId) {
      id
      imdb_id
      movie {
        Title
      }
      movie_list_id
    }
  }
`;


export default async function MyListPage({ params: { listId } }: MovieListParams) {
  // TODO fetch list from server
  const { getMovieListItems } = await client.request<{ getMovieListItems: MovieListResponse[] }>(GET_MOVIE_LIST_ITEMS, {
    listId: parseInt(listId),
  });

  console.log(getMovieListItems);
  
  return (

    <div className="flex align-center justify-center p-16 sm:p-8">
        {getMovieListItems.length !== 0 ?
        <Movies listId={parseInt(listId)} list={getMovieListItems}/> :
        <p>No movies in this list yet</p>
        }
    </div>
  );
}
