import PlayIcon from "@/components/icons/PlayIcon";
import "./style.scss";
import { Tabs, Tab, Card, CardBody, addToast } from "@heroui/react";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";
function TabMovie({ movie }: { movie: any }) {
    const pathname = usePathname();
    const router = useRouter();
    const redirectWatching = (ele: any) => {
        const slug = ele.slug;
        if (!slug || slug === "") {
            addToast({
                title: "Cảnh báo",
                description: "Phim chưa sẵn sàng",
                color: "danger"
            })
        }
        else {

            router.push(`${pathname}/watch/tap-${slug}`)
        }
        }
        return (
            <>
                <Tabs className="" key="light" variant="light" aria-label="Options">
                    <Tab key="movie" title="Tập phim">
                        <Card className="movie-tab-body--container">
                            <CardBody>
                                <div className="flex gap-4">
                                    <div
                                        style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4px", border: "solid 1px #fed875", borderRadius: "6px" }}>
                                        <p className="text-[0.6rem]" style={{ color: "#fed875" }}>{movie.quality}</p>
                                    </div>
                                    <div
                                        style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4px", border: "solid 1px #fff", borderRadius: "6px" }}>
                                        <p className="text-[0.6rem]">{movie.lang}</p>
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 8, marginTop: "30px" }}>
                                    {
                                        movie.episodes[0].server_data.map((ele: any, index: number) => {
                                            return (
                                                <div onClick={() => redirectWatching(ele)} key={index} style={{
                                                    backgroundColor: "#282b3a", minWidth: "100px", display: "flex", justifyContent: "center", alignItems: "center",
                                                    padding: "20px 0", marginRight: "10px", marginTop: "10px", borderRadius: "10px", cursor: "pointer"
                                                }}>
                                                    <PlayIcon />
                                                    <p>Tập {ele.name}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>
                    {/* Trailer */}
                    {
                        movie.trailer_url && movie.trailer_url !== "" && (
                            <Tab key="trailer" title="Trailer">
                                <Card className="movie-tab-body--container">
                                    <CardBody >
                                        <div style={{ width: "100%", aspectRatio: "16/9" }}>
                                            <iframe

                                                width="100%" height="100%"
                                                src={`${movie.trailer_url}`}
                                                title="YouTube video player"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen></iframe>

                                        </div>
                                    </CardBody>
                                </Card>
                            </Tab>
                        )
                    }

                </Tabs>
            </>
        )
    }

    export default TabMovie