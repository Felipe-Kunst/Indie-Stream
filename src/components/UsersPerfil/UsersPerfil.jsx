import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
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

const UsersPerfil = () => {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["userId"]);

  useEffect(() => {
    const userId = cookies.userId;

    if (userId) {
      fetch(`http://localhost:8080/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
    } else {
      console.error("userId não encontrado nos cookies.");
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
          <div className={styles.leftContainer}>
            <img
              src={user.imagemUrl}
              alt={`${user.nome}`}
              className={styles.profileImage}
            />
            <div className={styles.info}>
              <h2 className={styles.name}>{user.nome}</h2>
              <p className={styles.role}>{user.profissaoNome}</p>
              <div className={styles.socialMedia}>
                {user.redesSociais && user.redesSociais.length > 0 ? (
                  user.redesSociais.map((rede, index) => {
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
              {user.cidadeNome
                ? `${user.cidadeNome}, ${user.estadoNome}`
                : "Localização não disponível"}
            </div>

            <button className={styles.premiumButton}>Impulsionar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPerfil;
