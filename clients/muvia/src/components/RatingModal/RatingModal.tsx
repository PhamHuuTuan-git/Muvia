"use client";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    Textarea,
    addToast
} from "@heroui/react";
import { useEffect, useState } from "react";
import "./style.scss";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "@/graphql/actions/movieActions/create_comment.action";
import { useSelector } from 'react-redux';
import { authenSelectorUser } from '@/redux-toolkit/selector';
type Avatar = {
    url: string,
    imgId: string
}
type UserComment = {
    id: string
    name: string
    avatar: Avatar
}
type CommentType = {
    id: string,
    type: string,
    conent: string,
    userId: string,
    movieId: string,
    user: UserComment
}

type Props = {
    idMovie: string,
    isOpen: boolean,
    nameMovie: string,
    openChange: (isOpen: boolean) => void,
    comments: CommentType[],
    setComments: any
}
function RatingModal({ idMovie, nameMovie, isOpen, openChange, comments, setComments }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState("none");
    const [ratingValue, setRatingValue] = useState("");
    const userAuthen = useSelector(authenSelectorUser);
    const [createCommentMutation, { loading, error, data }] = useMutation(CREATE_COMMENT);
    useEffect(() => {

        setState("none")
        setRatingValue("")

    }, [isOpen])
    const handleSendComment = async () => {
        if (state === "none" || state === "") {
            addToast({
                title: "Error",
                description: "Vui lòng đánh dấu trạng thái",
                color: "danger",
                radius: "sm",
            })
            return;
        }
        if (ratingValue === "") {
            addToast({
                title: "Error",
                description: "Vui lòng điền nội dung",
                color: "danger",
                radius: "sm",
            })
            return;
        }
        if (userAuthen) {
            try {
                setIsLoading(true);
                const response = await createCommentMutation({
                    variables: {
                        id: userAuthen.id,
                        comment: {
                            type: state,
                            content: ratingValue,
                            userId: userAuthen.id,
                            movieId: idMovie
                        }
                    }
                })
                // console.log("new comments: ", response)
                setState("none")
                setRatingValue("")
                setIsLoading(false)
                addToast({
                    title: "Success",
                    description: `Comment successfully`,
                    color: "success",
                    radius: "sm",
                })
                const new_comment = {
                    ...response.data.addComment.comment,
                    date: Date.now()
                }
                const new_comments = [...comments,new_comment]  
                setComments(new_comments);
                openChange(false);
               
            } catch (err: any) {
                setIsLoading(false);

                // console.log(err);
                addToast({
                    title: "Error",
                    description: `${err.message}`,
                    color: "danger",
                    radius: "sm",
                })

            }
        } else {
            addToast({
                title: "Error",
                description: `Đăng nhập để sử dụng tính năng`,
                color: "danger",
                radius: "sm",
            })
        }

    }
    return (
        <>
            <Modal style={{ padding: "20px" }} isOpen={isOpen} size="xl" onOpenChange={!isLoading ? openChange : undefined} className="modal-rating--container">
                <ModalContent>
                    {
                        userAuthen !== null ? 
                        (onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">{nameMovie}</ModalHeader>
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
                                        disabled={isLoading}
                                        onChange={(e) => { setRatingValue(e.target.value) }}
                                        value={ratingValue}
                                        isRequired
                                        className="w-full text-white"
                                        labelPlacement="outside"
                                        placeholder="Enter your feeling"
                                    />
                                </div>
                                <ModalFooter>
                                    <Button disabled={isLoading} color="danger" variant="light" onPress={onClose}>
                                        Đóng
                                    </Button>
                                    <Button disabled={isLoading} color="primary" onClick={handleSendComment}>
                                        Gửi
                                    </Button>
                                </ModalFooter>
                            </>
                        ) 
                        :  <p style={{ color: "#fff", fontWeight: "bold" }}>Cần đăng nhập để thực hiện</p>
                    }
                </ModalContent>
            </Modal>
        </>
    );
}

export default RatingModal