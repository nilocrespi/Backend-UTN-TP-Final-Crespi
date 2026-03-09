import {Link, useNavigate} from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {isAuthenticated ? (
                        <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            <h1>Lista de películas</h1>
        </header>
    )
}

export default Header