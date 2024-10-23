import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EsqueciSenha.module.css";
import Logo from "../../assets/Logo.png";

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Recuperar Senha - Indie-Stream";
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecoverPassword = () => {
    fetch(`http://localhost:3002/usuarios?email=${email}`) 
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setMessage(`Instruções enviadas para o e-mail: ${email}`);
        } else {
          setMessage("E-mail não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar o JSON:", error);
        setMessage("Erro ao tentar recuperar a senha.");
      });
  };

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className={styles.containerEsqueciSenha}>
      <div className={styles.logoEsqueciSenha}>
        <img src={Logo} alt="Logo_IndieStream" />
      </div>
      <h2 className={styles.tituloEsqueciSenha}>Recuperar senha</h2>
      <p className={styles.descricaoEsqueciSenha}>
        Digite o e-mail utilizado na criação de sua conta, enviaremos instruções
        para redefinir sua senha
      </p>
      <input
        type="email"
        className={styles.inputEmail}
        placeholder="Insira seu email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <button
        onClick={handleRecoverPassword}
        className={styles.botaoRecuperarSenha}
      >
        Recuperar
      </button>
      <a onClick={handleGoBack} className={styles.linkVoltarLogin}>
        Voltar para login
      </a>
      {message && <p className={styles.mensagemEsqueciSenha}>{message}</p>}
    </div>
  );
};

export default EsqueceuSenha;
