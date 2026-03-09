import {z} from "zod"

const registerValidate = z.object({
    username: z.string().min(1, "username es requerido"),
    email: z.string().email("email inválido"),
    password: z.string().min(4, "la contraseña debe contar al menos con 4 caracteres")
})

const loginValidate = z.object({
    email: z.string().email("email inválido"),
    password: z.string().min(1, "password es requerido")
})

export {registerValidate, loginValidate}
