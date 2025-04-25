import { z } from "zod";

const RegisterSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Email is not valid"),
        password: z.string().min(8, "Password is at least 8 charactors"),
        rePassword: z.string().min(8, "Confirm password is at least 8 charactor")
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Confirm password has to match with Password",
        path: ["rePassword"], // lỗi hiển thị ở trường `rePassword`
    });

export default RegisterSchema