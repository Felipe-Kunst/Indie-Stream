import React, { useState, useEffect } from 'react';
import styles from './BuscaFiltrada.module.css';

const BuscaFiltrada = ({ searchTerm }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('../../../db.json');
      const data = await response.json();
      setUsuarios(data.usuarios);
      setProjetos(data.projetos);
    };
    fetchData();
  }, []);

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjetos = projetos.filter((projeto) =>
    projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.resultContainer}>
      <h3>Resultados da Busca</h3>
      <div className={styles.usuariosSection}>
        <h4>Usuários</h4>
        {filteredUsuarios.length > 0 ? (
          filteredUsuarios.map((usuario) => (
            <div key={usuario.id} className={styles.resultItem}>
              <img src={usuario.imagem} alt={usuario.nome} className={styles.image} />
              <div>
                <h5>{usuario.nome}</h5>
                <p>{usuario.Ramos.join(', ')}</p>
                <p>{usuario.Localizacao}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>
      <div className={styles.projetosSection}>
        <h4>Projetos</h4>
        {filteredProjetos.length > 0 ? (
          filteredProjetos.map((projeto) => (
            <div key={projeto.id} className={styles.resultItem}>
              <img src={projeto.imagem} alt={projeto.titulo} className={styles.image} />
              <div>
                <h5>{projeto.titulo}</h5>
                <p>{projeto.descricao}</p>
                <p>{projeto.localizacao}</p>
                <p>{projeto.tipo} - {projeto.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum projeto encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default BuscaFiltrada;
