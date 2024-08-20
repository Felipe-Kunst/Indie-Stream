import React from "react";

import EditarUsuario from "../components/EditarUsuario/EditarUsuario";

export default function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <EditarUsuario/>
    </div>
  );
}


