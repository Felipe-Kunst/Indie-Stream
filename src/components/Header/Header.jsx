import React from "react";
import Imagemdefundo from "../../assets/ImagemFundo.jpg";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; 

function Header() {
    const navigate = useNavigate();
    
    return (
        <div className="header-container">
            <div className="header-public">
                <Link to="/"> 
                    <img src={Logo} alt="Logo_IndieStream" className="logo" /> 
                </Link>
                <div className="header-buttons">
                    <button 
                        className="register-button" 
                        onClick={() => navigate('/register')}
                    >
                        Registrar
                    </button>
                    <button 
                        className="login-button" 
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </div>
            </div>
            <div className="header-section" style={{ backgroundImage: `url(${Imagemdefundo})` }}>
                <div className="content">
                    <h1>Conecte-se ao coração do cinema brasileiro.</h1>
                    <p>Descubra produções, explore perfis profissionais e colabore em projetos independentes. Junte-se a nós para dar vida às suas ideias e impulsionar sua carreira no mundo cinematográfico.</p>
                    <button 
                        className="juntar-se-btn" 
                        onClick={() => navigate('/login')}
                    >
                        JUNTAR-SE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
