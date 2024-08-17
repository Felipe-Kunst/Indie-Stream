import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import styles from "./HeaderTeste.module.css";

function HeaderPublic() {
    const navigate = useNavigate();

    return (
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
    );
}

export default HeaderPublic;
