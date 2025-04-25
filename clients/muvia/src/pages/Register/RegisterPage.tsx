"use client";
import Link from "next/link";
import "./style.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RegisterSchema from "@/validator/register.schema";
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from "@/graphql/actions/authenActions/register.action";
import { Spinner, addToast } from "@heroui/react";
import { useRouter } from "next/navigation"
import routing from "@/utils/routing";

type FormData = z.infer<typeof RegisterSchema>;

function RegisterPage() {
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowRePass, setisShowRePass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
  });
  const [regiserUserMutation, { loading, error, data }] = useMutation(REGISTER_USER);

  const onSubmit = async (dataUser: FormData) => {
    try {
      setIsLoading(true);
      const response = await regiserUserMutation({
        variables: dataUser
      })
      setIsLoading(false)
      // console.log("data: ", response.data);
      addToast({
        title: "Success",
        description: `Sign up successfully, you need check your email to get code`,
        color: "success",
        radius: "sm",
      })
      const activation_token = response.data.register.activation_token;
      // console.log("activation token: ", activation_token);
      localStorage.setItem("activation_token", activation_token);
      router.push(`${routing.activation}`);
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
  };

  return (
    <div className="register--container">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <p style={{ fontWeight: "bold", fontSize: "2rem", marginTop: "30px", color: "#fff" }}>Sign up <span className="register--logoname">TnN Movie</span></p>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px", gap: "12px" }}>
          <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", maxWidth: "300px" }}>
            <input
              {...register("email")}
              value={email} onChange={(e) => setEmail(e.target.value)} className="input-signup" placeholder="Enter your email" aria-label="Email" />
            {errors.email && <p className="error-register--text">{errors.email.message}</p>}
          </div>
          <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", maxWidth: "300px" }}>
            <input
              {...register("name")}
              value={name} onChange={(e) => setName(e.target.value)} className="input-signup" placeholder="Enter your user name" aria-label="Name" />
            {errors.name && <p className="error-register--text">{errors.name.message}</p>}
          </div>
          <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", maxWidth: "300px", position: "relative" }}>
            <input
              {...register("password")}
              value={pass} onChange={(e) => setPass(e.target.value)} className="input-signup" placeholder="Enter your password" type={isShowPass ? "text" : "password"} aria-label="Password" />
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
            {errors.password && <p className="error-register--text">{errors.password.message}</p>}
          </div>

          <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", maxWidth: "300px", position: "relative" }}>
            <input
              {...register("rePassword")}
              value={rePass} onChange={(e) => setRePass(e.target.value)} className="input-signup" placeholder="Re-enter password" type={isShowRePass ? "text" : "password"} aria-label="Re-Password" />
            {
              !isShowRePass ? (
                <svg
                  onClick={() => setisShowRePass(true)}
                  style={{ cursor: "pointer", position: "absolute", right: "-8px", top: "50%", transform: "translateY(-50%)" }}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              ) : (
                <svg
                  onClick={() => setisShowRePass(false)}
                  style={{ cursor: "pointer", position: "absolute", right: "-8px", top: "50%", transform: "translateY(-50%)" }}
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

              )
            }
            {errors.rePassword && <p className="error-register--text">{errors.rePassword.message}</p>}
          </div>
          <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", maxWidth: "300px" }}>
            <button type="submit" className="signup--button">Sign up</button>
          </div>
        </div>
        {/* Divider */}
        <p style={{ padding: "0 8px", marginTop: "20px", color: "#fff" }}>Or</p>

        <div className="mt-[10px] w-full px-[20px] flex justify-center">
          <div style={{ maxWidth: "300px", display: "flex", width: "300px", padding: "0 20px" }}>
            <button style={{ display: "flex", justifyContent: "center", padding: "10px", gap: 4, alignItems: "center", backgroundColor: "#fff", borderRadius: "8px", width: "100%" }} >
              <img style={{ width: "20px" }} src="/google_logo.png" />
              Continue with Google
            </button>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "10px" }}>
          <p className="text-white">Already have account?</p>
          <Link style={{ color: "#000", fontStyle: "italic", textDecoration: "underline" }} href={"/login"}>Log in</Link>
        </div>

      </form >
      {
        isLoading && (
          <div className="loading--register">
            <Spinner variant="gradient" />
          </div>
        )
      }
    </div>
  )
}

export default RegisterPage