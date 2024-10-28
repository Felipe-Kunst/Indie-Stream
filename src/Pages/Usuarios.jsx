import React from "react";

import ListaPessoas from "../components/ListaPessoas/ListaPessoas";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";

export default function Main() {
  return (
    <div className="containerGeral">
      <HeaderLogado />
      <ListaPessoas />
    </div>
  );
}
