import React, { useState } from "react";
import "./Cadastro.css";
import Logo from "../../assets/Logo.png";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
    nome: "",
    premiom: false,
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
      imagem: "https://example.com/default-image.jpg",
      premiom: formData.premiom,
    };

    fetch("http://localhost:3001/usuarios", {
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
    <div className="container-cadastro">
      <div className="logo">
        <img src={Logo} alt="Logo_IndieStream" />
      </div>
      <h2>Cadastre sua conta</h2>
      <form onSubmit={handleSubmit}>
        <div className="grupo-input">
          <input
            type="email"
            name="email"
            placeholder="Insira seu email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grupo-input">
          <input
            type="text"
            name="nome"
            placeholder="Insira seu nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grupo-input">
          <input
            type="password"
            name="senha"
            placeholder="Insira sua senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grupo-input">
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grupo-input">
          <select
            name="premiom"
            value={formData.premiom}
            onChange={(e) =>
              setFormData({ ...formData, premiom: e.target.value === "true" })
            }
            required
          >
            <option value="false">Selecione seu perfil</option>
            <option value="true">Premium</option>
            <option value="false">Standard</option>
          </select>
        </div>
        <button type="submit" className="botao-cadastro">
          Avançar
        </button>
      </form>
      <div className="separator">
        <span>– OU –</span>
      </div>
      <p>
        Já possui conta? <a href="/login">Entre</a>
      </p>
    </div>
  );
};

export default Cadastro;
