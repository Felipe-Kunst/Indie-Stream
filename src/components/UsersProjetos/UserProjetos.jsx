import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import BoxProjeto from "../BoxProjetos/BoxProjetos";
import "./UserProjetos.modules.css";

const ListaProjetos = () => {
  const { id } = useParams(); // ID do usuário vindo da URL
  const [cookies] = useCookies(["userId"]); // ID do usuário logado
  const [projetos, setProjetos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3;

  useEffect(() => {
    const fetchProjetos = async () => {
      const userId = id || cookies.userId; // Usa o ID da URL ou do cookie
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/projetos?userId=${userId}`
          );

          setProjetos(response.data);
        } catch (error) {
          console.error("Erro ao buscar os projetos do usuário:", error);
        }
      } else {
        console.error("Nenhum userId fornecido");
      }
    };

    fetchProjetos();
  }, [id, cookies.userId]);

  const indiceUltimoProjeto = paginaAtual * itensPorPagina;
  const indicePrimeiroProjeto = indiceUltimoProjeto - itensPorPagina;
  const projetosPaginaAtual = projetos.slice(
    indicePrimeiroProjeto,
    indiceUltimoProjeto
  );
  const totalPaginas = Math.ceil(projetos.length / itensPorPagina);

  const handlePageChange = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <div className="projetosContainer">
      <div className="headerProjetos">
        <h2>Projetos Envolvidos</h2>
        <p>{projetos.length} Projetos</p>
      </div>
      <div className="gridProjetos">
        {projetosPaginaAtual.map((projeto) => (
          <BoxProjeto key={projeto.id} projeto={projeto} />
        ))}
      </div>

      <Paginacao
        totalPaginas={totalPaginas}
        paginaAtual={paginaAtual}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Paginacao = ({ totalPaginas, paginaAtual, onPageChange }) => {
  const paginas = Array.from({ length: totalPaginas }, (_, index) => index + 1);

  return (
    <div className="paginacao">
      <button
        className="paginacao-botao"
        onClick={() => onPageChange(1)}
        disabled={paginaAtual === 1}
      >
        «
      </button>
      {paginas.map((pagina) => (
        <button
          key={pagina}
          className={`paginacao-botao ${
            paginaAtual === pagina ? "pagina-ativa" : ""
          }`}
          onClick={() => onPageChange(pagina)}
        >
          {pagina}
        </button>
      ))}
      <button
        className="paginacao-botao"
        onClick={() => onPageChange(totalPaginas)}
        disabled={paginaAtual === totalPaginas}
      >
        »
      </button>
    </div>
  );
};

export default ListaProjetos;
