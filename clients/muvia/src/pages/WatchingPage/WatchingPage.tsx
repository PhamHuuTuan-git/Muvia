"use client";
import Player from '@/components/Player/Player'
import "./style.scss";
import LoveFillIcon from '@/components/icons/LoveFillIcon';
import RatingMovie from '@/components/RatingMovie/RatingMovie';
import PlayIcon from '@/components/icons/PlayIcon';
import { GET_SPECIFIED_MOVIE } from "@/graphql/actions/movieActions/get_specified_movie.action";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from 'react';
import { addToast } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '@/components/Loading/Loading';
import { GET_RECOMMENDED_MOVIES } from "@/graphql/actions/movieActions/get_recommended_movies.action";
import routing from '@/utils/routing';
import { useSelector } from 'react-redux';
import { authenSelectorUser } from '@/redux-toolkit/selector';
import { ADD_RECENT_MOVIE } from '@/graphql/actions/movieActions/add_recent_movie.action';
import { UPDATE_LIKED_MOVIES } from '@/graphql/actions/movieActions/update_liked_movies.action';
import { CHECK_IS_LIKE_MOVIE } from '@/graphql/actions/movieActions/check_is_like_movie.action';
type Props = {
  slug: string,
  episode: string,
}
function LikeMovie({userAuthen, data}: {userAuthen: any, data: any}) {
  const [isLike, setIslike] = useState(false);
  const [updateLikeMoviesMutation] = useMutation(UPDATE_LIKED_MOVIES);
  const [checkIsLikeMovie, { data: likeData }] = useLazyQuery(CHECK_IS_LIKE_MOVIE, {
          fetchPolicy: "no-cache",
      });
  useEffect(() => {
        if (userAuthen && data) {
            checkIsLikeMovie({
                variables: {
                    id: userAuthen.id,
                    movieId: data.getSpecifiedMovie.movie.id,
                },
            });
        }
    }, [data])
    useEffect(() => {
        if (likeData) {
            setIslike(likeData.getStatusLikedMovie)
        }
    }, [likeData]);
  const handleLikeStatus = async () => {
    if (!userAuthen || !data) return;
    try {
      const result = await updateLikeMoviesMutation({
        variables: {
          id: userAuthen.id,
          movieId: data.getSpecifiedMovie.movie.id
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
    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 8, cursor: "pointer" }}>
      <p className='text-white'>Yêu thích</p>
      <LoveFillIcon onClick={() => handleLikeStatus()} className={`${!isLike ? "movie-like" : "movie-liked"} size-6 cursor-pointer`} />
    </div>
  )
}
function WatchingPage({ slug, episode }: Props) {
  const userAuthen = useSelector(authenSelectorUser);
  const { data, loading, error } = useQuery(GET_SPECIFIED_MOVIE, {
    variables: { slug: slug },
    fetchPolicy: "no-cache",
  })
  const [isloading, setLoading] = useState(true)
  const resultRecommendedMovies = useQuery(GET_RECOMMENDED_MOVIES, {
    variables: { limit: 10 },
    fetchPolicy: "no-cache",
  })
  const current_Time = useRef(0);
  const [addRecentMovie, { error: mutationError }] = useMutation(ADD_RECENT_MOVIE);
  const router = useRouter();
  const pathname = usePathname();
  // console.log("pahtname: ", pathname)
  const movie = useRef<any>(null);
  const getVideo = () => {
    if (movie.current) {

      return movie.current.episodes[0].server_data.filter((video: any) => {
        return video.slug === episode
      })[0]
    }
  }
  useEffect(() => {
    if (data && resultRecommendedMovies.data) {
      setLoading(false)
    }
  }, [data, resultRecommendedMovies.data])
  const handleRedirectMovie = (curr_episode: string) => {

    if (episode === curr_episode) return;
    if (!episode || episode == "") {

      addToast({
        title: "Cảnh báo",
        description: "Phim chưa sẵn sàng",
        color: "danger"
      })
    } else {
      if (pathname) {
        const parts = pathname.split("/");

        const basePath = parts.slice(0, -1).join("/");
        router.push(`${basePath}/tap-${curr_episode}`)
      }

    }
  }
  const saveRecentMovie = () => {
    console.log("sending but not true")
    if (!userAuthen || !movie.current) return;
    console.log("sending")
    const movieInfo = {
      movieId: movie.current.id,
      name: movie.current.name,
      thumb_url: movie.current.thumb_url,
      episode: episode,
      slug: movie.current.slug,
      time: current_Time.current.toString()
    };

    // Đã đăng nhập: Gửi mutation
    addRecentMovie({
      variables: {
        id: userAuthen.id,
        movieInfo: movieInfo
      },
    }).catch((err: any) => {
      console.error("Error saving recent movie:", err.message);
      // Lưu tạm vào localStorage nếu mutation thất bại
    });

  };

  useEffect(() => {


    // window.addEventListener("beforeunload", saveRecentMovie);

    return () => {
      // window.removeEventListener("beforeunload", saveRecentMovie);
      saveRecentMovie()
    };
  }, [data, userAuthen]);

  // console.log("video current: ", getVideo())
  if (isloading) {
    return (
      <div style={{ marginTop: "80px" }}>
        <Loading />
      </div>
    )
  }
  if (data) {
    movie.current = data.getSpecifiedMovie.movie
  }

  const handleRedirect = (slug: string) => {
    router.push(`${routing.movies}/${slug}`)
  }

  return (
    <div className='watching--container'>
      <div>
        <h2 className='text-white'>Bạn đang xem: <span className='name-watching'>
          {movie.current && movie.current.name}: {`Tập ${episode}`}
        </span></h2>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Player time={current_Time} src={`${getVideo().link_m3u8}`} />
      </div>

      <div className='watching-main--container flex mt-[40px] gap-8'>
        <div className='watching-left-part'>
          <div className=' flex gap-[32px]'>
            <LikeMovie userAuthen={userAuthen} data={data}/>
          </div>

          {/* Information */}
          <div className='sweeping-info--watching mt-[40px] flex gap-8 items-center'>
            <div className='flex gap-4'>
              {/* Image and IDMB */}
              <div className='watching-image--container'>
                <img src={`${movie.current.thumb_url}`} />
              </div>
              {/* Details */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p className='text-white size-[1.2rem] font-bold'>{movie.current.name}</p>
                <p style={{ color: "#fed875" }}>{movie.current.origin_name}</p>
                <div className='flex gap-2 mt-[20px]'>
                  <div className="imdb-detail-movie--container">
                    <p className="text-white text-[0.6rem]"><span style={{ color: "#c0a46b" }}>IMDb: </span> 8.2</p>
                  </div>
                  <div className="year-detail-movie--container">
                    <p className="text-white text-[0.6rem]">{movie.current.year}</p>
                  </div>
                  <div className="year-detail-movie--container">
                    <p className="text-white text-[0.6rem]">
                      {movie.current.status === "ongoing" ?
                        (`${movie.current.episode_current}/${movie.current.episode_total}`) :
                        movie.current.episode_current}
                    </p>
                  </div>
                </div>
                <div className='flex gap-2 mt-[20px]'>
                  {
                    movie.current.category.map((ele: any, index: number) => {
                      return (
                        <div key={index} className="type-detail-movie--container">
                          <p className="text-white text-[0.6rem]">{ele.name}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ flex: 1 }}>
              <p style={{ color: "#606770", fontSize: "1.1rem" }} dangerouslySetInnerHTML={{ __html: movie.current.content }} />

            </div>
          </div>

          {/* Episodes */}
          <div className='mt-[20px]'>
            <p style={{ color: "#fff", fontWeight: "bold", fontSize: "1.4rem" }}>Tập</p>
            <div style={{ display: "flex", marginTop: "12px", flexWrap: "wrap", gap: 8 }}>
              {
                movie.current.episodes[0].server_data.map((ele: any, index: number) => {
                  return (
                    <div onClick={() => handleRedirectMovie(ele.slug)} key={index}
                      style={{ display: "flex", padding: "15px", backgroundColor: episode === ele.slug ? "#fed875" : "#282b3a", borderRadius: "12px", cursor: "pointer" }}
                    >
                      <PlayIcon className={episode === ele.slug ? 'text-black size-6' : 'text-white size-6'} />
                      <p style={{ color: episode === ele.slug ? "#000" : "#fff", userSelect: "none" }}>Tập {ele.name}</p>
                    </div>
                  )
                })
              }

            </div>
          </div>

          {/* Rating */}
          <div className='mt-[40px] flex' >
            <div className='watching-left-part'>
              <RatingMovie idMovie={movie.current.id} nameMovie={movie.current.name} />
            </div>
          </div>
        </div>

        <div className='watching-right-part'>
          <p style={{ color: "#fff", fontWeight: "bold", fontSize: "1.4rem" }}>Đề xuất</p>
          <div className='recommended-watching'>
            {
              resultRecommendedMovies.data.getRecommendedMovies.movies.map((movie: any, index: number) => {
                return <div onClick={() => handleRedirect(movie.slug)} key={index} className='item-recommended-watching'>
                  <img style={{ height: "100%" }} src={`${movie.thumb_url}`} />
                  <div>
                    <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#fff" }}>{movie.name}</p>
                    <p className='text-white'>{movie.origin_name}</p>
                  </div>
                </div>
              })
            }

          </div>
        </div>
      </div>

    </div>
  )
}

export default WatchingPage