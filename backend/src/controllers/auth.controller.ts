import {User} from "../models/user.model"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {Request, Response} from "express"
import {IPayload} from "../interfaces/IPayload"
import {registerValidate, loginValidate} from "../validators/authValidator"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error ("Debe ingresar credenciales jwt")
}

const register = async (req: Request, res: Response) => {
    try {
        const body = req.body

        const validate = registerValidate.safeParse(body)

        if (!validate.success) {
            return res.status(400).json({success: false, error: validate.error.flatten().fieldErrors})
        }

        const {email, password, username} = body

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

        const validate = loginValidate.safeParse(body)

        if (!validate.success) {
            return res.status(400).json({success: false, error: validate.error.flatten().fieldErrors})
        }

        const {email, password} = body

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