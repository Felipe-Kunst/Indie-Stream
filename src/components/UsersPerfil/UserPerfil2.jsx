import React, { useState, useEffect } from "react";
import styles from "./UsersPerfil.module.css";

import facebookIcon from "../../assets/Facebook.png";
import twitterIcon from "../../assets/X.png";
import instagramIcon from "../../assets/Instagram.png";
import ticktokIcon from "../../assets/Ticktoc.png";
import pinterestIcon from "../../assets/Pinterest.png";
import outlookIcon from "../../assets/Outlook.png";
import LinkedinIcon from "../../assets/Linkedin.png";
import gmailIcon from "../../assets/Gmail.png";
import EmailGenerico from "../../assets/EmailGenerico.png";

const UsersPerfil = ({ userId }) => {
  const [user, setUser] = useState(null);

  const profissoes = {
    1: "Dublê",
    2: "Produtor",
    // demais profissões...
  };

  const estados = {
    ce: "Ceará",
    sp: "São Paulo",
  };

  const cidades = {
    1: "Fortaleza",
    2: "São Paulo",
  };

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3002/usuarios/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
    } else {
      console.error("userId não foi passado como prop.");
    }
  }, [userId]);

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

  const uniqueSocials = new Set();

  return (
    <div className={styles.perfilContainer}>
      <div className={styles.grayContainer}>
        <div className={styles.header}>
          <div className={styles.leftContainer}>
            <img
              src={user.imagem}
              alt={`${user.nome}`}
              className={styles.profileImage}
            />
            <div className={styles.info}>
              <h2 className={styles.name}>{user.nome}</h2>
              <p className={styles.role}>{profissoes[user.ramo]}</p>
              <div className={styles.socialMedia}>
                {user.redeSociais && user.redeSociais.length > 0 ? (
                  user.redeSociais.map((rede, index) => {
                    const key = rede.includes("facebook")
                      ? "facebook"
                      : rede.includes("instagram")
                      ? "instagram"
                      : rede.includes("tiktok")
                      ? "tiktok"
                      : rede.includes("pinterest")
                      ? "pinterest"
                      : rede.includes("outlook")
                      ? "outlook"
                      : rede.includes("linkedin")
                      ? "linkedin"
                      : rede.includes("gmail")
                      ? "gmail"
                      : rede.includes("twitter")
                      ? "twitter"
                      : "email";

                    // Verifica se o link já existe no conjunto
                    if (uniqueSocials.has(rede)) {
                      return null; // Evita exibir o mesmo link novamente
                    }
                    uniqueSocials.add(rede); // Adiciona ao conjunto

                    return (
                      <a
                        key={index}
                        href={rede.includes("http") ? rede : `mailto:${rede}`}
                        className={styles.socialIcon}
                      >
                        <img src={redesSociaisIcons[key]} alt={key} />
                      </a>
                    );
                  })
                ) : (
                  <p>Redes sociais não disponíveis</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.location}>
              <i
                className={`fa fa-map-marker ${styles.icon}`}
                aria-hidden="true"
              ></i>
              {user.localizacao
                ? `${cidades[user.localizacao.cidadeId]}, ${
                    estados[user.localizacao.estadoId]
                  }`
                : "Localização não disponível"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPerfil;
