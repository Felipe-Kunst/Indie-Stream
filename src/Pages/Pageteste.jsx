import React from "react";

import UsersPerfil from "../components/UsersPerfil/UsersPerfil";
import UsersSobreMim from "../components/UsersSobreMim/UsersSobreMim"
import UsersHabilidades from "../components/UsersHabilidades/UsersHabilidades"
import ObrasFavoritas from './../components/UsuariosDestaques/usuariosdestaques';

export default function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
      <UsersPerfil/>
      <UsersSobreMim/>
      <UsersHabilidades/>
      <ObrasFavoritas/>
    </div>
  );
}


