"use client";
import { Button } from "@heroui/react";
import "./style.scss";
import PlayIcon from "@/components/icons/PlayIcon";
import LoveFillIcon from "@/components/icons/LoveFillIcon";
import { useState } from "react";
import TabMovie from "./TabMovie";
import RatingMovie from "@/components/RatingMovie/RatingMovie";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
type Props = {
    slug: string,
    id: string
}

function DetailMovie({ slug, id }: Props) {
    const [isLike, setIslike] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    // console.log("path now: ", pathname)
    const redirectWatching = () => {
        router.push(`${pathname}/watch/tap-1`)
    }
    return (
        <div className="detail--container">
            <div className="poster--container">
                <img src="https://img.ophim.live/uploads/movies/jerry-springer-dam-da-camera-dien-poster.jpg" className="poster" />
            </div>
            {/* Content */}
            <div className="detail-movie-content--container">
                {/* Left part */}
                <div className="detail-movie-content-left">
                    <div className="thumbnail-detail-movie--container">
                        <img className="thumbmail-detail-movie--img" src="https://img.ophim.live/uploads/movies/jerry-springer-dam-da-camera-dien-thumb.jpg" />
                    </div>
                    {/* detail */}
                    <div className="detail-movie-context--container">
                        <h2 className="detail-movie--vietname">Jerry Springer: Đấm đá, camera, diễn {slug}</h2>
                        <p className="detail-movie--originname">Jerry Springer: Fights, Camera, Action {id}</p>
                    </div>

                    {/* sub-detail */}
                    <div className="mt-[10px] flex gap-2">
                        <div className="imdb-detail-movie--container">
                            <p className="text-white text-[0.6rem]"><span style={{ color: "#c0a46b" }}>IMDb: </span> 8.2</p>
                        </div>
                        <div className="year-detail-movie--container">
                            <p className="text-white text-[0.6rem]">2025</p>
                        </div>
                        <div className="year-detail-movie--container">
                            <p className="text-white text-[0.6rem]">11/16</p>
                        </div>
                    </div>

                    {/* the loai */}
                    <div className="mt-[20px] flex gap-2">
                        <div className="type-detail-movie--container">
                            <p className="text-white text-[0.6rem]">Chính kịch</p>
                        </div>
                        <div className="type-detail-movie--container">
                            <p className="text-white text-[0.6rem]">Hài hước</p>
                        </div>
                        <div className="type-detail-movie--container">
                            <p className="text-white text-[0.6rem]">Kinh dị</p>
                        </div>
                        <div className="type-detail-movie--container">
                            <p className="text-white text-[0.6rem]">Âm nhạc</p>
                        </div>
                    </div>

                    {/* Gioi thieu */}
                    <div className="mt-[40px] w-full">
                        <h3 className="text-white font-bold">Giới thiệu:</h3>
                        <p className="detail-movie-introduce--content">{"Trăm dặm giết một người, mười bước không muốn đi.\n\nTa chính là kiếm.\n\nTrăm dặm giết một người, mười bước không muốn đi.\n\nTrăm dặm giết một người, mười bước không thể đi.\n\nTrăm dặm giết một người, mười bước? Không thể!\n\nTrong ta có kiếm, trong kiếm có ta.\n\nĐại Đạo Triều Thiên, tất cả chấp nhất kiếm."}</p>
                    </div>

                    <div className="mt-[20px] w-full">
                        <h3 className="text-white font-bold">Thời lượng: <span className="detail-movie-another--content">1h30p</span></h3>
                    </div>
                    <div className="mt-[20px] w-full">
                        <h3 className="text-white font-bold">Quốc gia: <span className="detail-movie-another--content">Hàn Quốc</span></h3>
                    </div>
                    <div className="mt-[20px] w-full">
                        <h3 className="text-white font-bold">Đạo diễn: <span className="detail-movie-another--content">Kim yong uy</span></h3>
                    </div>
                    <div className="mt-[20px] w-full">
                        <h3 className="text-white font-bold">Diễn viên: <span className="detail-movie-another--content">Kim yong uy</span></h3>
                    </div>
                </div>
                {/* Right part */}
                <div className="detail-movie-content-right">
                    {/*  */}
                    <div className="flex gap-8">
                        <Button onClick={redirectWatching} className="watch-now--button"><PlayIcon /> Xem ngay</Button>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <LoveFillIcon onClick={() => setIslike(!isLike)} className={`${isLike ? "movie-like" : "movie-liked"} size-6 cursor-pointer`}/>
                            <p className="select-none text-white">Yêu thích</p>
                        </div>
                    </div>
                    {/* Tabs */}
                    <div className="tabs--container">
                        <TabMovie />
                    </div>

                    {/* Rating */}
                    <div style={{marginTop:"80px", padding:"40px"}}>
                        <RatingMovie />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailMovie