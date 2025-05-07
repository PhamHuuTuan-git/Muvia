"use client";
import PagingMovies from "@/components/PagingMovies/PagingMovies"
import { Pagination } from "@heroui/react"
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { notFound } from "next/navigation";
import { useQuery } from "@apollo/client";
import { FIND_MOVIES } from "@/graphql/actions/movieActions/finding_movies.action";
import MovieCard from "@/components/MovieCard/MovieCard";
import Loading from "@/components/Loading/Loading";
function FindingPage({ queryParams }: {
    queryParams: {
        content: string,
        page: number
    }

}) {

    const [currentPage, setCurrentPage] = useState(queryParams.page);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const ref_movies = useRef([]);
    const meta_data = useRef({
        totalPages: 0,
        total: 0,
        page: 1
    });
    // console.log("content: ", queryParams.content);
    // console.log("page: ", queryParams.page)
    const movies = useQuery(FIND_MOVIES, {
        variables: {
            content: queryParams.content,
            query: {
                page: queryParams.page,
                limit: 40
            }
        },
        fetchPolicy: "no-cache",
    });
    // console.log("movies: ", movies)
    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams!.toString());
        if (queryParams.content === "") {
            notFound()
        }
        // params.set("content", queryParams.content);
        if (newPage === 1) {
            params.delete("page");
        } else {
            params.set("page", newPage.toString());
        }
        router.push(`${pathname}?${params.toString()}`);
    };
    useEffect(() => {
        if (queryParams.content === "") {
            notFound()
        }
    }, [])

    if (movies.data) {
        ref_movies.current = movies.data.getMoviesWithName.movies;
        meta_data.current = movies.data.getMoviesWithName.meta;
    }



    if (movies.loading) {
        return (
            <div style={{ marginTop: "80px" }}>
                <Loading />
            </div>
        )
    }
    return (
        <div style={{ marginTop: "80px" }}>
            <p style={{color:"#fff", fontWeight:"bold", fontSize:"1.2rem", marginLeft:"12px"}}>Kết quả tìm được: {meta_data.current.total}</p>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-start" }}>
                {
                    ref_movies.current.length > 0 && (
                        ref_movies.current.map((movie: any, index: number) => {
                            return (
                                <div key={index} style={{ width: "20%", minWidth: "20%" }}>
                                    <MovieCard
                                        id={movie.id}
                                        url={movie.thumb_url}
                                        slug={movie.slug}
                                        name={movie.name}
                                        imdb={movie.imdb}
                                        view={movie.view}
                                        episode_current={movie.episode_current}
                                        episode_total={movie.episode_total}
                                    />
                                </div>

                            )
                        })
                    )
                }
            </div>
            {
                meta_data.current.totalPages > 0 && <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Pagination classNames={{
                        item: "bg-black text-white ",
                        cursor: "bg-[#ac1a1a] text-white ",
                        next: "text-white bg-black",
                        prev: "bg-black text-white"
                    }}
                        loop showControls
                        page={currentPage} initialPage={1} total={meta_data.current.totalPages} onChange={handlePageChange} />
                </div>
            }

        </div>
    )
}

export default FindingPage