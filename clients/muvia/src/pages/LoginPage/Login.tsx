"use client";
import Link from "next/link";
import "./style.scss";
import { useState } from "react";
import routing from "@/utils/routing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoginSchema from "@/validator/login.schema";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/actions/authenActions/login.action";
import { Spinner, addToast } from "@heroui/react";
type FormData = z.infer<typeof LoginSchema>;

function Login() {
    const [isShowPass, setIsShowPass] = useState(false);
    const [loginUserMutation, { loading, error, data }] = useMutation(LOGIN_USER);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (loginData: FormData) => {
        try {
            setIsLoading(true);
            const response = await loginUserMutation({
                variables: loginData
            })
            setIsLoading(false); 
            addToast({
                title: "Success",
                description: `Login successfully`,
                color: "success",
                radius: "sm",
              })
              const accessToken = response.data.login.accessToken;
              localStorage.setItem("access_token", accessToken);
        } catch (err: any) {
            setIsLoading(false)
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
        <div className="login--container">
            <div className="main-login--container">
                <div className="login-wallpaper">
                    <img className="wallpaper-login" src="wallpaper.jpg" />
                </div>
                <div className="login-form--container">
                    <div >
                        <p className="logo-login--text">TnN Movie</p>
                    </div>
                    <div>
                        <p className="welcome-login--text">Log in</p>
                    </div>
                    <form className="mt-[40px] w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px" }}>
                            <input {...register("email")} className="input-login" placeholder="Enter your email" />
                            {errors.email && <p className="error-login--text">{errors.email.message}</p>}
                        </div>
                        <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", marginTop: "10px", position: "relative" }}>
                            <input {...register("password")} className="input-login" placeholder="Enter your password" type={isShowPass ? "text" : "password"} />

                            {errors.password && <p className="error-login--text">{errors.password.message}</p>}
                            {
                                !isShowPass ? (
                                    <svg
                                        onClick={() => setIsShowPass(true)}
                                        style={{ cursor: "pointer", position: "absolute", right: "-8px", top: "50%", transform: "translateY(-50%)" }}
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                ) : (
                                    <svg
                                        onClick={() => setIsShowPass(false)}
                                        style={{ cursor: "pointer", position: "absolute", right: "-8px", top: "50%", transform: "translateY(-50%)" }}
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>

                                )
                            }

                        </div>
                        <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", marginTop: "15px" }}>
                            <button
                                disabled={isLoading}
                                className="login--button" type="submit">
                                {
                                    isLoading ? <Spinner size="sm" /> : "Log in"
                                }
                            </button>
                        </div>
                    </form>
                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", width: "100%", position: "relative", marginTop: "40px", padding: "0 20px" }}>
                        <hr style={{ flex: 1, width: "100%" }} />
                        <p style={{ padding: "0 8px", position: "absolute", left: "50%", transform: "translate(-50%)", backgroundColor: "#2a2a2a", color: "#fff" }}>Or</p>
                    </div>

                    <div className="mt-[40px] w-full px-[20px]">
                        <div className="w-full">
                            <button
                                disabled={isLoading}
                                style={{ display: "flex", padding: "10px", gap: 4,justifyContent:"center", alignItems: "center", backgroundColor: "#fff", borderRadius: "8px", width: "100%" }} >
                                <img style={{ width: "20px" }} src="/google_logo.png" />
                                {
                                    isLoading ? <Spinner size="sm" /> : "Continue with Google"
                                }

                            </button>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "20px" }}>
                        <p className="text-white">Don't have account?</p>
                        <Link style={{ color: "#ac1a1a", fontStyle: "italic", textDecoration: "underline" }} href={`${routing.register}`}>Sign up</Link>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "20px" }}>
                        <Link style={{ color: "#ac1a1a", fontStyle: "italic", textDecoration: "underline" }} href={`${routing.activation}`}>Activate your account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login