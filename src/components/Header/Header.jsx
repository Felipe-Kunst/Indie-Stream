import React from "react";
import Imagemdefundo from "../../assets/ImagemFundo.jpg";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

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
            onClick={() => navigate("/PaginadeCadastro")}
          >
            Registrar
          </button>
          <button
            className={styles.loginButton}
            onClick={() => navigate("/PaginadeLogin")}
          >
            Login
          </button>
        </div>
      </div>
      <div
        className={styles.headerSection}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 8%, #222222), url(${Imagemdefundo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={styles.content}>
          <h1>Conecte-se ao coração do cinema brasileiro.</h1>
          <p>
            Descubra produções, explore perfis profissionais e colabore em
            projetos independentes. Junte-se a nós para dar vida às suas ideias
            e impulsionar sua carreira no mundo cinematográfico.
          </p>
          <button
            className={styles.juntarSeBtn}
            onClick={() => navigate("/PaginadeLogin")}
          >
            Juntar-se
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
