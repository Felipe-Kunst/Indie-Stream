import React from 'react';
import { useParams } from 'react-router-dom';
import UsersPerfil from '../components/UsersPerfil/UserPerfil2'; // Primeiro componente
import SobreMim from '../components/UsersSobreMim/UsersSobreMim2'; // Segundo componente
import Habilidades from '../components/UsersHabilidades/UsersHabilidades2'; // Terceiro componente
import UserObraFavorita from '../components/UsersObrasFavoritas/UserObraFavorita2'; // Quarto componente
import Projetos from '../components/UsersProjetos/UserProjetos2';

const UserPage = () => {
    const { id } = useParams(); // Pegando o ID da URL

    return (
      <div>
        <UsersPerfil userId={id} />
        <SobreMim userId={id} />
        <Projetos userId={id} />
        <Habilidades userId={id} />
        <UserObraFavorita userId={id} />
      </div>
    );
  };
  
  export default UserPage;