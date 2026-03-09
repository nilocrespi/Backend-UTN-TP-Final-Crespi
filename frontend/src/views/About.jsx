import Header from "../components/Header"

const About = () => {
    return (
        <div>
            <Header/>
            <div className="about-container">
                <h2>Acerca de nosotros</h2>
                <p>
                    Esta es una aplicación de gestión de películas desarrollada con React y Express.
                    Permite a los usuarios autenticados crear, actualizar, eliminar y filtrar películas.
                </p>
                <h3>Características:</h3>
                <ul>
                    <li>Autenticación de usuarios (Login/Register)</li>
                    <li>CRUD completo de películas</li>
                    <li>Filtrado avanzado por título, género, año y rating</li>
                    <li>Interfaz moderna y responsiva</li>
                </ul>
                <h3>Tecnologías utilizadas:</h3>
                <ul>
                    <li>Frontend: React, React Router, Vite</li>
                    <li>Backend: Node.js, Express, MongoDB</li>
                    <li>Autenticación: JWT</li>
                </ul>
            </div>
        </div>
    )
}

export default About