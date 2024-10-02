import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; 
import CardPessoa from "../BoxUsuarios/BoxUsuarios";
import styles from "./PessoasDestaque.module.css";

const PessoasEmDestaque = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/usuarios") 
      .then(response => response.json())
      .then(data => setUsuarios(data.slice(0, 4))) 
      .catch(error => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.pessoasEmDestaque}>
        <h2>Pessoas em Destaque</h2>
        <div className={styles.gridPessoas}>
          {usuarios.map((usuario) => (
            <CardPessoa key={usuario.id} usuario={usuario} />
          ))}
        </div>
        <Link to="/Usuarios" className={styles.verMais}>
          Ver todos os resultados de pessoas
        </Link>
      </section>
    </div>
  );
};

export default PessoasEmDestaque;
