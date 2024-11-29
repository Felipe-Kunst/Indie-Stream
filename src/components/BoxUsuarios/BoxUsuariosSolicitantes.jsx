import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BoxUsuarios.module.css";
import aceitarIcon from "../../assets/aceitar.svg";
import recusarIcon from "../../assets/recusar.svg";

function CardPessoaSolicitante({ usuario, onAceitar, onRecusar }) {
  const navigate = useNavigate();

  if (!usuario || Object.keys(usuario).length === 0) {
    return <div>Usuário não encontrado.</div>;
  }

  const { id, imagemUrl, nome, cidadeNome, estadoNome, profissaoNome } =
    usuario;

  const handleClick = () => {
    navigate(`/VisualizarUsuario/${id}`);
  };

  return (
    <div
      className={styles.boxDestaques}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <img src={imagemUrl} alt={nome} className={styles.imagem} />
      <div className={styles.infoUsuarios}>
        <h2 className={styles.nome}>{nome}</h2>
        <p className={styles.ramo}>
          {profissaoNome || "Profissão não informada"}
        </p>
        <p className={styles.localizacao}>
          {cidadeNome || "Cidade não informada"}{" "}
          {estadoNome ? `, ${estadoNome}` : ""}
        </p>
        <div className={styles.acaoContainer}>
          <img
            src={aceitarIcon}
            alt="Aceitar"
            className={styles.iconeAcao}
            onClick={(e) => {
              e.stopPropagation(); // Impede o clique no card
              onAceitar(id);
            }}
          />
          <img
            src={recusarIcon}
            alt="Recusar"
            className={styles.iconeAcao}
            onClick={(e) => {
              e.stopPropagation(); // Impede o clique no card
              onRecusar(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CardPessoaSolicitante;
