import React from "react";
import { useNavigate } from "react-router-dom";
import Imagemdefundo from "../../assets/images.jpeg";
import styles from "./imagemFundo.module.css";

function HeaderSection() {
    const navigate = useNavigate();

    return (
        
        <div className={styles.headerSection} style={{ backgroundImage: `url(${Imagemdefundo})` }}>
            <div className={styles.content}>
                <h1>Conecte-se ao coração do cinema brasileiro.</h1>
                <p>Descubra produções, explore perfis profissionais e colabore em projetos independentes. Junte-se a nós para dar vida às suas ideias e impulsionar sua carreira no mundo cinematográfico.</p>
                <button 
                    className={styles.juntarSeBtn} 
                    onClick={() => navigate('/login')}
                >
                    JUNTAR-SE
                </button>
            </div>
        </div>
    );
}

export default HeaderSection;
