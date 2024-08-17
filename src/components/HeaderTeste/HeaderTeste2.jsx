import React from "react";
import Imagemdefundo from "../../assets/ImagemFundo.jpg";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HeaderTeste2.module.css";

function Header() {
    const navigate = useNavigate();

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerPublic}>
                <Link to="/">
                    <img src={Logo} alt="Logo_IndieStream" className={styles.logo} />
                </Link>
                <div className={styles.headerButtons}>
                    <button 
                        className={styles.registerButton} 
                        onClick={() => navigate('/register')}
                    >
                        Registrar
                    </button>
                    <button 
                        className={styles.loginButton} 
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </div>
            </div>
            <div 
                className={styles.headerSection} 
                style={{ backgroundImage: `url(${Imagemdefundo})` }}
            >
                <div className={styles.content}>
                    <h1>Conecte-se ao coração do cinema brasileiro.</h1>
                    <p>
                        Descubra produções, explore perfis profissionais e colabore em projetos independentes. 
                        Junte-se a nós para dar vida às suas ideias e impulsionar sua carreira no mundo cinematográfico.
                    </p>
                    <button 
                        className={styles.juntarSeBtn} 
                        onClick={() => navigate('/login')}
                    >
                        JUNTAR-SE
                    </button>
                </div>
                <div style={{ height: '300px' }}></div>
            </div>
        </div>
    );
}

export default Header;
