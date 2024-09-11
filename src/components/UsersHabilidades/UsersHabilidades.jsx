import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from './UsersHabilidades.module.css';

const Habilidades = () => {
  const [habilidades, setHabilidades] = useState([]);
  const [cookies] = useCookies(['userId']);

  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        const [usuarioResponse, usuarioHabilidadesResponse, habilidadesResponse] = await Promise.all([
          fetch(`http://localhost:3002/usuarios/${cookies.userId}`), 
          fetch(`http://localhost:3002/usuario_habilidades?usuarioId=${cookies.userId}`), 
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

    if (cookies.userId) {
      fetchHabilidades();
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
