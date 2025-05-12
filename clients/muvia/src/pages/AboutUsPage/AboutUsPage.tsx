"use client";
import "./style.scss";
// import { gql } from "@apollo/client";
// import { useQuery } from "@apollo/client";
// export const GET_PRIVATE_MOVIES = gql`
//   query GetPrivateMovies($id: String!) {
//     getPrivateMovies(id: $id) {
//       movies {
//         id
//         name
//       }
//     }
//   }
// `;

function AboutUsPage() {
  // const resultNewMovies = useQuery(GET_PRIVATE_MOVIES, {
  //     variables:{id: "680b5b4e4ca6c36f70e8b284"},
  //     fetchPolicy: "no-cache",
  //   });
  
  // console.log("private movies: ",resultNewMovies)
  return (
    <div >
      <div className="wall-paper-about-us">
        <div style={{ width: "100%" }}>
          <img style={{ width: "100%", height: "auto" }} src="/aboutuswallpaper.jpeg" />
        </div>
        <div className="text-about-us">
          <h2 className="brand-text">TnN Movie</h2>
          <div style={{ width: "100%", paddingLeft: "20px",marginTop:"10px" }}>
            <p className="detail-about-us">
              TnN cung cấp tới 2400 bộ phim bao gồm các thể loại chương trình và thể loại phim, từ phim lẻ đến
              phim bộ, từ kinh dị đến hài hước, đặc biệt cung cấp các bộ phim trải dài trên nhiều quốc gia, đồng 
              thời các bộ phim, chương trình từ cổ xưa đến hiện đại, kéo dài từ 1981 - 2025.
            </p>
            <p className="detail-about-us" style={{marginTop:"10px"}}>
              Lưu ý, TnN chỉ phục vụ mục đích nghiên cứu và học tập, tất cả nội dung phim, chương trình được cam kết 
              không sử dụng cho mục đích thương mại hoặc kiếm doanh thu từ các nội dung trong website.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AboutUsPage