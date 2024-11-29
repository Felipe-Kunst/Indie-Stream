import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./UsersHabilidades.module.css";

const Habilidades = () => {
  const [habilidades, setHabilidades] = useState([]);
  const { id } = useParams(); // Pega o ID da URL

  useEffect(() => {
    const fetchHabilidades = async () => {
      try {
        if (!id) {
          console.error("Nenhum ID fornecido na URL.");
          return;
        }

        // Busca os dados do usuário específico (incluindo habilidades)
        const response = await axios.get(`http://localhost:8080/user/${id}`);
        const usuario = response.data;

        // Extraindo as habilidades do usuário
        const habilidadesDoUsuario = usuario.habilidades.map(
          (habilidade) => habilidade.nome
        );

        setHabilidades(habilidadesDoUsuario);
      } catch (error) {
        console.error("Erro ao carregar habilidades:", error);
      }
    };

    fetchHabilidades();
  }, [id]);

  return (
    <div className={styles.habilidadesContainer}>
      <h2 className={styles.habilidadesTitulo}>Habilidades</h2>
      <hr className={styles.habilidadesLinha} />
      <div className={styles.habilidadesLista}>
        {habilidades.length > 0 ? (
          habilidades.map((habilidade, index) => (
            <span key={index} className={styles.habilidade}>
              {habilidade}
            </span>
          ))
        ) : (
          <p className={styles.semHabilidades}>
            Nenhuma habilidade cadastrada.
          </p>
        )}
      </div>
    </div>
  );
};

export default Habilidades;
