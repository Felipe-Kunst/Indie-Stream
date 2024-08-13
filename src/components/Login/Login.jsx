import React, { useState } from 'react';
import './Login.css';
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
    <div className="container-login">
      {!user ? (
        <form onSubmit={handleLogin}>
            <img src={Logo} alt="Logo_IndieStream" className="logo" /> 
            <h2>Entre em sua conta</h2>

          <div className="grupo-input">
            <label htmlFor="email">Nome de usuário</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Insira seu email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="grupo-input">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Insira sua senha" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <a href="/EsqueceuSenha" className="link-esqueci-senha">Esqueceu sua senha?</a>

          {error && <p className="erro">{error}</p>}

          <button type="submit">Login</button>

          <p>Não possui conta? <a href="/cadastro">Cadastre-se</a></p>
        </form>
      ) : (
        <div className="perfil-usuario">
          <img src={user.imagem} alt={user.nome} />
          <h2>Bem-vindo, {user.nome}</h2>
          {user.Premiom && <p>Você é um usuário Premium!</p>}
        </div>
      )}
    </div>
  );
}

export default Login;
