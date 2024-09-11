import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import styles from './UserObraFavorita.module.css';

function UserObraFavorita() {
  const [obras, setObras] = useState([]);
  const [cookies] = useCookies(['userId']);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const fetchObrasFavoritas = async () => {
      try {
        const usuarioId = cookies.userId;
        if (!usuarioId) {
          setShouldRender(false);
          return;
        }

        const response = await axios.get(`http://localhost:3002/obras_favoritas?usuarioId=${usuarioId}`);

        if (response.data.length === 0) {
          setShouldRender(false);
          return;
        }

        const obrasData = await Promise.all(response.data.map(async (obraFavorita) => {
          const projetoResponse = await axios.get(`http://localhost:3002/projetos/${obraFavorita.projetoId}`);
          return projetoResponse.data;
        }));

        setObras(obrasData);
      } catch (error) {
        console.error('Erro ao buscar obras favoritas:', error);
        setShouldRender(false);
      }
    };

    fetchObrasFavoritas();
  }, [cookies]);

  if (!shouldRender || obras.length === 0) {
    return null; 
  }

  return (
    <div className={styles.obrasFavoritas}>
      <h2 className={styles.titulo}>Obras favoritas</h2>
      <div className={styles.obrasContainer}>
        {obras.map((obra) => (
          <div key={obra.id} className={styles.obraItem}>
            <img src={obra.imagem} alt={obra.titulo} className={styles.obraImagem} />
            <div className={styles.infoObra}>
              <h2 className={styles.obraTitulo}>{obra.titulo}</h2>
              <p className={styles.obraAno}>{obra.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserObraFavorita;
