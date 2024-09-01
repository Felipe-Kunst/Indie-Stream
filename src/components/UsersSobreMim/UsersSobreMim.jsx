import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from './UsersSobreMim.module.css';

const SobreMim = () => {
  const [perfil, setPerfil] = useState(null);
  const [cookies] = useCookies(['userId']);

  useEffect(() => {
    const userId = cookies.userId;
    if (userId) {
      fetch(`http://localhost:3001/usuarios/${userId}`)
        .then(response => response.json())
        .then(data => setPerfil(data))
        .catch(error => console.error('Erro ao carregar perfil:', error));
    }
  }, [cookies]);

  if (!perfil) return <p>Carregando...</p>;

  return (
    <div className={styles.sobreMimContainer}>
      <h2 className={styles.sobreMimTitulo}>Sobre mim</h2>
      <p className={styles.sobreMimTexto}>
        {perfil.SobreMin}
      </p>
    </div>
  );
};

export default SobreMim;
