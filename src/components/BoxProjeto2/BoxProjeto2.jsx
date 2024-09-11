import React from "react";
import styles from "./BoxProjeto2.module.css";

function BoxProjetos({ projeto }) { 
  if (!projeto) {
    return null;  
  }

  const { imagem, titulo, descricao, localizacao } = projeto;

  return (
    <div className={styles.BoxProjetos}>
      <img src={imagem} alt={titulo} className={styles.BoxProjetosImg} />
      <div className={styles.InfoProjetos}>
        <h2 className={styles.InfoProjetosH2}>{titulo}</h2>
        <p className={styles.InfoProjetosDescricao}>{descricao}</p>
        <p className={styles.InfoProjetosLocalizacao}>{localizacao}</p>
      </div>
    </div>
  );
}

export default BoxProjetos;
