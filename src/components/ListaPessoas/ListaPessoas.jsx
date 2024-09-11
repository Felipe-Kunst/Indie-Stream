import React, { useState, useEffect } from 'react';
import styles from './ListaPessoas.module.css';

const ListaPessoas = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3002/usuarios') 
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2 className={styles.titulo}>Lista de Usuários</h2>
        <div className={styles.usuarios}>
          {usuarios.map((usuario) => (
            <div key={usuario.id} className={styles.usuarioCard}>
              <div className={styles.imagemContainer}>
                <img src={usuario.imagem} alt={usuario.nome} className={styles.usuarioImagem} />
              </div>
              <div className={styles.infoContainer}>
                <h3>{usuario.nome}</h3>
                <p>Email: {usuario.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaPessoas;
