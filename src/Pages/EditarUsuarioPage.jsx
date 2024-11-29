import React from "react";

import EditarUsuario from "../components/EditarUsuario/EditarUsuario";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";

export default function Main() {
  return (
    <div className="containerGeral">
      <HeaderLogado />
      <EditarUsuario />
    </div>
  );
}
