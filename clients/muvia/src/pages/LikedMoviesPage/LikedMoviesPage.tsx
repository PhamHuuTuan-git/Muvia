"use client"
import LoveFillIcon from "@/components/icons/LoveFillIcon"
import "./style.scss"
import { useState } from "react";

function Item() {
  const [isLike, setIslike] = useState(false);
  return (
    <div style={{ display:"inline-block", width:"20%", maxWidth:"20%",marginTop:"20px",padding:"0 4px"}}>
      <div className='liked-movie-item--container'>
        <img className="liked-movie-item--image" src="https://img.ophim.live/uploads/movies/tiem-an-cua-ngai-heo-thumb.jpg" />
        <div className="liked-movie-item-other--container">
          <button className="liked-movie-watch--button">
            Chi tiết
          </button>
          <button>
            <LoveFillIcon onClick={() => setIslike(!isLike)} className={`${!isLike ? "movie-like" : "movie-liked"} size-6 cursor-pointer`} />
          </button>

        </div>
      </div>

      <div style={{display:"inline-block"}}>
        <p style={{color:"#fed875", fontWeight:"bold"}}>Tiệm ăn của ngài Heo</p>
      </div>
    </div>
  )
}

function LikedMoviesPage() {
  return (
    <div style={{display:"flex", alignItems:"center", flexWrap:"wrap"  ,justifyContent:"flex-start"}}>
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  )
}

export default LikedMoviesPage