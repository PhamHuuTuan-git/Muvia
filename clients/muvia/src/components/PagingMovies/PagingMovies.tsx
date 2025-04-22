"use client"
import MovieCard from "../MovieCard/MovieCard";
import "./style.scss";
import { Pagination } from "@heroui/react";
import { useState } from "react";


type Movie = {
    id: string,
    url: string,
    name: string,
    // imdb: string,
    // view: string
}
type Props = {
    movies: Movie[],
    itemsPerRow: number,
    // itemsPerPage: number
}

function PagingMovies({ movies, itemsPerRow }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div>
            <div className="paging-movies--container">
                {
                    movies.map((ele, index) => {
                        return (
                            <div key={index} style={{width:`${100/itemsPerRow}%`, minWidth:`${100/itemsPerRow}%`}}>
                                <MovieCard
                                    id={ele.id}
                                    url={ele.url}
                                    name={ele.name}
                                    slug="heo-an-toi"
                                    imdb='7.6'
                                    view='12' />
                            </div>
                        )
                    })
                }
            </div>

            {/* Paging */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                <Pagination classNames={{
                    item: "bg-black text-white ",
                    cursor: "bg-[#ac1a1a] text-white ",
                    next: "text-white bg-black",
                    prev: "bg-black text-white"
                }}
                    loop showControls page={currentPage} initialPage={1} total={10} onChange={setCurrentPage} />
            </div>
        </div>
    )
}

export default PagingMovies