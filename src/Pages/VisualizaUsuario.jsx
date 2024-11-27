import React from "react";
import { useParams } from "react-router-dom";
import UsersPerfil from "../components/UsersPerfil/UsersPerfil";
import UsersSobreMim from "../components/UsersSobreMim/UsersSobreMim";
import UsersHabilidades from "../components/UsersHabilidades/UsersHabilidades";
import ObrasFavoritas from "./../components/UsersObrasFavoritas/UserObraFavoritas";
import UserProjetos from "./../components/UsersProjetos/UserProjetos";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";
import Flutter from "../components/Flutter/Flutter";

export default function Main() {
  const { id } = useParams();
  return (
    <div className="containerGeral">
      <HeaderLogado />
      <UsersPerfil userId={id} />
      <UsersSobreMim userId={id} />
      <UserProjetos userId={id} />
      <UsersHabilidades userId={id} />
      <ObrasFavoritas userId={id} />
      <Flutter />
    </div>
  );
}
