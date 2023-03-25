import { gql } from 'graphql-request';
import { client } from '@/lib/client';
import { type } from 'os';
import { resolve } from 'path';

type MyListPageMetadata = {
  params: { listId: string };
}

interface GetTodosResponse {
  desc: string;
  finished: boolean;
  id: number;
  movie: {Title:string};
}

export async function generateMetadata({ params }: MyListPageMetadata) {
  return {
    title: `TODO List ${params.listId}`,
  };
}

type MyListPageProps = MyListPageMetadata;

const GET_TODOS_QUERY = gql`
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


export default async function MyListPage({ params: { listId } }: MyListPageProps) {
  // TODO fetch list from server
  const { getMovieListItems } = await client.request<{ getMovieListItems: GetTodosResponse[] }>(GET_TODOS_QUERY, {
    listId: parseInt(listId),
  });

  console.log(getMovieListItems);
  
  return (
    <div className="flex align-center justify-center p-16 sm:p-8">
        {getMovieListItems.map((item, itemIndex) => {
            return(
                <p key={itemIndex}>{item.movie.Title}</p>
            );
        })}
    </div>
  );
}
