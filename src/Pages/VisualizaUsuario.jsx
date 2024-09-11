import React from "react";

import UsersPerfil from "../components/UsersPerfil/UsersPerfil";
import UsersSobreMim from "../components/UsersSobreMim/UsersSobreMim"
import UsersHabilidades from "../components/UsersHabilidades/UsersHabilidades"
import ObrasFavoritas from './../components/UsersObrasFavoritas/UserObraFavoritas';
import Projetos from "../components/UsersProjetos/UserProjetos"; 

export default function Main() {
  return (
    <div>
      <UsersPerfil/>
      <Projetos/>
      <UsersSobreMim/>
      <UsersHabilidades/>
      <ObrasFavoritas/>
    </div>
  );
}


