import { NavLink, useLocation } from 'react-router-dom';

const Botao = (props) => {
  const location = useLocation(); // Obtemos a localização atual

  // Verifica se o botão deve estar ativo com base na localização atual
  const isActive =
    (props.link === '/' &&
      location.pathname === '/' &&
      location.hash !== '#servicos') || // Ativa o "Menu" apenas quando a localização for "/" e o hash não for "#servicos"
    (props.link === '/#menu' &&
      location.pathname === '/' &&
      location.hash !== '#servicos') || // Ativa "Menu" com hash /#menu, mas não quando hash for "#servicos"
    (props.link === '/about' && location.pathname === '/about') ||
    (props.link === '/requests' && location.pathname === '/requests') || // Ativa "Sobre Nós" quando a localização for "/about"
    (props.link === '/#servicos' && location.hash === '#servicos');

  return (
    <NavLink
      to={props.link || '#'}
      onClick={props.onClick}
      style={{
        color: isActive ? 'black' : '#1A85E8',
        textDecoration: 'none',
        display: 'inline-block',
        borderBottom: isActive ? '2px solid black' : 'none',
        borderRadius: '0',
        cursor: 'pointer',
        marginLeft: '1vw',
        // Mescla o estilo passado via props com o estilo do componente
        ...props.style,
      }}
      className={isActive ? 'active' : ''}
    >
      {props.nome}
    </NavLink>
  );
};

export default Botao;
