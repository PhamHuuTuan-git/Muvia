"use client"
import "./style.scss"
import HomeSlider from '@/components/HomeSlider/HomeSlider'
import MovieSlider from "@/components/MovieSlider/MovieSlider"
import PagingMovies from "@/components/PagingMovies/PagingMovies"
import { useQuery } from "@apollo/client";
import { Divider } from "@heroui/react"
import { useEffect, useState } from "react"
import { GET_NEW_MOVIES } from "@/graphql/actions/movieActions/getnewmovies.action";
import Loading from "@/components/Loading/Loading";
import { GET_RECOMMENDED_MOVIES } from "@/graphql/actions/movieActions/get_recommended_movies.action";
function HomePage() {

  const [loading, setLoading] = useState(true);

  const resultNewMovies = useQuery(GET_NEW_MOVIES, {
    variables: { limit: 10 },
    fetchPolicy: "no-cache",
  });

  const resultNewMoviesBottom = useQuery(GET_NEW_MOVIES, {
    variables: { limit: 40 },
    fetchPolicy: "no-cache",
  });

  const resultRecommendedMovies = useQuery(GET_RECOMMENDED_MOVIES, {
    variables: { limit: 40 },
    fetchPolicy: "no-cache",
  })

  // if (resultNewMovies.data) {
  //   console.log("movies: ", resultNewMovies.data.getTopNewMovie.movies)
  // }

  useEffect(() => {
    if (resultNewMovies.data && resultNewMoviesBottom.data && resultRecommendedMovies.data) {
      setLoading(false);
    }
  }, [resultNewMovies.data, resultNewMoviesBottom.data, resultRecommendedMovies.data])



  if (loading) {
    return (
      <div style={{ marginTop: "80px" }}>
        <Loading />
      </div>
    )
  }

  return (
    <div>

      {/* Slider */}
      {
        resultNewMovies.data ? <HomeSlider movies={resultNewMovies.data.getTopNewMovie.movies} /> : null
      }


      {/* Body */}
      <div className="body--container">
        {/* Continue watching */}
        <div>
          <h2 className="heading">Continue watching</h2>
          <div>
            {/* <MovieSlider movies={content} itemsPerScreen={5} /> */}
          </div>
        </div>

        <div style={{ marginTop: "48px", marginBottom: "48px", padding: "0 12px" }}><Divider /></div>

        {/* recommend movie */}
        <div>
          <h2 className="heading">Recommended</h2>
          <div>
            {/* <MovieSlider movies={content} itemsPerScreen={5} /> */}
            <PagingMovies
              queryParams={
                {
                  type: "", category: "", country: "", year: "", sort: "", page: 0
                }
              }
              meta={
                {
                  page: 0, total: 0, totalPages: 0
                }
              }

              isPaging={false}
              movies={resultRecommendedMovies.data.getRecommendedMovies.movies}
              itemsPerRow={5} />
          </div>
        </div>

        <div style={{ marginTop: "48px", marginBottom: "48px", padding: "0 12px" }}><Divider /></div>

        {/* New movies */}
        {
          resultNewMoviesBottom.data ? (
            <div>
              <h2 className="heading">New movies</h2>
              <div>
                <PagingMovies
                  queryParams={
                    {
                      type: "", category: "", country: "", year: "", sort: "", page: 0
                    }
                  }
                  meta={
                    {
                      page: 0, total: 0, totalPages: 0
                    }
                  }

                  isPaging={false}
                  movies={resultNewMoviesBottom.data.getTopNewMovie.movies}
                  itemsPerRow={5} />
              </div>
            </div>
          ) : null
        }


      </div>
    </div>
  )
}

export default HomePage