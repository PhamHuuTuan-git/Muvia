"use client";
import { Avatar, Chip } from '@heroui/react'
import "./style.scss";
import RatingModal from '../RatingModal/RatingModal';
import { useState } from 'react';

function UserTag() {
    
    return (
        <div style={{ display: "flex", gap: 12 }}>
            <div>
                <Avatar size="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <p className='text-white text-[0.8rem] font-bold'> Pham Huu Tuan</p>
                    <Chip color="primary">
                        <p className='text-white'>😍Tuyệt vời</p>
                    </Chip>
                    <p className='text-white text-[0.6rem]'>24/11/2003</p>
                </div>
                <div className='mt-[10px]'>
                    <p style={{ color: "#e4e6eb" }}>Trời ơi phim hay lắm luôn đó</p>
                </div>
            </div>
        </div>
    )
}

function RatingMovie() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const openRatingModal = function () {
        setIsOpenModal(true);
    }
    return (
        <div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <h2 className='text-white text-[1.4rem] font-bold'>Đánh giá</h2>
                <p
                    onClick={openRatingModal} 
                style={{color:"#fff", fontSize:"1rem", fontWeight:"bold", cursor:"pointer", textDecoration:"underline"}}>Viết đánh giá</p>
            </div>
            <div className='list-rating-user--container'>
                <UserTag />
                <UserTag />
                <UserTag />
                <UserTag />
                <UserTag />
                <UserTag />
                <UserTag />
                <UserTag />
                <UserTag />
                <UserTag />
            </div>

            <RatingModal idMovie='123' nameMovie='ahihi' isOpen={isOpenModal} openChange={setIsOpenModal}/>
        </div>
    )
}

export default RatingMovie