import React from "react";

import Flutter from "../components/Flutter/Flutter";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";
import Planos from "../components/Planos/Planos";

export default function Main() {
  return (
    <div className="containerGeral">
      {/* Espaço para o header fixo */}
      <HeaderLogado />
      <Planos />
      <Flutter />
    </div>
  );
}
