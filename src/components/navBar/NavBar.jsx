import { useState } from 'react';
import Botao from '../buttons/Buttons';
import logo from '../../assets/logoNavBar3.png';

import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';

const NavBar = () => {
  const { user } = useAuthValue();
  const { logOut } = useAuthentication();

  const [selectedButton, setSelectedButton] = useState('Menu');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = (link, name) => {
    setSelectedButton(name);
    setIsMenuOpen(false); // Fecha o menu quando um botão é clicado

    // Verifica se o link é um hash e força a rolagem se necessário
    if (link.startsWith('/#')) {
      const hash = link.substring(1); // Obtém o hash sem a barra
      const element = document.querySelector(hash);
      if (hash === 'menu') {
        window.scrollTo(0, 0);
        window.location.hash = '';
        window.history.replaceState(null, '', '/');
      } else if (element) {
        const offset = 393 + window.innerHeight * 0.44;
        document.body.scrollTop = offset;
        window.scrollTo(0, offset);
        window.location.hash = ''; // Limpa o hash da URL
        window.history.replaceState(null, '', '/');
      }
    } else {
      // Navegação normal para rotas sem hash
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="navBar">
      <img src={logo} alt="logo" className="logoPrincipal" />
      <div className="toogleMain">
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
      <div className={`buttons ${isMenuOpen ? 'active' : ''}`}>
        <Botao
          nome="Menu"
          link="/#menu"
          selected={selectedButton === 'Menu'}
          onClick={() => handleButtonClick('/#menu', 'Menu')}
        />
        <Botao
          nome="Serviços"
          link="/#servicos"
          selected={selectedButton === 'Servicos'}
          onClick={() => handleButtonClick('/#servicos', 'Servicos')}
        />
        <Botao
          nome="Sobre Nós"
          link="/about"
          selected={selectedButton === 'SobreNos'}
          onClick={() => handleButtonClick('/about#menu', 'SobreNos')}
        />
        {user && (
          <Botao
            nome="Pedidos"
            link="/requests"
            selected={selectedButton === 'SobreNos'}
            onClick={() => handleButtonClick('/requests', 'Pedidos')}
          />
        )}
        {user && (
          <Botao nome="Sair" onClick={logOut} style={{ color: 'red' }} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
