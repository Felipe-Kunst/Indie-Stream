import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ProjetosDestaque.module.css";
import { useNavigate } from "react-router-dom";
import BoxProjeto from "../BoxDestaques/BoXDestaque";

function TopProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/projetos")
      .then((response) => {
        const data = response.data.map((projeto) => ({
          ...projeto,
          watchedBy: projeto.watchedBy || [],
        }));

        setProjetos(data.slice(0, 4)); // Limita a exibição a 4 projetos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar os projetos:", error);
        setError("Erro ao carregar os projetos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando projetos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.containerProjetosBox}>
      <h1>Produções em Destaque</h1>
      <div className={styles.linhaProjetos}>
        {projetos.map((projeto) => (
          <BoxProjeto key={projeto.id} projeto={projeto} />
        ))}
      </div>
      <div className={styles.descubraMaisContainer}>
        <button 
          className={styles.descubraMaisBtn} 
          onClick={() => navigate('/login')}
        >
          Descubra Mais
        </button>
      </div>
    </div>
  );
}

export default TopProjetos;
