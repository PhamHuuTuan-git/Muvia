"use client"
import Loading from "@/components/Loading/Loading";
import "./style.scss"
import { formatTime } from "@/utils/formatTime"
import { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CURRENT_MOVIES } from "@/graphql/actions/movieActions/get_current_movies.action";
import { useSelector } from "react-redux";
import { authenSelectorUser } from "@/redux-toolkit/selector";
import { useRouter } from "next/navigation";
import routing from "@/utils/routing";
import { DELETE_RECENT_MOVIE } from "@/graphql/actions/movieActions/delete_current_movie.action";
import { addToast } from "@heroui/react";
export function ItemRecentMovie(
  { movieId, userId, isDelete, name, slug, episode, thumb_url, time, movies, handleResetMovies }
    : { movieId: string, userId: string, isDelete: boolean, name: string, movies: any, slug: string, episode: string, thumb_url: string, time: string, handleResetMovies: any }) {

  const router = useRouter();
  const [removeRecentMovie, { loading, error, data }] = useMutation(DELETE_RECENT_MOVIE);
  const handleRedirect = () => {
    router.push(`${routing.movies}/${slug}/watch/tap-${episode}`)
  }

  const handleRemove = async () => {
    try {
      await removeRecentMovie({
        variables: {
          id: userId,
          movieId: movieId
        }
      })
      addToast({
        title: "Success",
        description: "Xóa thành công",
        color: "success"
      })
      const new_movies = movies.filter((ele: any) => {
        return ele.movieId !== movieId
      })
      handleResetMovies(new_movies);
    } catch (err: any) {
      addToast({
        title: "Error",
        description: `${err.message}`,
        color: "danger"
      })
    }
  }

  return (
    <div style={{ display: "inline-block", width: "20%", maxWidth: "20%", marginTop: "20px", padding: "0 4px" }}>
      <div className='liked-movie-item--container'>
        <img className="liked-movie-item--image" src={`${thumb_url}`} />
        <div className="liked-movie-item-other--container">
          <button
            onClick={handleRedirect}
            className="liked-movie-watch--button">
            Tiếp tục
          </button>
        </div>
        {
          isDelete && <button
            onClick={handleRemove}
            className="close-watching--button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        }

      </div>
      <div >
        <p style={{ color: "#fed875", fontWeight: "bold" }}>{name}</p>
      </div>
      <div style={{ display: "inline-flex", gap: 4 }}>
        <p style={{ color: "#fed875", fontStyle: "italic", fontWeight: "bold" }}>Tập {episode} </p>
        <p style={{ color: "#fff", fontStyle: "italic" }}> - {formatTime(time)}</p>
      </div>
    </div>
  )
}

function RecentWatchingPage() {

  const userAuthen = useSelector(authenSelectorUser);
  const [movies, setMovies] = useState([])
  const [recentMovies, { data, loading, error }] = useLazyQuery(GET_CURRENT_MOVIES, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (userAuthen) {
      recentMovies({
        variables: {
          id: userAuthen.id
        }
      })
    }
  }, [userAuthen])
  useEffect(() => {
    if (data) {
      setMovies(data.getRecentMovies.movies)
    }
  }, [data])
  if (!userAuthen) {
    return (
      <p style={{ color: "#fff", fontWeight: "bold" }}>Đăng nhập để truy cập</p>
    )
  }
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  return (
    <div style={{ display: "flex", alignItems: "start", flexWrap: "wrap", justifyContent: "flex-start" }}>
      {
        movies.length > 0 ?
          movies.map((ele: any, index: number) => {
            return <ItemRecentMovie movies={movies} handleResetMovies={setMovies}
              key={index} movieId={ele.movieId} userId={userAuthen.id}
              isDelete={true} name={ele.name} episode={ele.episode}
              slug={ele.slug} time={ele.time} thumb_url={ele.thumb_url} />
          })
          : <p style={{ color: "#fff", fontWeight: "bold" }}>Chưa xem bộ phim nào gần đây</p>
      }

    </div>
  )
}

export default RecentWatchingPage