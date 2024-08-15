import React from "react";
import styles from "./BoxUsuarios.module.css";

function CardPessoa({ usuario }) {
  const { imagem, nome, Ramos, Localizacao } = usuario;

  return (
    <div className={styles.boxDestaques}>
      <img src={imagem} alt={nome} className={styles.imagem} />
      <div className={styles.infoUsuarios}>
        <h2 className={styles.nome}>{nome}</h2>
        <p className={styles.ramo}>{Ramos.join(" / ")}</p>
        <p className={styles.localizacao}>{Localizacao}</p>
      </div>
    </div>
  );
}

export default CardPessoa;

