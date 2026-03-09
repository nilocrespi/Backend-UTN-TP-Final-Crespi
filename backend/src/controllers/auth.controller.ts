import {User} from "../models/user.model"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {Request, Response} from "express"
import {IPayload} from "../interfaces/IPayload"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error ("Debe ingresar credenciales jwt")
}

const register = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const {email, password, username} = body

        // implementar validaciones de imput con ZOD
        if (!email || !password || !username) {
            return res.status(400).json ({success: false, error: "data invalida, revisa los datos ingresados"})
        }

        if (!email.includes("@") || !email.endsWith(".com")) {
            return res.status(400).json ({success: false, error: "correo electronico invalido"})
        }

        if (password.length < 4) {
            return res.status(400).json ({success: false, error: "la contraseña debe contar al menos con 4 caracteres"})
        }

        const foundUser = await User.findOne ({email})

        if (foundUser) {
            return res.status(400).json({success: false, error: "email ya existente en base de datos"})
        }

        const hash = await bcryptjs.hash (password,10)

        const newDataUser = {
            username: username,
            email: email,
            password: hash
        }

        const newUser = await User.create(newDataUser)

        res.status(201).json ({success: true, data: {_id: newUser._id, username: newUser.username, email: newUser.email}})
    } catch (error) {
        const err = error as Error
        res.status(500).json({success: false, error: err.message})
    }        
}

const login = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const {email, password} = body

        if (!email || !password) {
            return res.status(400).json({success: false, error: "data invalida, ingrese los datos requeridos"})
        }

        const foundUser = await User.findOne({email})

        if (!foundUser) {
            return res.status(401).json({success: false, error: "desautorizado"})
        }
        
        const validatePassword = await bcryptjs.compare(password, foundUser.password)

        if (!validatePassword) {
            return res.status(401).json({success:false, error: "desautorizado"})
        }

        const payload: IPayload = {_id: foundUser._id, username: foundUser.username, email: foundUser.email}
        
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
        
        res.json({success: true, data: token})
    } catch (error) {
        const err = error as Error
        res.status(500).json({ success: false, error: err.message })
    }
}

export {register, login}