'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/sidebar'; // Componente da barra lateral
import Pedido from '@/types/Order';
import { formatPrice } from '@/providers/formatCurrency';
import OrderCard from './components/OrderCard';
import Order from '@/types/Order';
import Button from '@/components/Button';
import Link from 'next/link';

// Função para formatar o status


const Pedidos = () => {

  const [secretToken, setSecretToken] = useState<string>('');
  const [idUserClient, setIdUserClient] = useState<string>('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const token = sessionStorage.getItem("secretToken")
    const idUser = sessionStorage.getItem("id")

    if (token && idUser) {
      getCartUserLogin(idUser);
    }

  }, []);

  const getCartUserLogin = async (idUserClient: string) => {
    const response = await fetch(`https://129.148.27.50/api/pedido/cliente/${idUserClient}`);
    const pedidosUser = await response.json();
    console.log(pedidosUser.reverse());
    setOrders(pedidosUser);
  }

  return (
    <>
      {orders.length ? (
        <div className="container mx-auto pl-2 pb-4 mt-8 bg-gray-200">
          <div className="lg:flex">
            <Sidebar activeLink={'pedidos'} />
            <div className="flex-1 p-4 bg-white rounded-md mt-4 mr-4">
              <h1 className="text-2xl font-semibold mb-4">Meus Pedidos</h1>
              <div>
                {orders.map((order: Order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto pl-2 pb-4 mt-8 bg-gray-200">
          <div className="flex">
            <Sidebar activeLink={'pedidos'} />
            <div className="flex-1 p-4 bg-white rounded-md mt-4 mr-4">
              <h1 className="text-2xl font-semibold mb-4">Meus Pedidos</h1>
              <div className='flex flex-col items-center'>
                <p className='mb-6'>
                  Você ainda não possui nenhuma compra, clique no botão abaixo e comece a comprar
                </p>
                <Button>
                  <Link href={'/'}>Começar a comprar</Link>
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pedidos;
