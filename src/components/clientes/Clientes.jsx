import React from 'react';

// imagens
import solNascente from '../../assets/solNascente.jpeg';
import espacoDiva from '../../assets/espacodiva.jpeg';
import gmidi from '../../assets/gmidi.jpg';
import fazendoArte from '../../assets/fazendoarte.jpeg';

const Clientes = () => {
  return (
    <div className="clients">
      <h2 className="sectionTitle">Principais Clientes</h2>
      <div className="logosClients">
        <img src={solNascente} alt="Sol Nascente" id="logoTop1" />
        <img src={espacoDiva} alt="Espaço Diva" id="logoTop2" />
        <img src={gmidi} alt="Gmidi" id="logoBottom1" />
        <img src={fazendoArte} alt="Fazendo Arte" id="logoBottom2" />
      </div>
    </div>
  );
};

export default Clientes;
