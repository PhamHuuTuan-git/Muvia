"use client";
import { addToast, Button } from "@heroui/react";
import "./style.scss";
import PlayIcon from "@/components/icons/PlayIcon";
import LoveFillIcon from "@/components/icons/LoveFillIcon";
import { useState } from "react";
import TabMovie from "./TabMovie";
import RatingMovie from "@/components/RatingMovie/RatingMovie";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
import { GET_SPECIFIED_MOVIE } from "@/graphql/actions/movieActions/get_specified_movie.action";
import { useQuery } from "@apollo/client";
import Loading from "@/components/Loading/Loading";

type Props = {
    slug: string
}

function DetailMovie({ slug }: Props) {
    const [isLike, setIslike] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { data, loading, error } = useQuery(GET_SPECIFIED_MOVIE, {
        variables: { slug: slug },
        fetchPolicy: "no-cache",
    })

    const redirectWatching = () => {
        const slug = data.getSpecifiedMovie.movie.episodes[0].server_data[0].slug;
        if (!slug || slug === "") {
            addToast({
                title: "Cảnh báo",
                description: "Phim chưa sẵn sàng",
                color: "danger"
            })
        } else {
            router.push(`${pathname}/watch/tap-${slug}`)
        }

    }
    if (data === undefined || data === null) {
        return (
            <div style={{marginTop:"80px"}}>
                <Loading />
            </div>
        )
    }
    return (
        <div className="detail--container">
            <div className="poster--container">
                <img src={`${data.getSpecifiedMovie.movie.poster_url}`} className="poster" />
            </div>
            {/* Content */}
            <div className="detail-movie-content--container">
                {/* Left part */}
                <div className="detail-movie-content-left">
                    <div className="thumbnail-detail-movie--container">
                        <img className="thumbmail-detail-movie--img" src={`${data.getSpecifiedMovie.movie.thumb_url}`} />
                    </div>
                    {/* detail */}
                    <div className="detail-movie-context--container">
                        <h2 className="detail-movie--vietname">{data.getSpecifiedMovie.movie.name}</h2>
                        <p className="detail-movie--originname">{data.getSpecifiedMovie.movie.origin_name}</p>
                    </div>

                    {/* sub-detail */}
                    <div className="mt-[10px] flex gap-2">
                        <div className="imdb-detail-movie--container">
                            <p className="text-white text-[0.6rem]"><span style={{ color: "#c0a46b" }}>IMDb: </span> 8.2</p>
                        </div>
                        <div className="year-detail-movie--container">
                            <p className="text-white text-[0.6rem]">12</p>
                        </div>
                        <div className="year-detail-movie--container">
                            <p className="text-white text-[0.6rem]">
                                {data.getSpecifiedMovie.movie.status === "ongoing" ?
                                    (`${data.getSpecifiedMovie.movie.episode_current}/${data.getSpecifiedMovie.movie.episode_total}`) :
                                    data.getSpecifiedMovie.movie.episode_current}
                            </p>
                        </div>
                    </div>

                    {/* the loai */}
                    <div className="mt-[20px] flex gap-2">
                        {
                            data.getSpecifiedMovie.movie.category&&
                            data.getSpecifiedMovie.movie.category.length > 0 && 
                            data.getSpecifiedMovie.movie.category.map((ele: any, index: number) => {
                                return (
                                    <div key={index}className="type-detail-movie--container">
                                        <p className="text-white text-[0.6rem]">{ele.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Gioi thieu */}
                    <div className="mt-[40px] w-full">
                        <h3 className="text-white font-bold">Giới thiệu:</h3>
                        <p className="detail-movie-introduce--content" dangerouslySetInnerHTML={{ __html: data.getSpecifiedMovie.movie.content }} />
                    </div>

                    <div className="mt-[20px] w-full">
                        <h3 className="text-white font-bold">Thời lượng: <span className="detail-movie-another--content">{data.getSpecifiedMovie.movie.time}</span></h3>
                    </div>
                    <div className="mt-[20px] w-full">
                        <h3 className="text-white font-bold mr-1">Quốc gia:
                            {
                                data.getSpecifiedMovie.movie.country &&
                                data.getSpecifiedMovie.movie.country.length > 0 &&
                                data.getSpecifiedMovie.movie.country.map((ele: any, index: number) => {
                                    return <span key={index} className="detail-movie-another--content"> {ele.name}</span>
                                })
                            }
                        </h3>

                    </div>
                    <div className="mt-[20px] w-full">
                        <h3 className="text-white font-bold">Đạo diễn:
                            {
                                data.getSpecifiedMovie.movie.director &&
                                data.getSpecifiedMovie.movie.director.length > 0 &&
                                data.getSpecifiedMovie.movie.director.map((ele: any, index: number) => {
                                    return <span key={index} className="detail-movie-another--content"> {ele}</span>
                                })
                            }

                        </h3>
                    </div>
                    <div className="mt-[20px] w-full">
                        <h3 className="text-white font-bold">Diễn viên:
                            {
                                data.getSpecifiedMovie.movie.actor &&
                                data.getSpecifiedMovie.movie.actor.length > 0 &&
                                data.getSpecifiedMovie.movie.actor.map((ele: any, index: number) => {
                                    return <span key={index} className="detail-movie-another--content"> {ele}</span>
                                })
                            }
                        </h3>
                    </div>
                </div>
                {/* Right part */}
                <div className="detail-movie-content-right">
                    {/*  */}
                    <div className="flex gap-8">
                        <Button onClick={redirectWatching} className="watch-now--button"><PlayIcon /> Xem ngay</Button>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <LoveFillIcon onClick={() => setIslike(!isLike)} className={`${!isLike ? "movie-like" : "movie-liked"} size-6 cursor-pointer`} />
                            <p className="select-none text-white">Yêu thích</p>
                        </div>
                    </div>
                    {/* Tabs */}
                    <div className="tabs--container">
                        <TabMovie movie={data.getSpecifiedMovie.movie} />
                    </div>

                    {/* Rating */}
                    <div style={{ marginTop: "80px", padding: "40px" }}>
                        <RatingMovie />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailMovie