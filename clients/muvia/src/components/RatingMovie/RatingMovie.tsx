"use client";
import { Avatar, Chip } from '@heroui/react'
import "./style.scss";
import RatingModal from '../RatingModal/RatingModal';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COMMENTS } from '@/graphql/actions/movieActions/get_comments.action';
import Loading from '../Loading/Loading';
type Avatar = {
    url: string,
    imgId: string
}
type UserTagType = {
    userName: string,
    avatar: Avatar,
    content: string,
    type: string,
    date: string
}
type FeedbackType = "perfect" | "good" | "ok" | "bad" | "eargly";

const typeMap: Record<FeedbackType, { color: string; label: string }> = {
    perfect: { color: "success", label: "😍Tuyệt vời" },
    good: { color: "primary", label: "🥰Tốt" },
    ok: { color: "secondary", label: "😊Ổn" },
    bad: { color: "warning", label: "😐Dở" },
    eargly: { color: "danger", label: "🤮Quá tệ" }
};
type ChipColor = "success" | "primary" | "secondary" | "warning" | "danger" 




function UserTag({ userName, avatar, content, type, date }: UserTagType) {
    const getTypeChip = (type: string) => {
        // console.log("type: ", type)
        let color: ChipColor = "success"
        let label
        if (type === "perfect") {
            color = "success"
            label = "😍Tuyệt vời"
        } else if (type === "good") {
            color = "primary"
            label = "🥰Tốt"
        } else if (type === "ok") {
            color = "secondary"
            label = "😊Ổn"
        } else if (type === "bad") {
            color = "warning"
            label = "😐Dở"
        } else if (type === "eargly") {
            color = "danger"
            label = "🤮Quá tệ"
        }
        return {
            color,
            label
        }
    }

    return (
        <div style={{ display: "flex", gap: 12 }}>
            <div>
                <Avatar size="lg" src={`${avatar.url}`} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <p className='text-white text-[0.8rem] font-bold'>{userName}</p>

                    <Chip color={getTypeChip(type).color} >
                        <p className="text-white">{getTypeChip(type).label}</p>
                    </Chip>


                    <p className='text-white text-[0.6rem]'>{date}</p>
                </div>
                <div className='mt-[10px]'>
                    <p style={{ color: "#e4e6eb" }}>{content}</p>
                </div>
            </div>
        </div>
    )
}

type Props = {
    idMovie: string,
    nameMovie: string
}

function RatingMovie({ idMovie, nameMovie }: Props) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const resultComments = useQuery(GET_COMMENTS, {
        variables: { movieId: idMovie },
        fetchPolicy: "no-cache",
    });
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // console.log(resultComments.data);
        if (resultComments.data) {
            setComments(resultComments.data.getComments.comments)
        }
    }, [resultComments.data])
    const openRatingModal = function () {
        setIsOpenModal(true);
    }
    if (resultComments.loading) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h2 className='text-white text-[1.4rem] font-bold'>Đánh giá</h2>
                <p
                    onClick={openRatingModal}
                    style={{ color: "#fff", fontSize: "1rem", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}>Viết đánh giá</p>
            </div>

            {
                comments && comments.length > 0 ?
                    (
                        <div className='list-rating-user--container'>
                            {
                                comments.map((ele: any, index: number) => {
                                    return <UserTag key={index} userName={ele.user.name} avatar={ele.user.avatar} content={ele.content} type={ele.type} date={new Date(ele.date).toLocaleDateString('vi-VN')} />
                                })
                            }
                        </div>
                    )
                    : (
                        <p style={{ color: "#fff", fontWeight: "bold" }}>Chưa có đánh giá cho phim này</p>
                    )
            }


            <RatingModal idMovie={idMovie} nameMovie={nameMovie} isOpen={isOpenModal} openChange={setIsOpenModal} comments={comments} setComments={setComments} />
        </div>
    )
}

export default RatingMovie