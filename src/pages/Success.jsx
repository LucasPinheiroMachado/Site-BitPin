import React from 'react';
import useVh from '../hooks/useVh';
import { Link } from 'react-router-dom';

const Success = () => {
  useVh();
  return (
    <div className="success">
      <h1>Solicitação enviada com sucesso!</h1>
      <h2>
        Obrigado por solicitar nossos serviços, <br />
        em breve um atendente da BitPin entrará em contato!
      </h2>
      <Link to="/" className="backToHome">
        Voltar para home
      </Link>
    </div>
  );
};

export default Success;
