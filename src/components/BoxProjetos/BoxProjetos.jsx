import React from 'react';
import styles from './BoxProjetos.module.css';

const BoxProjetos = ({ projeto }) => {
  return (
    <div className={styles.boxProjeto}>
      <img src={projeto.imagem} alt={projeto.titulo} className={styles.imagemProjeto} />
      <div className={styles.textoContainer}>
        <h3 className={styles.titulo}>{projeto.titulo}</h3>
        <p className={styles.descricao}>{projeto.descricao}</p>
        <p className={styles.localizacao}>Localização: {projeto.localizacao}</p>
        <p className={styles.tipo}>Tipo: {projeto.tipo}</p>
        <div className={styles.statusContainer}>
          <span className={`${styles.statusIcone} ${projeto.status === 'Concluído' ? styles.concluido : styles.andamento}`}></span>
          <span className={styles.statusTexto}>{projeto.status}</span>
        </div>
      </div>
    </div>
  );
};

export default BoxProjetos;
