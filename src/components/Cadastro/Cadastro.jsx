import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import Logo from "../../assets/Logo.png";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
    nome: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem!");
      return;
    }

    const novoUsuario = {
      email: formData.email,
      senha: formData.senha,
      nome: formData.nome,
      username: formData.email, // Usando o email como username
      imagemUrl:
        "https://img.freepik.com/vecteurs-premium/pictogramme-personne_764382-14126.jpg",
    };

    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoUsuario),
    })
      .then((response) => {
        if (response.ok) {
          alert("Cadastro realizado com sucesso!");
          navigate("/PaginadeLogin");
        } else {
          alert("Erro ao realizar o cadastro. Tente novamente.");
        }
      })
      .catch((error) => {
        console.error("Erro ao realizar o cadastro:", error);
        alert("Erro ao realizar o cadastro. Tente novamente.");
      });
  };

  return (
    <div className="containerGeralLoginRegister">
      <div className={styles.containerCadastro}>
        <form className={styles.formCadastro} onSubmit={handleSubmit}>
          <img src={Logo} alt="Logo_IndieStream" className={styles.logo} />
          <h2 className={styles.h2}>Cadastre sua conta</h2>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.grupoInput}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Insira seu email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.grupoInput}>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Insira seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.grupoInput}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Insira sua senha"
              value={formData.senha}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.grupoInput}>
            <label htmlFor="confirmarSenha">Confirme sua senha</label>
            <input
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.botaoCadastro}>
            Cadastrar
          </button>

          <p className={styles.text}>
            Já possui conta?{" "}
            <a href="/PaginadeLogin" className={styles.link}>
              Entre
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
