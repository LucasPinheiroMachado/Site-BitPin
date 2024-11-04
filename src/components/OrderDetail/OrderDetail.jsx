const OrderDetail = ({ order }) => {
  return (
    <div className="order">
      <h3>Serviço: {order.serviceType}</h3>
      <p>
        <strong>Nome:</strong> {order.name}
      </p>
      <p>
        <strong>Tipo de Pessoa:</strong> {order.personType}
      </p>
      <p>
        <strong>CPF/CNPJ:</strong> {order.cpf_cnpj}
      </p>
      <p>
        <strong>Email:</strong> {order.email}
      </p>
      <p>
        <strong>Telefone:</strong> {order.phone}
      </p>
      <p>
        <strong>Descrição do Projeto:</strong> {order.projectDescription}
      </p>
    </div>
  );
};

export default OrderDetail;
