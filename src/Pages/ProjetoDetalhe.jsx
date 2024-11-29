import React from "react";
import VisualizarProjeto from "../components/ProjetoDetalhe/ProjetoDetalhe";
import VisualizarPessoasEnvolvidas from "../components/PessoasEnvolvidasProjeto/PessoasEnvolvidas";
import LinhaDoTempo from "../components/LinhadoTempoProjeto/LinhadoTempo";
import Comentarios from "../components//comentarioProjeto/Comentario";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";
import ProjetoUsuarioSolicitantes from "../components/ProjetoUsuariosSolicitantes/ProjetoUsuariosSolicitantes";
export default function Main() {
  return (
    <div className="containerGeral" style={{ gap: "20px" }}>
      <HeaderLogado />
      <VisualizarProjeto />
      <VisualizarPessoasEnvolvidas />
      <ProjetoUsuarioSolicitantes />
      <LinhaDoTempo />
      <Comentarios />
    </div>
  );
}
