import Player from '@/components/Player/Player'
import "./style.scss";
import LoveFillIcon from '@/components/icons/LoveFillIcon';
import RatingMovie from '@/components/RatingMovie/RatingMovie';
import PlayIcon from '@/components/icons/PlayIcon';
type Props = {
  idMovie: string,
  episode: string
}
function WatchingPage({ idMovie, episode }: Props) {
  return (
    <div className='watching--container'>
      <div>
        <h2 className='text-white'>Bạn đang xem: <span className='name-watching'>{idMovie}: {episode}</span></h2>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Player src='https://vip.opstream12.com/20241205/24628_4b59d913/index.m3u8' />
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
                <img src='https://img.ophim.live/uploads/movies/900-ngay-vang-anabel-thumb.jpg' />
              </div>
              {/* Details */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p className='text-white size-[1.2rem] font-bold'>Phô mai chính phủ trợ cấp</p>
                <p style={{ color: "#fed875" }}>Government cheese</p>
                <div className='flex gap-2 mt-[20px]'>
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
                <div className='flex gap-2 mt-[20px]'>
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
              </div>
            </div>

            {/* Description */}
            <div style={{ flex: 1 }}>
              <p style={{ color: "#606770", fontSize: "1.1rem" }}>
                Khi Hampton (David Oyelowo) được phóng thích khỏi nhà tù, buổi đoàn tụ gia đình được mong đợi từ lâu không diễn ra như anh hy vọng. Vợ và hai con của Hampton đã tạo thành một gia đình kỳ lạ, và việc anh trở lại đã khiến họ bị cuốn vào vòng xoáy.
              </p>
            </div>
          </div>

          {/* Episodes */}
          <div className='mt-[20px]'>
            <p style={{ color: "#fff", fontWeight: "bold", fontSize: "1.4rem" }}>Tập</p>
            <div style={{ display: "flex", marginTop: "12px", flexWrap: "wrap", gap: 8 }}>
              {
                [1, 2, 3, 4].map((ele, index) => {
                  return (
                    <div key={ele} style={{ display: "flex", padding: "15px", backgroundColor: "#282b3a", borderRadius: "12px", cursor: "pointer" }}>
                      <PlayIcon className='text-white size-6' />
                      <p style={{ color: "#fff", userSelect: "none" }}>Tập {index}</p>
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
          <div style={{ display: "flex", flexDirection: "column", marginTop:"20px", gap:8 }}>
            <div style={{cursor:"pointer", height: "120px", display: "flex", alignItems: "center", gap:12, backgroundColor:"#000", borderRadius:"12px", overflow:"hidden", paddingRight:"8px" }}>
              <img style={{ height: "100%" }} src='https://img.ophim.live/uploads/movies/900-ngay-vang-anabel-thumb.jpg' />
              <div>
                <p style={{ fontSize: "1rem", fontWeight: "bold",color:"#fff" }}>Pho mai chinh phu tro cap</p>
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