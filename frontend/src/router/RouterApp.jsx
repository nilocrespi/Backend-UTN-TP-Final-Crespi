import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Catalog from "../views/Catalog"
import NotFound from "../views/NotFound"
import About from "../views/About"
import Login from "../views/Login"
import Register from "../views/Register"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    return children
}

const RouterApp = () => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <div>Cargando...</div>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Catalog/>
                    </ProtectedRoute>
                }/>
                <Route path="/about" element={<About/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export {RouterApp}