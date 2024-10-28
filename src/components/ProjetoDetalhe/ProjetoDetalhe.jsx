import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProjetoDetalhes.module.css';

const VisualizarProjeto = () => {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3002/projetos/${id}`)
      .then(response => setProjeto(response.data))
      .catch(error => console.error('Erro ao buscar o projeto:', error));
  }, [id]);

  if (!projeto) {
    return <div>Carregando...</div>;
  }

  const {
    titulo,
    imagem,
    descricao,
    status,
  } = projeto;

  const statusClass = status === 'Concluído' ? styles.concluido : styles.andamento;

  return (
    <div className={styles.container}>
      <section className={styles.projetoSection}>
        <h2 className={styles.title}>Visualizar Projeto</h2>
        <hr className={styles.divider} />
        <h3 className={styles.projetoNome}>{titulo}</h3>
        {imagem && <img src={imagem} alt={titulo} className={styles.projetoImagem} />}
        <p className={styles.descricao}>{descricao}</p>
        <div className={`${styles.statusContainer} ${statusClass}`}>
          <span className={styles.statusDot}></span>
          <span className={styles.status}>{status}</span>
        </div>
        <button className={styles.contatoButton}>Entrar em contato</button>
      </section>
    </div>
  );
};

export default VisualizarProjeto;
