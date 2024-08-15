import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProjetoDestaque.css";
import { Link, useNavigate } from "react-router-dom";
import BoxProjeto from "../BoxDestaques/BoXDestaque";

function Top_Projetos() {
  const [Projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/ProjetosDestaque")
      .then((response) => {
        const data = response.data.map((Projetos) => ({
          ...Projetos,
          watchedBy: Projetos.watchedBy || [],
        }));

        setProjetos(data.slice(0, 4)); // Limita a exibição a 4 filmes
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar os Projetos:", error);
        setError("Erro ao carregar os Projetos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando Projetos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="Container_ProjetosBox">
      <h1>Produções em Destaque</h1>
      <div className="Linha-Projetos">
        {Projetos.map((Projetos) => (
          <BoxProjeto key={Projetos.id} Projetos={Projetos} />
        ))}
      </div>
      <div className="discubraMais-container">
        <button className="discubraMais-btn" onClick={() => navigate('/login')}
        >Descubra Mais</button>
        
      </div>
    </div>
  );
}

export default Top_Projetos;


