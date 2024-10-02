import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderLogado.module.css';
import Logo from '../../assets/Logo.png';
import FiltroIcon from '../../assets/IconeFiltro.png';

const HeaderLogado = () => {
  const [cookies, , removeCookie] = useCookies(['userId']);
  const [usuario, setUsuario] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = cookies.userId;
    if (userId) {
      fetch(`http://localhost:3002/usuarios/${userId}`)
        .then(response => response.json())
        .then(data => {
          fetch(`http://localhost:3002/usuario_habilidades?usuarioId=${userId}`)
            .then(response => response.json())
            .then(habilidadesRelacionadas => {
              const habilidadesPromises = habilidadesRelacionadas.map(uh =>
                fetch(`http://localhost:3002/habilidades/${uh.habilidadeId}`)
                  .then(response => response.json())
              );
              Promise.all(habilidadesPromises).then(habilidades => {
                setUsuario({ ...data, habilidades });
              });
            });
        })
        .catch(error => console.error('Erro ao buscar dados do usuário:', error));
    }
  }, [cookies.userId]);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    Object.keys(cookies).forEach((cookieName) => {
      removeCookie(cookieName, { path: '/' });
    });
    navigate('/login');
  };

  const handleCriarProjeto = () => {
    navigate('/criar-projeto');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/ResultadosPesquisa?q=${searchQuery}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
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
  <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
    <input
      type="text"
      className={styles.searchInput}
      placeholder="Busque por pessoas ou projetos"
      value={searchQuery}
      onChange={handleInputChange}
    />
    <button type="submit" className={styles.filtroButton}>
      <img src={FiltroIcon} alt="Filtro" className={styles.filtroIcon} />
    </button>
  </form>
</div>

      <button className={styles.criarProjetoButton} onClick={handleCriarProjeto}>
        Criar Projeto
      </button>
      <nav className={styles.navLinks}>
        <a href="/planos" className={styles.navLink}>Planos</a>
        <a href="/HomelogadoPage" className={styles.navLink}>Home</a>
        <a href="/projetos" className={styles.navLink}>Projetos</a>
        <a href="/Usuarios" className={styles.navLink}>Pessoas</a>
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
            <a href="/EditarUsuario" className={styles.dropdownItem}>Editar perfil</a>
            <a href="/VisualizarUsuario" className={styles.dropdownItem}>Ver Perfil</a>
            <a href="/" className={`${styles.dropdownItem} ${styles.sairItem}`} onClick={handleLogout}>Sair</a>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderLogado;
