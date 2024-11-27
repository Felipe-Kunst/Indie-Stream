import React, { useState } from "react";
import styles from "./Cadastro.module.css";
import Logo from "../../assets/Logo.png";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
    nome: "",
  });

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
      alert("As senhas não coincidem!");
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
    <div className={styles.containerCadastro}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo_IndieStream" />
      </div>
      <h2 className={styles.h2}>Cadastre sua conta</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.grupoInput}>
          <input
            type="email"
            name="email"
            placeholder="Insira seu email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.grupoInput}>
          <input
            type="text"
            name="nome"
            placeholder="Insira seu nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.grupoInput}>
          <input
            type="password"
            name="senha"
            placeholder="Insira sua senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.grupoInput}>
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.botaoCadastro}>
          Avançar
        </button>
      </form>
      <div className={styles.separator}>
        <span>– OU –</span>
      </div>
      <p className={styles.p}>
        Já possui conta?{" "}
        <a href="/PaginadeLogin" className={styles.link}>
          Entre
        </a>
      </p>
    </div>
  );
};

export default Cadastro;
