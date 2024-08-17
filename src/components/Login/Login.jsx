import React, { useState } from 'react';
import styles from './Login.module.css';
import Logo from "../../assets/Logo.png";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/usuarios?email=${email}&senha=${password}`);
      const data = await response.json();

      if (data.length > 0) {
        setUser(data[0]);
        setError('');
      } else {
        setError('Email ou senha incorretos.');
      }
    } catch (error) {
      setError('Erro ao tentar realizar o login.');
    }
  };

  return (
    <div className={styles.containerLogin}>
      {!user ? (
        <form onSubmit={handleLogin}>
            <img src={Logo} alt="Logo_IndieStream" className={styles.logo} /> 
            <h2 className={styles.h2}>Entre em sua conta</h2>

          <div className={styles.grupoInput}>
            <label htmlFor="email">Nome de usuário</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Insira seu email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={styles.input}
            />
          </div>

          <div className={styles.grupoInput}>
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Insira sua senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={styles.input}
            />
          </div>

          <a href="/EsqueceuSenha" className={styles.linkEsqueciSenha}>Esqueceu sua senha?</a>

          {error && <p className={styles.erro}>{error}</p>}

          <button type="submit" className={styles.botao}>Login</button>

          <p className={styles.text}>Não possui conta? <a href="/cadastro" className={styles.link}>Cadastre-se</a></p>
        </form>
      ) : (
        <div className={styles.perfilUsuario}>
          <img src={user.imagem} alt={user.nome} className={styles.perfilUsuarioImg} />
          <h2 className={styles.perfilUsuarioH2}>Bem-vindo, {user.nome}</h2>
          {user.Premiom && <p className={styles.perfilUsuarioP}>Você é um usuário Premium!</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
