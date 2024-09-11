import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './UsersPerfil.module.css';

import facebookIcon from '../../assets/Facebook.png'; 
import twitterIcon from '../../assets/X.png'; 
import instagramIcon from '../../assets/Instagram.png'; 
import ticktokIcon from '../../assets/Ticktoc.png';
import pinterestIcon from '../../assets/Pinterest.png';
import outlookIcon from '../../assets/Outlook.png';
import LinkedinIcon from '../../assets/Linkedin.png';
import gmailIcon from '../../assets/Gmail.png';
import EmailGenerico from '../../assets/EmailGenerico.png';

const UsersPerfil = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(['userId']); 

  const profissoes = {
    "1": "Dublê",
    "2": "Produtor",
    "3": "Editor de Vídeo",
    "4": "Diretor de Fotografia",
    "5": "Cenógrafo",
    "6": "Roteirista",
    "7": "Ator",
    "8": "Compositor",
    "9": "Pintor",
    "10": "Escultor",
    "11": "Coreógrafo",
    "12": "Designer Gráfico",
    "13": "Diretor de Arte",
    "14": "Editor de Som",
    "15": "Maquiador",
    "16": "Figurinista",
    "17": "Ilustrador",
    "18": "Fotógrafo",
    "19": "Animador 3D",
    "20": "Tatuador"
  };

  const estados = {
    "ce": "Ceará",
    "sp": "São Paulo"
  };

  const cidades = {
    "1": "Fortaleza",
    "2": "São Paulo"
  };

  useEffect(() => {
    const userId = cookies.userId; 

    if (userId) {
      fetch(`http://localhost:3002/usuarios/${userId}`) 
        .then(response => response.json())
        .then(data => {
          setUser(data);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
    } else {
      console.error('userId não encontrado nos cookies.');
    }
  }, [cookies]);

  const redesSociaisIcons = {
    facebook: facebookIcon,
    twitter: twitterIcon,
    instagram: instagramIcon,
    tiktok: ticktokIcon,
    pinterest: pinterestIcon,
    outlook: outlookIcon,
    linkedin: LinkedinIcon,
    gmail: gmailIcon,
    email: EmailGenerico, 
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.perfilContainer}>

      <div className={styles.grayContainer}>
        <div className={styles.header}>
          <img src={user.imagem} alt={`${user.nome}`} className={styles.profileImage} />
          <div className={styles.info}>
            <h2 className={styles.name}>{user.nome}</h2>
            <p className={styles.role}>{profissoes[user.ramo]}</p>
            <div className={styles.location}>
              <i className={`fa fa-map-marker ${styles.icon}`} aria-hidden="true"></i>
              {user.localizacao ? `${cidades[user.localizacao.cidadeId]}, ${estados[user.localizacao.estadoId]}` : 'Localização não disponível'}
            </div>
          </div>
        </div>
        <div className={styles.socialMedia}>
          {user.redeSociais && user.redeSociais.length > 0 ? user.redeSociais.map((rede, index) => {
            const key = rede.includes('facebook') ? 'facebook' :
                        rede.includes('instagram') ? 'instagram' :
                        rede.includes('tiktok') ? 'tiktok' :
                        rede.includes('pinterest') ? 'pinterest' :
                        rede.includes('outlook') ? 'outlook' :
                        rede.includes('linkedin') ? 'linkedin' :
                        rede.includes('gmail') ? 'gmail' :
                        rede.includes('twitter') ? 'twitter' :
                        'email';  

            return (
              <a key={index} href={rede.includes('http') ? rede : `mailto:${rede}`} className={styles.socialIcon}>
                <img src={redesSociaisIcons[key]} alt={key} />
              </a>
            );
          }) : <p>Redes sociais não disponíveis</p>}
        </div>
        <button className={styles.premiumButton}>Impulsionar</button>
      </div>
    </div>
  );
};

export default UsersPerfil;
