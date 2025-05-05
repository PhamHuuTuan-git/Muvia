import "./style.scss"
import HomeSlider from '@/components/HomeSlider/HomeSlider'
import MovieSlider from "@/components/MovieSlider/MovieSlider"
import PagingMovies from "@/components/PagingMovies/PagingMovies"
import { useQuery } from "@apollo/client";
import { Divider } from "@heroui/react"
import { useEffect, useState } from "react"
// const content = [
//   {
//     id: "1",
//     url: "https://creativereview.imgix.net/content/uploads/2024/12/AlienRomulus-scaled.jpg",
//     name: "No way home"

//   },
//   {
//     id: "2",
//     url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjoP95gLHgXRmQ6mBBS6I8zAewiFCmXYfZpA&s",
//     name: "Bộ phim được nhất"

//   },
//   {
//     id: "3",
//     url: "https://www.tallengestore.com/cdn/shop/products/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_210a9d5c-4bf2-4323-ae52-1f5104039449.jpg",
//     name: "Bộ phim ấn tượng nhất"

//   },
//   {
//     id: "4",
//     url: "https://images.squarespace-cdn.com/content/v1/5acd17597c93273e08da4786/1547847934765-ZOU5KGSHYT6UVL6O5E5J/Shrek+Poster.png",
//     name: "Bộ phim quý nhất"

//   },
//   {
//     id: "5",
//     url: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg",
//     name: "Bộ phim đắt nhất"

//   },
//   {
//     id: "6",
//     url: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/176627/Originals/poster-phim-hoat-hinh-1.jpg",
//     name: "Bộ phim duyệt nhất"

//   },
//   {
//     id: "7",
//     url: "https://upload.wikimedia.org/wikipedia/vi/b/b4/Poster_phim_7_thi_th%E1%BB%83.jpg",
//     name: "Bộ phim duyệt nhất"

//   },
//   {
//     id: "8",
//     url: "https://youthvietnam.vn/wp-content/uploads/2021/06/Poster-phim-quang-cao-co-hieu-qua-khong.jpg",
//     name: "Bộ phim duyệt nhất"

//   },
//   {
//     id: "9",
//     url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
//     name: "Bộ phim duyệt nhất"

//   },
// ]
import { GET_NEW_MOVIES } from "@/graphql/actions/movieActions/getnewmovies.action";
import Loading from "@/components/Loading/Loading";
import { GET_RECOMMENDED_MOVIES } from "@/graphql/actions/movieActions/get_recommended_movies.action";
function HomePage() {

  const [loading, setLoading] = useState(true);

  const resultNewMovies = useQuery(GET_NEW_MOVIES, {
    variables: { limit: 10 },
    fetchPolicy: "no-cache",
  });

  const resultNewMoviesBottom = useQuery(GET_NEW_MOVIES, {
    variables: { limit: 40 },
    fetchPolicy: "no-cache",
  });

  const resultRecommendedMovies = useQuery(GET_RECOMMENDED_MOVIES, {
    variables: { limit: 40 },
    fetchPolicy: "no-cache",
  })

  if (resultNewMovies.data) {
    console.log("movies: ", resultNewMovies.data.getTopNewMovie.movies)
  }

  useEffect(() => {
    if (resultNewMovies.data && resultNewMoviesBottom.data && resultRecommendedMovies.data) {
      setLoading(false);
    }
  }, [resultNewMovies.data, resultNewMoviesBottom.data, resultRecommendedMovies.data])



  if (loading) {
    return (
      <div style={{ marginTop: "80px" }}>
        <Loading />
      </div>
    )
  }

  return (
    <div>

      {/* Slider */}
      {
        resultNewMovies.data ? <HomeSlider movies={resultNewMovies.data.getTopNewMovie.movies} /> : null
      }


      {/* Body */}
      <div className="body--container">
        {/* Continue watching */}
        <div>
          <h2 className="heading">Continue watching</h2>
          <div>
            {/* <MovieSlider movies={content} itemsPerScreen={5} /> */}
          </div>
        </div>

        <div style={{ marginTop: "48px", marginBottom: "48px", padding: "0 12px" }}><Divider /></div>

        {/* recommend movie */}
        <div>
          <h2 className="heading">Recommended</h2>
          <div>
            {/* <MovieSlider movies={content} itemsPerScreen={5} /> */}
            <PagingMovies
              queryParams={
                {
                  type: "", category: "", country: "", year: "", sort: "", page: 0
                }
              }
              meta={
                {
                  page: 0, total: 0, totalPages: 0
                }
              }

              isPaging={false}
              movies={resultRecommendedMovies.data.getRecommendedMovies.movies}
              itemsPerRow={5} />
          </div>
        </div>

        <div style={{ marginTop: "48px", marginBottom: "48px", padding: "0 12px" }}><Divider /></div>

        {/* New movies */}
        {
          resultNewMoviesBottom.data ? (
            <div>
              <h2 className="heading">New movies</h2>
              <div>
                <PagingMovies
                  queryParams={
                    {
                      type: "", category: "", country: "", year: "", sort: "", page: 0
                    }
                  }
                  meta={
                    {
                      page: 0, total: 0, totalPages: 0
                    }
                  }

                  isPaging={false}
                  movies={resultNewMoviesBottom.data.getTopNewMovie.movies}
                  itemsPerRow={5} />
              </div>
            </div>
          ) : null
        }


      </div>
    </div>
  )
}

export default HomePage