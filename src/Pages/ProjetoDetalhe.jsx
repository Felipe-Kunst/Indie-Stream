import React from "react";
import VisualizarProjeto from "../components/ProjetoDetalhe/ProjetoDetalhe";
import VisualizarPessoasEnvolvidas from "../components/PessoasEnvolvidasProjeto/PessoasEnvolvidas";
import LinhaDoTempo from "../components/LinhadoTempoProjeto/LinhadoTempo";
import Comentarios from "../components//comentarioProjeto/Comentario";
export default function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
      <VisualizarProjeto/>
      <VisualizarPessoasEnvolvidas/>
      <LinhaDoTempo/>
      <Comentarios/>
    </div>
  );
}


