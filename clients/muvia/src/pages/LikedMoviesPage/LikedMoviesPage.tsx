"use client"
import LoveFillIcon from "@/components/icons/LoveFillIcon"
import "./style.scss"
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { authenSelectorUser } from '@/redux-toolkit/selector';
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_LIKED_MOVIES } from "@/graphql/actions/movieActions/get_liked_movies.action";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { UPDATE_LIKED_MOVIES } from "@/graphql/actions/movieActions/update_liked_movies.action";
import routing from "@/utils/routing";
import { addToast } from "@heroui/react";
function Item({userId,movieId, name, slug, thumb_url }: {userId: string, movieId: string, name: string, slug: string, thumb_url: string }) {
  const router = useRouter()
  const [isLike, setIslike] = useState(true);
  const [updateLikeMoviesMutation] = useMutation(UPDATE_LIKED_MOVIES);
  const handleRedirect = () => {
    router.push(`${routing.movies}/${slug}`)
  }
  const handleUpdateLike = async () => {
    if (!userId) return;
    try {
       await updateLikeMoviesMutation({
        variables: {
          id: userId,
          movieId: movieId
        }
      })
      setIslike(!isLike)
    } catch (err: any) {
      addToast({
        title: "Error",
        description: `${err.message}`,
        color: "danger"
      })
    }
  }
  return (
    <div className="liked-movie--item">
      <div className='liked-movie-item--container'>
        <img className="liked-movie-item--image" src={`${thumb_url}`} />
        <div className="liked-movie-item-other--container">
          <button
            onClick={handleRedirect}
            className="liked-movie-watch--button">
            Chi tiết
          </button>
          <button>
            <LoveFillIcon onClick={handleUpdateLike} className={`${!isLike ? "movie-like" : "movie-liked"} size-6 cursor-pointer`} />
          </button>

        </div>
      </div>

      <div
      // style={{ display: "inline-block" }}
      >
        <p style={{ color: "#fed875", fontWeight: "bold", textAlign: "center" }}>{name}</p>
      </div>
    </div>
  )
}

function LikedMoviesPage() {
  const userAuthen = useSelector(authenSelectorUser);
  const [movies, setMovies] = useState([])
  const [likedMovies, { data, loading, error }] = useLazyQuery(GET_LIKED_MOVIES, {
    fetchPolicy: "no-cache",
  })
  useEffect(() => {
    if (userAuthen) {
      likedMovies({
        variables: {
          id: userAuthen.id
        }
      })
    }
  }, [userAuthen])
  useEffect(() => {
    if (data) {
      setMovies(data.getLikedMovies.movies)
    }
  }, [data])
  console.log(userAuthen)
  if (!userAuthen) {
    return (
      <p style={{ color: "#fff", fontWeight: "bold" }}>Đăng nhập để truy cập</p>
    )
  }
  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <div style={{ display: "flex", alignItems: "start", flexWrap: "wrap", justifyContent: "flex-start" }}>
      {
        movies.length > 0 ?
          (
            data.getLikedMovies.movies.map((ele: any, index: number) => {
              return (
                <Item
                  userId={userAuthen.id}
                  movieId={ele.id}
                  key={index}
                  name={ele.name}
                  thumb_url={ele.thumb_url}
                  slug={ele.slug}
                />
              )
            })
          ) : <p style={{ color: "#fff", fontWeight: "bold" }}>Chưa thích bộ phim nào</p>
      }
    </div>
  )
}

export default LikedMoviesPage