import React from "react";

import ResultadosPesquisa from "./../components/ResultadoPesquisa/ResultadoPesquisa";
import Flutter from "../components/Flutter/Flutter";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";

export default function Main() {
  return (
    <div style={{ paddingTop: "95px" }}>
      {/* Espaço para o header fixo */}
      <HeaderLogado />
      <ResultadosPesquisa />
      <Flutter />
    </div>
  );
}
