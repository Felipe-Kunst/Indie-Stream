import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from './UsersHabilidades.module.css';

const Habilidades = () => {
  const [habilidades, setHabilidades] = useState([]);
  const [cookies] = useCookies(['userId']);

  useEffect(() => {
    const userId = cookies.userId;
    if (userId) {
      fetch(`http://localhost:3001/usuarios/${userId}`)
        .then(response => response.json())
        .then(data => setHabilidades(data.Habilidades))
        .catch(error => console.error('Erro ao carregar habilidades:', error));
    }
  }, [cookies]);

  return (
    <div className={styles.habilidadesContainer}>
      <h2 className={styles.habilidadesTitulo}>Habilidades</h2>
      <hr className={styles.habilidadesLinha} />
      <div className={styles.habilidadesLista}>
        {habilidades.map((habilidade, index) => (
          <span key={index} className={styles.habilidade}>
            {habilidade}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Habilidades;

