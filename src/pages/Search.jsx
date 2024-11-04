// hooks
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useQuery } from '../hooks/useQuery';
import { useLocalFilter } from '../hooks/useLocalFilter'; // Importa o hook de filtro local

// components
import OrderDetail from '../components/OrderDetail/OrderDetail'; // Novo componente para exibir detalhes dos pedidos
import { Link } from 'react-router-dom';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  // Busca os pedidos da coleção 'projects'
  const { documents: orders } = useFetchDocuments('projects');

  // Aplica o filtro local nos pedidos
  const filteredOrders = useLocalFilter(orders, search);

  return (
    <div className="requests">
      <h1>Resultados encontrados para: {search}</h1>
      <div className="order-list">
        {!filteredOrders.length && (
          <p>Não foram encontrados pedidos a partir da sua busca...</p>
        )}
        {filteredOrders.map((order) => (
          <OrderDetail key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Search;
