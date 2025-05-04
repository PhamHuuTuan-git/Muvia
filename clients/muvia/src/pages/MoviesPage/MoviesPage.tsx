import MoviesFilter from '@/components/MoviesFilter/MoviesFilter'
import MovieSort from '@/components/MovieSort/MovieSort'
import PagingMovies from '@/components/PagingMovies/PagingMovies'
import React from 'react'

function MoviesPage() {
  return (
    <div style={{marginTop:"80px"}}>
      <MoviesFilter />
      <MovieSort />
      <div>
        {/* <PagingMovies movies={content} itemsPerRow={5} /> */}
      </div>
    </div>
  )
}

export default MoviesPage