"use client"
import MovieCard from "../MovieCard/MovieCard";
import "./style.scss";
import { Pagination } from "@heroui/react";
import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Movie = {
    id: string,
    thumb_url: string,
    name: string,
    // imdb: string,
    view: number,
    episode_current: string,
    episode_total: string,
    slug: string,
    [key: string]: any;

}
type QueryParams = {
    type: string,
    category: string,
    country: string,
    year: string,
    sort: string,
    page: number
}
type MetaData = {
    page: number,
    total: number,
    totalPages: number
}
type Props = {
    movies: Movie[],
    itemsPerRow: number,
    // itemsPerPage: number
    queryParams: QueryParams,
    meta: MetaData,
    isPaging: boolean
}

function PagingMovies({ queryParams, movies, itemsPerRow, meta, isPaging }: Props) {
    const [currentPage, setCurrentPage] = useState(queryParams.page);
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams!.toString());
        if (newPage === 1) {
            params.delete("page");
        } else {
            params.set("page", newPage.toString());
        }
        // Gọi hàm set state
        // setCurrentPage(newPage);
        router.push(`${pathname}?${params.toString()}`);
    };
    return (
        <div >
            <div className="paging-movies--container">
                {
                    movies.map((ele, index) => {
                        return (
                            <div key={index} className="item-per-page-paging">
                                <MovieCard
                                    episode_total={ele.episode_total}
                                    episode_current={ele.episode_current}
                                    id={ele.id}
                                    url={ele.thumb_url}
                                    name={ele.name}
                                    slug={ele.slug}
                                    imdb='7.6'
                                    view={ele.view} />
                            </div>
                        )
                    })
                }
            </div>

            {/* Paging */}
            {
                isPaging && <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Pagination classNames={{
                        item: "bg-black text-white ",
                        cursor: "bg-[#ac1a1a] text-white ",
                        next: "text-white bg-black",
                        prev: "bg-black text-white"
                    }}
                        loop showControls page={currentPage} initialPage={1} total={meta.totalPages} onChange={handlePageChange} />
                </div>
            }

        </div>
    )
}

export default PagingMovies