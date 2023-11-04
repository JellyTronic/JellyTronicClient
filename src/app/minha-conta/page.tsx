'use client'

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar'; // Componente da barra lateral
import OrderCard from './pedidos/components/OrderCard'; // Importe o componente OrderCard
import Link from 'next/link';
import Order from '@/types/Order';

const Account = () => {
  const [latestOrder, setLatestOrder] = useState<Order>(); // Estado para armazenar o último pedido

  useEffect(() => {
    const token = sessionStorage.getItem('secretToken');
    const idUser = sessionStorage.getItem('id');

    if (token && idUser) {
      // Realize a solicitação para obter o último pedido do usuário
      fetchLatestOrder(idUser);
    }
  }, []);

  const fetchLatestOrder = async (idUserClient: string) => {
    try {
      const response = await fetch(`https://129.148.27.50/api/pedido/cliente/${idUserClient}`);
      if (response.ok) {
        const pedidosUser = await response.json();
        if (pedidosUser.length > 0) {
          // O último pedido estará no final do array
          setLatestOrder(pedidosUser[pedidosUser.length - 1]);
        }
      } else {
        // Trate erros de solicitação aqui, se necessário
        console.error('Erro ao buscar o último pedido');
      }
    } catch (error) {
      console.error('Erro ao buscar o último pedido:', error);
    }
  };

  return (
    <div className="container mx-auto pl-2 pb-4 mt-8 bg-gray-200">
      <div className="lg:flex">
        <Sidebar activeLink={'minha-conta'} />
        <main className="flex-1 p-4 bg-white rounded-md mt-4 mr-4">
          <h2 className="text-lg font-semibold mb-2">Seu Último Pedido:</h2>
          <p>aqui tá seu pedido mais recente, acompanhe todos pelo menu lateral pedidos ou <Link href={'/minha-conta/pedidos'} className='text-primary font-semibold underline'>click aqui</Link></p>
          {latestOrder && (
            <div className='mt-6'>
              <OrderCard key={latestOrder.id} order={latestOrder} />
            </div>
          )}
          {/* Outros componentes e informações do usuário */}
        </main>
      </div>
    </div>
  );
};

export default Account;
