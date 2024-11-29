import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./UserObraFavorita.module.css";

function UserObraFavorita() {
  const [obras, setObras] = useState([]);
  const { id } = useParams(); // Obtém o ID do usuário da URL

  useEffect(() => {
    const fetchObrasFavoritas = async () => {
      try {
        if (!id) {
          console.error("ID do usuário não encontrado na URL.");
          return;
        }

        // Busca os dados do usuário, incluindo obras favoritas
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        const usuario = response.data;

        if (usuario.obrasFavoritas && usuario.obrasFavoritas.length > 0) {
          setObras(usuario.obrasFavoritas);
        } else {
          console.log("Usuário não possui obras favoritas.");
        }
      } catch (error) {
        console.error("Erro ao buscar obras favoritas:", error);
      }
    };

    fetchObrasFavoritas();
  }, [id]);

  if (obras.length === 0) {
    return null; // Oculta o componente se não houver obras favoritas
  }

  return (
    <div className={styles.obrasFavoritas}>
      <h2 className={styles.titulo}>Obras favoritas</h2>
      <div className={styles.obrasContainer}>
        {obras.map((obra) => (
          <div key={obra.id} className={styles.obraItem}>
            <img
              src={obra.imagemUrl} // Atualizado para usar o campo correto do backend
              alt={obra.titulo}
              className={styles.obraImagem}
            />
            <div className={styles.infoObra}>
              <h2 className={styles.obraTitulo}>{obra.titulo}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserObraFavorita;
