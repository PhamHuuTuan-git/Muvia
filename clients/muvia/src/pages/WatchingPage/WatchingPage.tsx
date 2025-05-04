"use client";
import Player from '@/components/Player/Player'
import "./style.scss";
import LoveFillIcon from '@/components/icons/LoveFillIcon';
import RatingMovie from '@/components/RatingMovie/RatingMovie';
import PlayIcon from '@/components/icons/PlayIcon';
import { GET_SPECIFIED_MOVIE } from "@/graphql/actions/movieActions/get_specified_movie.action";
import { useQuery } from "@apollo/client";
import { useCallback, useRef } from 'react';
import { addToast } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '@/components/Loading/Loading';
type Props = {
  slug: string,
  episode: string
}
function WatchingPage({ slug, episode }: Props) {
  const { data, loading, error } = useQuery(GET_SPECIFIED_MOVIE, {
    variables: { slug: slug },
    fetchPolicy: "no-cache",
  })
  const router = useRouter();
  const pathname = usePathname();
  console.log("pahtname: ", pathname)
  const movie = useRef<any>(null);
  const getVideo = () => {
    if (movie.current) {

      return movie.current.episodes[0].server_data.filter((video: any) => {
        return video.slug === episode
      })[0]
    }
  }
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
  console.log("video current: ", getVideo())
  if (!data) {
    return (
      <div style={{ marginTop: "80px" }}>
        <Loading />
      </div>
    )
  }
  if (data) {
    movie.current = data.getSpecifiedMovie.movie
  }
  return (
    <div className='watching--container'>
      <div>
        <h2 className='text-white'>Bạn đang xem: <span className='name-watching'>
          {movie.current && movie.current.name}: {`Tập ${episode}`}
        </span></h2>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Player src={`${getVideo().link_m3u8}`} />
      </div>

      <div className='flex mt-[40px] gap-8'>
        <div className='watching-left-part'>
          <div className=' flex gap-[32px]'>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <p className='text-white'>Yêu thích</p>
              <LoveFillIcon className='text-white size-6' />
            </div>
          </div>

          {/* Information */}
          <div className='mt-[40px] flex gap-8 items-center'>
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
              <RatingMovie />
            </div>
          </div>
        </div>

        <div className='watching-right-part'>
          <p style={{ color: "#fff", fontWeight: "bold", fontSize: "1.4rem" }}>Đề xuất</p>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "20px", gap: 8 }}>
            <div style={{ cursor: "pointer", height: "120px", display: "flex", alignItems: "center", gap: 12, backgroundColor: "#000", borderRadius: "12px", overflow: "hidden", paddingRight: "8px" }}>
              <img style={{ height: "100%" }} src='https://img.ophim.live/uploads/movies/900-ngay-vang-anabel-thumb.jpg' />
              <div>
                <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#fff" }}>Pho mai chinh phu tro cap</p>
                <p className='text-white'>Government Cheese</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default WatchingPage