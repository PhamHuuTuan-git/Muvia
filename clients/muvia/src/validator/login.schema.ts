import { z } from "zod";

const LoginSchema = z
    .object({
        email: z.string().email("Email is not valid"),
        password: z.string().min(8, "Password is at least 8 charactors"),
    })

export default LoginSchema