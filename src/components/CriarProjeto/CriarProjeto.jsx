import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CriarProjeto.module.css";
import Logo from "../../assets/Logo.png";

function CriarProjeto() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagem, setImagem] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("Em andamento");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCriarProjeto = async (event) => {
    event.preventDefault();

    const novoProjeto = {
      titulo,
      descricao,
      localizacao,
      imagem,
      tipo,
      status,
    };

    try {
      const response = await fetch("http://localhost:3002/projetos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProjeto),
      });

      if (response.ok) {
        setError("");
        navigate("/Projetos");
      } else {
        setError("Erro ao criar o projeto.");
      }
    } catch (error) {
      setError("Erro ao tentar criar o projeto.");
    }
  };

  return (
    <div className={styles.containerProjeto}>
      <form className={styles.formProjeto} onSubmit={handleCriarProjeto}>
        <img src={Logo} alt="Logo_IndieStream" className={styles.logo} />
        <h2 className={styles.h2}>Criar novo projeto</h2>

        <div className={styles.grupoInput}>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            placeholder="Insira o título do projeto"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={
              error ? `${styles.input} ${styles.inputErro}` : styles.input
            }
          />
        </div>

        <div className={styles.grupoInput}>
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            placeholder="Insira uma breve descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className={
              error ? `${styles.input} ${styles.inputErro}` : styles.input
            }
          />
        </div>

        <div className={styles.grupoInput}>
          <label htmlFor="localizacao">Localização</label>
          <input
            type="text"
            id="localizacao"
            placeholder="Insira a localização"
            value={localizacao}
            onChange={(e) => setLocalizacao(e.target.value)}
            className={
              error ? `${styles.input} ${styles.inputErro}` : styles.input
            }
          />
        </div>

        <div className={styles.grupoInput}>
          <label htmlFor="imagem">URL da Imagem</label>
          <input
            type="text"
            id="imagem"
            placeholder="Insira o link da imagem do projeto"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            className={
              error ? `${styles.input} ${styles.inputErro}` : styles.input
            }
          />
        </div>

        <div className={styles.grupoInput}>
          <label htmlFor="tipo">Tipo</label>
          <input
            type="text"
            id="tipo"
            placeholder="Insira o tipo do projeto"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className={
              error ? `${styles.input} ${styles.inputErro}` : styles.input
            }
          />
        </div>

        <div className={styles.grupoInput}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={
              error ? `${styles.input} ${styles.inputErro}` : styles.input
            }
          >
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>

        <button type="submit" className={styles.botao}>
          Criar Projeto
        </button>

        {error && <p className={styles.erro}>{error}</p>}
      </form>
    </div>
  );
}

export default CriarProjeto;
