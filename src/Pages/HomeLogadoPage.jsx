import React from "react";
import PessoasEmDestaque from "../components/PessoasDestaque/PessoasDestaque";
import ProjetoDestaqueLogado from "../components/ProjetosDestaqueLogado/ProjetosDestaqueLogado";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";
import Flutter from "../components/Flutter/Flutter";

export default function Main() {
  return (
    <div className="containerGeral">
      <HeaderLogado />
      <ProjetoDestaqueLogado />
      <PessoasEmDestaque />
      <Flutter />
    </div>
  );
}
