import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EsqueciSenha.css";
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
    fetch(`http://localhost:3001/usuarios?email=${email}`)
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
    <div className="container-esqueci-senha">
      <div className="logo-esqueci-senha">
        <img src={Logo} alt="Logo_IndieStream" />
      </div>
      <h2 className="titulo-esqueci-senha">Recuperar senha</h2>
      <p className="descricao-esqueci-senha">
        Digite o e-mail utilizado na criação de sua conta, enviaremos instruções
        para redefinir sua senha
      </p>
      <input
        type="email"
        className="input-email"
        placeholder="Insira seu email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <button onClick={handleRecoverPassword} className="botao-recuperar-senha">
        Recuperar
      </button>
      <a onClick={handleGoBack} className="link-voltar-login">
        Voltar para login
      </a>
      {message && <p className="mensagem-esqueci-senha">{message}</p>}
    </div>
  );
};

export default EsqueceuSenha;
