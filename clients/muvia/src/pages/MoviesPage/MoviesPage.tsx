"use client";
import MoviesFilter from '@/components/MoviesFilter/MoviesFilter'
import MovieSort from '@/components/MovieSort/MovieSort'
import PagingMovies from '@/components/PagingMovies/PagingMovies'
import { useQuery } from "@apollo/client";
import { GET_MOVIES_WITH_QUERY } from '@/graphql/actions/movieActions/get_movies_with_query.action';
import { useRef } from 'react';
import Loading from '@/components/Loading/Loading';

type QueryParams = {
  type: string,
  category: string,
  country: string,
  year: string,
  sort: string,
  page: number
}

function MoviesPage({ queryParams }: { queryParams: QueryParams }) {
  console.log("query params: ", queryParams);
  const resultNewMovies = useQuery(GET_MOVIES_WITH_QUERY, {
    variables: {
      paging: {
        limit: 30,
        page: queryParams.page
      },
      query: {
        type: queryParams.type,
        category: queryParams.category,
        country: queryParams.country,
        year: queryParams.year
      },
      sort: {
        sort: queryParams.sort
      }
    },
    fetchPolicy: "no-cache",
  });
  const movies = useRef(null);
  const meta = useRef(null);
  if (resultNewMovies.data) {
    movies.current = resultNewMovies.data.getMovies.movies;
    meta.current = resultNewMovies.data.getMovies.meta;
  }
  // console.log("movies: ", resultNewMovies);
  return (
    <div style={{ marginTop: "80px" }}>
      <MoviesFilter queryParams={queryParams} />
      <MovieSort queryParams={queryParams} />
      {
        !resultNewMovies.data ? <Loading /> :
          (

            movies.current && meta.current && <PagingMovies isPaging queryParams={queryParams} meta={meta.current}  movies={movies.current} itemsPerRow={6} />

          )
      }

    </div>
  )
}

export default MoviesPage