import React, { useEffect, useState } from 'react';
import styles from './HeaderLogado.module.css';
import Logo from '../../assets/Logo.png';

const HeaderLogado = () => {
  const [usuario, setUsuario] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/usuarios/1')
      .then(response => response.json())
      .then(data => setUsuario(data))
      .catch(error => console.error('Erro ao buscar dados do usuário:', error));
  }, []);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <header className={styles.cabecalhoLogado}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="IndieStream Logo" className={styles.logo} />
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Busque por pessoas ou projetos"
        />
      </div>
      <nav className={styles.navLinks}>
        <a href="/planos" className={styles.navLink}>Planos</a>
        <a href="/home" className={styles.navLink}>Home</a>
        <a href="/projetos" className={styles.navLink}>Projetos</a>
        <a href="/pessoas" className={styles.navLink}>Pessoas</a>
      </nav>
      <div className={styles.profileContainer}>
        <img
          src={usuario.imagem}
          alt={`Perfil de ${usuario.nome}`}
          className={styles.profileImage}
          onClick={toggleMenu}
        />
        {menuAberto && (
          <div className={styles.dropdownMenu}>
            <a href="/perfil" className={styles.dropdownItem}>Ver Perfil</a>
            <a href="/" className={`${styles.dropdownItem} ${styles.sairItem}`}>Sair</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderLogado;
