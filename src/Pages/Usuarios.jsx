import React from "react";

import ListaPessoas from '../components/ListaPessoas/ListaPessoas';

export default function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
      <ListaPessoas/>
    </div>
  );
}


