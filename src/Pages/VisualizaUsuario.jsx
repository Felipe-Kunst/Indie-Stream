import React from "react";

import UsersPerfil from "../components/UsersPerfil/UsersPerfil";
import UsersSobreMim from "../components/UsersSobreMim/UsersSobreMim";
import UsersHabilidades from "../components/UsersHabilidades/UsersHabilidades";
import ObrasFavoritas from "./../components/UsersObrasFavoritas/UserObraFavoritas";
import UserProjetos from "./../components/UsersProjetos/UserProjetos";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";
import Flutter from "../components/Flutter/Flutter";

export default function Main() {
  return (
    <div className="containerGeral">
      <HeaderLogado />
      <UsersPerfil />
      <UsersSobreMim />
      <UserProjetos />
      <UsersHabilidades />

      <ObrasFavoritas />
      <Flutter />
    </div>
  );
}
