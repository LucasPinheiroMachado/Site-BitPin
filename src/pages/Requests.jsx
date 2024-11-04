// hooks
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import OrderDetail from '../components/OrderDetail/OrderDetail';

const Requests = () => {
  const [query, setQuery] = useState('');
  const { documents: orders, loading } = useFetchDocuments('projects'); // Trazendo os pedidos da coleção 'orders'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="requests">
      <h1>Veja os pedidos mais recentes:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por nome, email..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {orders &&
          orders.map((order) => <OrderDetail key={order.id} order={order} />)}
        {orders && orders.length === 0 && (
          <div className="noorders">
            <p>Não foram encontrados pedidos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
