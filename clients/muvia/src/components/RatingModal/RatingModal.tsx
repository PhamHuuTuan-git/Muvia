"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    Textarea
} from "@heroui/react";
import { useState } from "react";
import "./style.scss";
type Props = {
    idMovie: string,
    isOpen: boolean,
    nameMovie: string,
    openChange: (isOpen: boolean) => void
}
function RatingModal({ idMovie, nameMovie, isOpen, openChange }: Props) {
    const [state, setState] = useState("none");
    const [ratingValue, setRatingValue] = useState("");
    return (
        <>
            <Modal style={{ padding: "20px" }} isOpen={isOpen} size="xl" onOpenChange={openChange} className="modal-rating--container">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Gia tai cua me</ModalHeader>
                            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>

                                <div
                                    onClick={() => setState("perfect")}
                                    className={`modal-rating-item--container ${state === "perfect" && "active"}`}>
                                    <img className="modal-rating--image" src="/imojies/perfect.png" />
                                    <p className="modal-rating-item--text">Tuyệt vời</p>
                                </div>


                                <div
                                    onClick={() => setState("good")}
                                    className={`modal-rating-item--container ${state === "good" && "active"}`}>
                                    <img className="modal-rating--image" src="/imojies/good.png" />
                                    <p className="modal-rating-item--text" >Hay</p>
                                </div>
                                <div
                                    onClick={() => setState("ok")}
                                    className={`modal-rating-item--container ${state === "ok" && "active"}`}>
                                    <img className="modal-rating--image" src="/imojies/ok.png" />
                                    <p className="modal-rating-item--text">Khá</p>
                                </div>
                                <div
                                    onClick={() => setState("bad")}
                                    className={`modal-rating-item--container ${state === "bad" && "active"}`}>
                                    <img className="modal-rating--image" src="/imojies/bad.png" />
                                    <p className="modal-rating-item--text">Dở</p>
                                </div>
                                <div
                                    onClick={() => setState("eargly")}
                                    className={`modal-rating-item--container ${state === "eargly" && "active"}`}>
                                    <img className="modal-rating--image" src="/imojies/eargly.png" />
                                    <p className="modal-rating-item--text">Qúa tệ</p>
                                </div>

                            </div>
                            <div className="mt-[20px]">
                                <Textarea
                                    onChange={(e) => {setRatingValue(e.target.value)}}
                                    value={ratingValue}
                                    isRequired
                                    className="w-full text-white"
                                    labelPlacement="outside"
                                    placeholder="Enter your feeling"
                                />
                            </div>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Gửi
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default RatingModal