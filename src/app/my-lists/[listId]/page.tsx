import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import { type } from 'os';
import { resolve } from 'path';

type MovieListParams = {
  params: { listId: string };
}

interface MovieListResponse {
  desc: string;
  finished: boolean;
  id: number;
  movie: {Title:string};
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
        (getMovieListItems.map((item, itemIndex) => {
            return(
                <p key={itemIndex}>{item.movie.Title}</p>
            );
        })) :
        <div>no movies in this list</div>
        }
    </div>
  );
}
