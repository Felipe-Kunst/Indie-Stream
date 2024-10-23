import React, { useState } from 'react';
import styles from './BuscaGeral.module.css';

const BuscaGeral = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Busca Geral</h2>
        <div className={styles.actions}>
          <input
            type="text"
            placeholder="🔍 Busque por pessoas ou projetos"
            value={searchTerm}
            onChange={handleChange}
            className={styles.input}
          />
          <button className={styles.filterButton}>Filtrar</button>
          <button className={styles.createButton}>+ Criar Projeto</button>
        </div>
      </div>
    </div>
  );
};

export default BuscaGeral;
