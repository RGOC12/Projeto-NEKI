import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cadastro.css';
import Logo from '../../assets/Logo-Neki.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaConfirmacao, setMostrarSenhaConfirmacao] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (nome === '' || email === '' || senha === '') {
      setMensagemErro('Preencha todos os campos');
      return;
    }

    try {
      const response = await axios.get(`https://65676a8c64fcff8d731055ca.mockapi.io/User?email=${email}`);

      if (response.data.length > 0) {
        setMensagemErro('Email já cadastrado');
        await axios.post('https://65676a8c64fcff8d731055ca.mockapi.io/User', { nome, email, senha });
        setMensagemErro('');
        console.log('Cadastro efetuado com sucesso!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setMensagemErro('Ocorreu um erro ao cadastrar. Tente novamente mais tarde.');
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const toggleMostrarSenhaConfirmacao = () => {
    setMostrarSenhaConfirmacao(!mostrarSenhaConfirmacao);
  };

  return (
    <div>
        <Header />
        <img src={Logo} alt="Logotipo" className="Logotipo" />
      <div className="container">
      <form className="cadastro" onSubmit={handleCadastro}>
        {mensagemErro && <div className="mensagem-erro">{mensagemErro}</div>}
        <h1 className="title">Cadastro</h1>
        <input
          className="campo"
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="campo"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="senha-container">
          <input
            className="campo senha"
            name="senha"
            type={mostrarSenha ? 'text' : 'password'}
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {mostrarSenha ? <FaEyeSlash className="olho" onClick={toggleMostrarSenha} /> : <FaEye className="olho" onClick={toggleMostrarSenha} />}
        </div>
        <div className="senha-container">
          <input
            className="campo senha"
            name="confirmarSenha"
            type={mostrarSenhaConfirmacao ? 'text' : 'password'}
            placeholder="Confirmar senha"
          />
          {mostrarSenhaConfirmacao ? <FaEyeSlash className="olho" onClick={toggleMostrarSenhaConfirmacao} /> : <FaEye className="olho" onClick={toggleMostrarSenhaConfirmacao} />}
        </div>
        <button className="button" type="submit">Cadastrar</button>
      </form>
      <Footer />
      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          padding-top: 20px;
        }

        .cadastro {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .title {
          margin-bottom: 20px;
        }

        .campo {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 100%;
          box-sizing: border-box;
        }

        .senha-container {
          position: relative;
          width: 100%;
        }

        .olho {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }

        .mensagem-erro {
          color: red;
          margin-bottom: 10px;
        }

        .button {
          margin-top: 10px;
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
        }

        .button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
    </div>
  );
}