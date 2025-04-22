import MoviesFilter from '@/components/MoviesFilter/MoviesFilter'
import MovieSort from '@/components/MovieSort/MovieSort'
import PagingMovies from '@/components/PagingMovies/PagingMovies'
import React from 'react'
const content = [
  {
    id: "1",
    url: "https://creativereview.imgix.net/content/uploads/2024/12/AlienRomulus-scaled.jpg",
    name: "No way home"

  },
  {
    id: "2",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjoP95gLHgXRmQ6mBBS6I8zAewiFCmXYfZpA&s",
    name: "Bộ phim được nhất"

  },
  {
    id: "3",
    url: "https://www.tallengestore.com/cdn/shop/products/Art_Poster_-_Sicario_-_Tallenge_Hollywood_Collection_210a9d5c-4bf2-4323-ae52-1f5104039449.jpg",
    name: "Bộ phim ấn tượng nhất"

  },
  {
    id: "4",
    url: "https://images.squarespace-cdn.com/content/v1/5acd17597c93273e08da4786/1547847934765-ZOU5KGSHYT6UVL6O5E5J/Shrek+Poster.png",
    name: "Bộ phim quý nhất"

  },
  {
    id: "5",
    url: "https://congthanh.vn/uploads/images/in-poster-phim-anh-dep-.jpg",
    name: "Bộ phim đắt nhất"

  },
  {
    id: "6",
    url: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/176627/Originals/poster-phim-hoat-hinh-1.jpg",
    name: "Bộ phim duyệt nhất"

  },
  {
    id: "7",
    url: "https://upload.wikimedia.org/wikipedia/vi/b/b4/Poster_phim_7_thi_th%E1%BB%83.jpg",
    name: "Bộ phim duyệt nhất"

  },
  {
    id: "8",
    url: "https://youthvietnam.vn/wp-content/uploads/2021/06/Poster-phim-quang-cao-co-hieu-qua-khong.jpg",
    name: "Bộ phim duyệt nhất"

  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
  {
    id: "9",
    url: "https://i.pinimg.com/736x/ec/9e/5e/ec9e5e38d21ff3cef93ae1b90275e6bc.jpg",
    name: "Bộ phim duyệt nhất"
  },
]
function MoviesPage() {
  return (
    <div>
      <MoviesFilter />
      <MovieSort />
      <div>
        <PagingMovies movies={content} itemsPerRow={5} />
      </div>
    </div>
  )
}

export default MoviesPage