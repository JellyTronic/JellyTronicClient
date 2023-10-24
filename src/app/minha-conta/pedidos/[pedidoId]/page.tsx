'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar'; // Componente da barra lateral
import OrderDetails from './components/OrderDetails';
import Loading from '@/app/loading';
// import Pedido from '@/types/Order';
// import { formatPrice } from '@/providers/formatCurrency';
// import OrderCard from './components/OrderCard';
// import Order from '@/types/Order';

// Função para formatar o status


const PedidosById = ({ params }: { params: { pedidoId: string } }) => {

  const [secretToken, setSecretToken] = useState<string>('');
  const [idUserClient, setIdUserClient] = useState<string>('');
  const [orders, setOrders] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOrderId(params.pedidoId)

    const teste = params.pedidoId

    const token = sessionStorage.getItem("secretToken")
    const idUser = sessionStorage.getItem("id")

    if (token && idUser) {
      getCartUserLogin(teste);
      console.log(teste)
    }

  }, []);

  const getCartUserLogin = async (order_id: string) => {
    console.log(orderId)
    const response = await fetch(`https://129.148.27.50/api/pedido/${order_id}`);
    const pedidosUser = await response.json();
    console.log(pedidosUser);
    setOrders(pedidosUser);
    console.log(orders);
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto pl-2 pb-4 mt-8 bg-gray-200">
      <div className="flex">
        <Sidebar activeLink={'pedidos'} />
        <div className="flex-1 p-4 bg-white rounded-md mt-4 mr-4">
          <h1 className="text-2xl font-semibold mb-4">Detalhes do meu pedido</h1>
          {isLoading === true ? (
            <Loading />
          ) : (
            <>
              {orders != null && (
                <OrderDetails order={orders[0]} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PedidosById;
