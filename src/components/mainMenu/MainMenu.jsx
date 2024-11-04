import imgL from '../../assets/2_20240816_135206_0001.png';

const MainMenu = () => {
  return (
    <div className="main-menu-div">
      <img className="imgL1" src={imgL} alt="" />
      <div className="central-div">
        <h1 className="main-menu-h1">
          Pensando em um projeto web?
          <br />
          Com a <span className="text-blue">BitPin</span> é real!
        </h1>
        <div className="buttom-div">
          <a href="#verServico" className="blue-background-button">
            Ver serviços
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5522998192570"
            target="_blank"
            rel="noopener noreferrer"
            className="blue-border-button"
          >
            Atendimento
          </a>
        </div>
      </div>
      <img className="imgL2" src={imgL} alt="" />
    </div>
  );
};

export default MainMenu;
