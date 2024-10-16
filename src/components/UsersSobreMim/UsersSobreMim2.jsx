import React, { useEffect, useState } from 'react';
import styles from './UsersSobreMim.module.css';

const SobreMim = ({ userId }) => {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3002/usuarios/${userId}`)
        .then(response => response.json())
        .then(data => setPerfil(data))
        .catch(error => console.error('Erro ao carregar perfil:', error));
    }
  }, [userId]);

  if (!perfil) return <p>Carregando...</p>;

  return (
    <div className={styles.sobreMimContainer}>
      <h2 className={styles.sobreMimTitulo}>Sobre mim</h2>
      <p className={styles.sobreMimTexto}>
        {perfil.sobreMin || 'Nenhuma informação disponível sobre o usuário.'}
      </p>
    </div>
  );
};

export default SobreMim;
