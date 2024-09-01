import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './usuariosdestaques.module.css';

const ObrasFavoritas = ({ usuarioId }) => {
  const [obras, setObras] = useState([]);
  const [cookies, setCookie] = useCookies(['obrasFavoritas']);

  useEffect(() => {
    const fetchObrasFavoritas = async () => {
      if (cookies.obrasFavoritas) {
        setObras(cookies.obrasFavoritas);
      } else {
        // Primeiro, obtenha os dados do usuário
        const usuarioResponse = await axios.get(`http://localhost:3001/usuarios/${usuarioId}`);
        const obrasFavoritasIds = usuarioResponse.data.ObrasFavoritas;

        // Agora, obtenha os detalhes dos projetos das obras favoritas
        const projetosPromises = obrasFavoritasIds.map(obrasFavId =>
          axios.get(`http://localhost:3001/projetos/${obrasFavId}`)
        );
        const projetosData = await Promise.all(projetosPromises);
        const obrasData = projetosData.map(res => res.data);

        setObras(obrasData);
        setCookie('obrasFavoritas', obrasData, { path: '/' });
      }
    };

    fetchObrasFavoritas();
  }, [usuarioId, cookies, setCookie]);

  return (
    <div className="obras-favoritas">
      <h2>Obras favoritas</h2>
      <div className="obras-container">
        {obras.map((projeto) => (
          <div key={projeto.id} className="obra">
            <img src={projeto.imagem} alt={projeto.titulo} />
            <p>{projeto.titulo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObrasFavoritas;







