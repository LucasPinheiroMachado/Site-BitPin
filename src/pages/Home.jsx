import React from 'react';
import MainMenu from '../components/mainMenu/MainMenu';
import Clientes from '../components/clientes/Clientes';
import ServicesCompany from '../components/servicesCompany/ServicesCompany';
import Form from '../components/Form/Form';

const Home = () => {
  return (
    <>
      <MainMenu />
      <Clientes />
      <div id="verServico"></div>
      <ServicesCompany />
      <div id="solicitarServico"></div>
      <Form />
    </>
  );
};

export default Home;
