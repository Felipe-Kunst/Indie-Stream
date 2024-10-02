import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import BoxProjeto from '../BoxProjetos/BoxProjetos';
import './UserProjetos.modules.css';

const ListaProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [cookies] = useCookies(['userId']);
  const itensPorPagina = 3;

  useEffect(() => {
    const userId = cookies.userId; 

    if (userId) {
      axios.get(`http://localhost:3002/projetos?userId=${userId}`)
        .then(response => {
          setProjetos(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar os projetos do usuário:", error);
        });
    } else {
      console.error("Nenhum userId encontrado no cookie");
    }
  }, [cookies]);

  const indiceUltimoProjeto = paginaAtual * itensPorPagina;
  const indicePrimeiroProjeto = indiceUltimoProjeto - itensPorPagina;
  const projetosPaginaAtual = projetos.slice(indicePrimeiroProjeto, indiceUltimoProjeto);
  const totalPaginas = Math.ceil(projetos.length / itensPorPagina);

  const handlePageChange = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <div className="projetosContainer">
      <div className="headerProjetos">
        <h2>Projetos</h2>
        <p>{projetos.length} Projetos</p>
      </div>
      <div className="gridProjetos">
        {projetosPaginaAtual.map(projeto => (
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
      {paginas.map(pagina => (
        <button 
          key={pagina} 
          className={`paginacao-botao ${paginaAtual === pagina ? 'pagina-ativa' : ''}`} 
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
