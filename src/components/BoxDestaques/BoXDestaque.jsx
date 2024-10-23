import React from "react";
import styles from "./BoxDestaque.module.css";

function BoxDestaques({ projeto }) { 
  if (!projeto) {
    return null;  
  }

  const { imagem, titulo } = projeto;

  return (
    <div className={styles.BoxDestaques}>
      <img src={imagem} alt={titulo} className={styles.BoxDestaquesImg} />
      <div className={styles.InfoProjetos}>
        <h2 className={styles.InfoProjetosH2}>{titulo}</h2>
      </div>
    </div>
  );
}

export default BoxDestaques;
