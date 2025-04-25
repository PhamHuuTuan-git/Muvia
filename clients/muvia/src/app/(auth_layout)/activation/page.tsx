"use client";
import "./style.scss";
import { InputOtp } from "@heroui/input-otp";
import { useState } from "react";
import Link from "next/link";
import routing from "@/utils/routing";
import { Button, Spinner, addToast } from "@heroui/react";
import { useMutation } from '@apollo/client';
import { ACTIVATE_USER } from "@/graphql/actions/authenActions/activate.action";


function Activation() {
    const [value, setValue] = useState("");
    const [activateUserMutation, { loading, error, data }] = useMutation(ACTIVATE_USER);
    const [isLoading, setIsLoading] = useState(false);

    const handleActivate = async () => {
       
        const dataActivation = {
            activationToken: localStorage.getItem("activation_token"),
            activationCode: value
        }
        setValue("");
        setIsLoading(true);
        try {
            const response = await activateUserMutation({
                variables: dataActivation
            })
            setIsLoading(false)   
            addToast({
                title: "Success",
                    description: `Activate your account successfully!, Let login`,
                    color: "success",
                    radius: "sm",
            })
        } catch (err: any) {
            setIsLoading(false);
            console.log("error: ", err)
            if (err.networkError) {
                addToast({
                    title: "Error",
                    description: `${err.networkError.message}`,
                    color: "danger",
                    radius: "sm",
                })
            } else {
                addToast({
                    title: "Error",
                    description: `${err.message}`,
                    color: "danger",
                    radius: "sm",
                })
            }
        }
    }
    return (
        <div className="activation--container">
            <div className="activation-otp--container">
                <p style={{ color: "#fff", fontWeight: "bold" }}>Activation account</p>
                <div className="mt-[10px]">
                    <InputOtp size="lg" length={4} value={value} onValueChange={setValue} />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
                    <p style={{ color: "red", fontWeight: "bold", fontSize: "0.6rem" }}>You don't have OTP</p>
                    <button style={{ fontWeight: "bold", fontSize: "0.6rem", padding: "4px", backgroundColor: "#fff", borderRadius: "8px" }}>Resent</button>
                </div>

                <Button
                    onClick={handleActivate}
                    style={{ width: "100%", marginTop: "10px" }} disabled={value.length < 4}>
                    {
                        isLoading ? <Spinner /> : "Submit"
                    }
                </Button>

                <div className="mt-[20px]">
                    <Link style={{ color: "#fff", fontStyle: "italic", textDecoration: "underline" }} href={`${routing.login}`}>Go to Log in</Link>
                </div>
            </div>

        </div>
    )
}

export default Activation