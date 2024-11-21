import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import styles from "./UserObraFavorita.module.css";

function UserObraFavorita() {
  const [obras, setObras] = useState([]);
  const [cookies] = useCookies(["userId"]);

  useEffect(() => {
    const fetchObrasFavoritas = async () => {
      try {
        const usuarioId = cookies.userId;
        if (!usuarioId) {
          console.error("Usuário não encontrado nos cookies.");
          return;
        }

        // Busca os dados do usuário, incluindo obras favoritas
        const response = await axios.get(
          `http://localhost:8080/user/${usuarioId}`
        );
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
  }, [cookies]);

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
              {/* <p className={styles.obraDescricao}>{obra.descricao}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserObraFavorita;
