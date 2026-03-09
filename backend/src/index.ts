import express from "express"
import cors from "cors"
import {connectDB} from "./config/mongodb"
import {movieRouter} from "./routes/moviesRouter"
import {authRouter} from "./routes/authRouter"
import {authMiddleware} from "./middleware/authMiddleware"
import { IPayload } from "./interfaces/IPayload"
import dotenv from "dotenv"

dotenv.config()

const serverHttp = express()

declare global {
    namespace Express {
        interface Request {
            user?: IPayload
        }
    }
}

serverHttp.use(cors())
serverHttp.use(express.json())

serverHttp.use("/api/movies", authMiddleware, movieRouter)
serverHttp.use("/api/auth", authRouter)

serverHttp.use((req, res) => {
    res.status(404).json({ success: false, error: "el recurso no se encuentra" })
})

const PORT = process.env.PORT

serverHttp.listen(PORT, () => {
    try {
        console.log(`✅ Servidor http en escucha en el puerto http://127.0.0.1:${PORT}`)
        connectDB()
    } catch (error) {
        const err = error as Error
        console.log(err.message)
        process.exit(1)
    }
})