import { useRef, useState } from 'react'


import './style.scss';
import ChefronLeft from '../icons/ChefronLeft';
import ChefronRight from '../icons/ChefronRight';
import EyeSolidIcon from '../icons/EyeSolidIcon';
import { Button } from '@heroui/react';

const content = [
    {
        id: "1",
        url: "https://i.pinimg.com/736x/07/02/8a/07028ae512d4c933967a6fb07638a427.jpg",
        content: "No way home"

    },
    {
        id: "2",
        url: "https://i.pinimg.com/736x/00/b8/98/00b89824163b32ae590e6f160aaaddc8.jpg",
        content: "Bộ phim được nhất"

    },
    {
        id: "3",
        url: "https://i.pinimg.com/736x/64/0e/e7/640ee73c71f21ddd638e49834ff9801d.jpg",
        content: "Bộ phim ấn tượng nhất"

    },
    {
        id: "4",
        url: "https://i.pinimg.com/736x/6f/b9/ae/6fb9ae7a0ae4e30cdfb3bebbd31ad8f8.jpg",
        content: "Bộ phim quý nhất"

    },
    {
        id: "5",
        url: "https://i.pinimg.com/736x/6f/b9/ae/6fb9ae7a0ae4e30cdfb3bebbd31ad8f8.jpg",
        content: "Bộ phim đắt nhất"

    },
    {
        id: "6",
        url: "https://i.pinimg.com/736x/6f/b9/ae/6fb9ae7a0ae4e30cdfb3bebbd31ad8f8.jpg",
        content: "Bộ phim duyệt nhất"

    },
    {
        id: "7",
        url: "https://i.pinimg.com/736x/6f/b9/ae/6fb9ae7a0ae4e30cdfb3bebbd31ad8f8.jpg",
        content: "Bộ phim duyệt nhất"

    },
    {
        id: "8",
        url: "https://i.pinimg.com/736x/6f/b9/ae/6fb9ae7a0ae4e30cdfb3bebbd31ad8f8.jpg",
        content: "Bộ phim duyệt nhất"

    },
    {
        id: "9",
        url: "https://i.pinimg.com/736x/6f/b9/ae/6fb9ae7a0ae4e30cdfb3bebbd31ad8f8.jpg",
        content: "Bộ phim duyệt nhất"

    },
]
import { gql, DocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client";

export const REFRESH_TOKEN: DocumentNode = gql`
mutation RefreshToken {
    refreshToken {
        accessToken
    }
}
`

export const TEST:  DocumentNode = gql`
mutation Test(
    $id: String!
) {
    test (
        id: $id
    )
}
`

const itemsPerPage = 4
function HomeSlider() {
    const [slideSelected, setSlideSelected] = useState(0);
    const totalPagesRef = useRef(Math.ceil(content.length / itemsPerPage));
    const [pageSelected, setPageSelected] = useState(0);
    const slidersContainer = useRef<HTMLDivElement>(null);
    const [RefreshTokenrMutation, { loading, error, data }] = useMutation(TEST);
    const handleWatchNow = async () => {
        try {
            const response = await RefreshTokenrMutation({
                variables: {
                    id: "680b5b4e4ca6c36f70e8b284"
                }
            });
            console.log("data: ", response)
        }catch(err: any) {
            console.log(err.message)
        }
    }

    const changeSpecifiedPage = (index: number) => {
        setPageSelected(index);
        if (slidersContainer.current) {
            Object.assign(slidersContainer.current.style, {
                transform: `translateX(-${index * 100}%)`,
                transition: 'transform 0.3s ease'
            });
        }
    }

    const changeCurrentSlide = (index: number) => {
        setSlideSelected(index);
    }

    const handlePrev = () => {
        let newpage;
        if (pageSelected === 0) {
            newpage = totalPagesRef.current - 1;

        } else {
            newpage = pageSelected - 1;

        }
        setPageSelected(newpage);
        if (slidersContainer.current) {
            Object.assign(slidersContainer.current.style, {
                transform: `translateX(-${newpage * 100}%)`,
                transition: 'transform 0.3s ease'
            });
        }
    }
    const handleNext = () => {
        let newpage;
        if (pageSelected === totalPagesRef.current - 1) {
            newpage = 0;
        } else {
            newpage = pageSelected + 1

        }
        setPageSelected(newpage);
        if (slidersContainer.current) {
            Object.assign(slidersContainer.current.style, {
                transform: `translateX(-${newpage * 100}%)`,
                transition: 'transform 0.3s ease'
            });
        }
    }

    return (
        <div className='slider--container'>

            {/* background */}
            <div style={{ overflow: "hidden", width: "100%", height: "100%", position: "absolute" }}>
                {
                    content.map((ele, index) => {
                        return (
                            <div key={index} className={`image ${index === slideSelected ? "active" : null}`}>
                                <img style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    src={ele.url} />
                                <div className='context--container'>
                                    <p className='movie--context--main'>TNN MOVIE</p>
                                    <p className='movie--context mt-[20px]'>{ele.content}</p>
                                    <p className='movie--context-sub mt-[10px]'>Bộ phim kể về gia cảnh 1 chú mèo nhỏ bị nhốt trong chuồng, sau đó được 1 người đàn ông tốt bụng giúp đỡ, sau đó họ trở thành bạn tốt</p>
                                    <div className='mt-[10px] flex gap-[32px]'>
                                        <div className='flex gap-[8px]'>
                                            <img src='/imdb-logo.png' className='w-[40px]' />
                                            <p className='text-white'>7.2</p>
                                        </div>
                                        <div className='flex gap-[8px]'>
                                            <EyeSolidIcon className='text-white size-6' />
                                            <p className='text-white'>7.2</p>
                                        </div>
                                    </div>
                                    <div className='mt-[40px]'>
                                        <Button
                                            onClick={handleWatchNow}
                                            className='w-[150px] h-[50px] bg-[#a94242] text-white font-bold p-[10px]'>Watch now</Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* slider */}
            <div className='sub-slider--container'>
                <div ref={slidersContainer} className='sliders--container'>
                    {
                        content.map((ele, index) => {
                            return (
                                <div onClick={() => changeCurrentSlide(index)} className='slider--item ' key={index}>
                                    <div className={`image--container ${slideSelected === index && "active"}`}>
                                        <img className={`slider-image--item ${slideSelected !== index && "can"}`} src={`${ele.url}`} />
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
                {/* Dots */}
                <div className='dots--container'>
                    {
                        Array.from({ length: totalPagesRef.current }).map((ele, index) => {
                            return <div
                                onClick={() => changeSpecifiedPage(index)}
                                style={{ cursor: "pointer" }} key={index}
                                className={`dot--item ${pageSelected === index ? "active" : null}`}></div>
                        })

                    }
                </div>

                {/* Arrow left*/}
                <div className='arrow--container left' onClick={handlePrev}>
                    <ChefronLeft className='text-white size-6' />
                </div>
                {/* Arrow Right*/}
                <div className='arrow--container right' onClick={handleNext}>
                    <ChefronRight className='text-white size-6' />
                </div>
            </div>



        </div>
    )
}

export default HomeSlider