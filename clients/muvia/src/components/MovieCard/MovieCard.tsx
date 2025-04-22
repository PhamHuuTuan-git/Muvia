"use client"
import "./style.scss";
import EyeSolidIcon from "../icons/EyeSolidIcon";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation"
import routing from "@/utils/routing";
type Props = {
    id: string,
    url: string,
    slug: string
    name: string,
    imdb: string,
    view: string
}
function MovieCard(props: Props) {
    const router = useRouter();
    const handleDirect = () => {
        router.push(`${routing.movies}/${props.slug}`)
    }
    return (
        <div className="card--container">
            <div className="card-content--container">
                <div className="card-content--state">
                    full 17/17 vietsub
                </div>
                <div className="p-[0px] h-[100%] rounded-xl overflow-hidden">
                    <img src={`${props.url}`} className="image-card" />
                </div>
                <div className="card-context--container">
                    <p className="font-bold text-[1.2rem]">{props.name}</p>
                    <div className='mt-[10px] flex gap-[32px] justify-center'>
                        <div className='flex gap-[8px]'>
                            <img src='/imdb-logo.png' className='w-[40px]' />
                            <p className='text-white'>7.2</p>
                        </div>
                        <div className='flex gap-[8px]'>
                            <EyeSolidIcon className='text-white size-6' />
                            <p className='text-white'>7.2</p>
                        </div>
                    </div>
                    <Button onClick={handleDirect} className="card-detail--button">Detail</Button>
                </div>

            </div>
        </div>
    )
}

export default MovieCard