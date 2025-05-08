"use client"
import "./style.scss"

function Item() {

  return (
    <div style={{ display: "inline-block", width: "20%", maxWidth: "20%", marginTop: "20px", padding: "0 4px" }}>
      <div className='liked-movie-item--container'>
        <img className="liked-movie-item--image" src="https://img.ophim.live/uploads/movies/tiem-an-cua-ngai-heo-thumb.jpg" />
        <div className="liked-movie-item-other--container">
          <button className="liked-movie-watch--button">
            Tiếp tục
          </button>
        </div>
        <button className="close-watching--button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white size-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div >
        <p style={{ color: "#fed875", fontWeight: "bold" }}>Tiệm ăn của ngài Heo</p>
      </div>
      <div style={{ display: "inline-flex" }}>
        <p style={{ color: "#fff", fontStyle: "italic" }}>Tập 1: </p>
        <p style={{ color: "#fff", fontStyle: "italic" }}> 12p30</p>
      </div>
    </div>
  )
}

function RecentWatchingPage() {
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-start" }}>
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

export default RecentWatchingPage