import React, { useEffect, useState } from 'react';
import styles from './UsersHabilidades.module.css';

const Habilidades = ({ userId }) => {
  const [habilidades, setHabilidades] = useState([]);

  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        const [usuarioResponse, usuarioHabilidadesResponse, habilidadesResponse] = await Promise.all([
          fetch(`http://localhost:3002/usuarios/${userId}`), 
          fetch(`http://localhost:3002/usuario_habilidades?usuarioId=${userId}`), 
          fetch(`http://localhost:3002/habilidades`),
        ]);

        const usuarioData = await usuarioResponse.json();
        const usuarioHabilidadesData = await usuarioHabilidadesResponse.json();
        const habilidadesData = await habilidadesResponse.json();

        const habilidadesDoUsuario = usuarioHabilidadesData.map(uh => {
          const habilidade = habilidadesData.find(h => h.id === uh.habilidadeId);
          return habilidade ? habilidade.nome : 'Habilidade desconhecida';
        });

        setHabilidades(habilidadesDoUsuario);
      } catch (error) {
        console.error('Erro ao carregar habilidades:', error);
      }
    };

    if (userId) {
      fetchHabilidades();
    }
  }, [userId]);

  return (
    <div className={styles.habilidadesContainer}>
      <h2 className={styles.habilidadesTitulo}>Habilidades</h2>
      <hr className={styles.habilidadesLinha} />
      <div className={styles.habilidadesLista}>
        {habilidades.length > 0 ? habilidades.map((habilidade, index) => (
          <span key={index} className={styles.habilidade}>
            {habilidade}
          </span>
        )) : <p>Nenhuma habilidade disponível.</p>}
      </div>
    </div>
  );
};

export default Habilidades;
