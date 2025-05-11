"use client"
import "./style.scss"
import HomeSlider from '@/components/HomeSlider/HomeSlider'
import MovieSlider from "@/components/MovieSlider/MovieSlider"
import PagingMovies from "@/components/PagingMovies/PagingMovies"
import { useLazyQuery, useQuery } from "@apollo/client";
import { Divider } from "@heroui/react"
import { useEffect, useState } from "react"
import { GET_NEW_MOVIES } from "@/graphql/actions/movieActions/getnewmovies.action";
import Loading from "@/components/Loading/Loading";
import { GET_RECOMMENDED_MOVIES } from "@/graphql/actions/movieActions/get_recommended_movies.action";
import { GET_CURRENT_MOVIES } from "@/graphql/actions/movieActions/get_current_movies.action"
import { useSelector } from 'react-redux';
import { authenSelectorUser } from '@/redux-toolkit/selector';
import { ItemRecentMovie } from "../RecentWatchingPage/RecentWatchingPage"
function RecommendMovies() {
  const [loading, setLoading] = useState(true);
  const resultRecommendedMovies = useQuery(GET_RECOMMENDED_MOVIES, {
    variables: { limit: 40 },
    fetchPolicy: "no-cache",
  })
  useEffect(() => {
    if (resultRecommendedMovies.data) {
      setLoading(false);
    }
  }, [resultRecommendedMovies.data])
  if (loading) {
    return (
      <div >
        <Loading />
      </div>
    )
  }
  return (
    <div>
      <h2 className="heading">Đề xuất</h2>
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
  )
}

function NewMovies() {
  const [loading, setLoading] = useState(true);
  const resultNewMoviesBottom = useQuery(GET_NEW_MOVIES, {
    variables: { limit: 40 },
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (resultNewMoviesBottom.data) {
      setLoading(false);
    }
  }, [resultNewMoviesBottom.data])
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  return (
    <>
      {
        resultNewMoviesBottom.data ? (
          <div>
            <h2 className="heading">Các bộ phim mới</h2>
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
    </>
  )
}

function SlideMovies() {
  const [loading, setLoading] = useState(true);

  const resultNewMovies = useQuery(GET_NEW_MOVIES, {
    variables: { limit: 10 },
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (resultNewMovies.data) {
      setLoading(false);
    }
  }, [resultNewMovies.data])
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  return (
    <>
      {
        resultNewMovies.data ? <HomeSlider movies={resultNewMovies.data.getTopNewMovie.movies} /> : null
      }
    </>
  )
}

function ContinueMovies({ userId }: { userId: string }) {
  // const userAuthen = useSelector(authenSelectorUser);
  const [movies, setMovies] = useState([])
  const [recentMovies, { data, loading, error }] = useLazyQuery(GET_CURRENT_MOVIES, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {

    recentMovies({
      variables: {
        id: userId
      }
    })

  }, [])
  useEffect(() => {
    if (data) {
      setMovies(data.getRecentMovies.movies)
    }
  }, [data])
  // if (!userAuthen) {
  //   return (
  //     <p style={{ color: "#fff", fontWeight: "bold" }}>Đăng nhập để truy cập</p>
  //   )
  // }
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  return (
    <>
      <h2 className="heading">Tiếp tục xem</h2>
      <div style={{ display: "flex", alignItems: "start", flexWrap: "wrap", justifyContent: "flex-start" }}>
        {
          movies.length > 0 ?
            movies.map((ele: any, index: number) => {
              return <ItemRecentMovie movies={movies} handleResetMovies={setMovies}
                key={index} movieId={ele.movieId} userId={userId}
                isDelete={false} name={ele.name} episode={ele.episode}
                slug={ele.slug} time={ele.time} thumb_url={ele.thumb_url} />
            })
            : <p style={{ color: "#fff", fontWeight: "bold" }}>Chưa xem bộ phim nào gần đây</p>
        }

      </div>
    </>
  )
}

function HomePage() {
  const userAuthen = useSelector(authenSelectorUser);
  return (
    <div>

      {/* Slider */}
      <SlideMovies />
      {/* Body */}
      <div className="body--container">
        {/* Continue watching */}
        {userAuthen && <ContinueMovies userId={userAuthen.id} />}

        <div style={{ marginTop: "48px", marginBottom: "48px", padding: "0 12px" }}><Divider /></div>

        {/* recommend movie */}
        <RecommendMovies />

        <div style={{ marginTop: "48px", marginBottom: "48px", padding: "0 12px" }}><Divider /></div>

        {/* New movies */}
        <NewMovies />
      </div>
    </div>
  )
}

export default HomePage