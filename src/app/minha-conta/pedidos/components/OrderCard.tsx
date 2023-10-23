import React, { useState } from 'react';
// import { formatStatus } from './orderStatusUtil'; // Importe a função formatStatus
import Order from '@/types/Order';
import Image from 'next/image';
import Link from 'next/link';
// import ReactAccordion from 'react-accordion';
import Accordion from 'react-accordion';
// import Accordion, { AccordionProps } from 'react-accordion';

// import 'react-accordion/dist/Accordion.css';
// import { formatStatus } from '@/providers/formatOrderStatus';

interface OrderCardProps {
  order: Order;
}

// interface OrderStatusIndicatorProps {
//   status: number;
// }

const OrderCard = ({ order }: OrderCardProps) => {

  const formatStatus = (status: number) => {
    const statusMap: Record<number, string> = {
      0: 'Carrinho',
      1: 'Emitido',
      2: 'Pagamento Aprovado',
      3: 'Em Transporte',
      4: 'Recebido',
      5: 'Cancelado',
      6: 'Pagamento Não Aprovado',
      7: 'Problemas com o Transporte',
      8: 'Problemas no Recebimento',
    };
    return statusMap[status] || 'Desconhecido';
  };

  const getStatusLineClass = (currentStatus: number, targetStatus: number) => {
    return currentStatus >= targetStatus ? 'bg-primary' : 'bg-gray-300';
  };



  // const OrderStatusIndicator: React.FC<OrderStatusIndicatorProps> = ({ status }) => {
  //   const statusMap: Record<number, string> = {
  //     0: 'Carrinho',
  //     1: 'Emitido',
  //     2: 'Pagamento Aprovado',
  //     3: 'Em Transporte',
  //     4: 'Recebido',
  //     5: 'Cancelado',
  //     6: 'Pagamento Não Aprovado',
  //     7: 'Problemas com o Transporte',
  //     8: 'Problemas no Recebimento',
  //   };
  // };

  const statusLabels = [
    'Pedido Emitido',
    'Pagamento Aprovado',
    'Em Transporte',
    'Recebido',
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <Link href={`/minha-conta/pedidos/${order.id}`}>
        <div className="mb-4 flex items-start">
          <div className="mr-4">
            <Image
              src={order.sale_items[0].product_img}
              alt={order.sale_items[0].product_name}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="w-full">
            <p className="text-lg font-semibold text-gray-800">
              Pedido #{order.id}
            </p>
            <p className="text-sm text-gray-600">
              Status: {formatStatus(order.status)}
            </p>
            <p className="text-sm text-gray-600">
              Data de Emissão: {order.emission_date || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">
              Tipo de Entrega: {order.delivery_type}
            </p>
            <p className="text-sm text-gray-600">
              Total: R$ {order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>

      <div className="border-t border-gray-300 pt-4 mt-4">
        <p className="text-lg font-semibold text-gray-800">Detalhes da Entrega</p>
        <p className="text-sm text-gray-600">
          Endereço: {order.delivery_address.street}, {order.delivery_address.number}
        </p>
        <p className="text-sm text-gray-600">
          Complemento: {order.delivery_address.complement || 'N/A'}
        </p>
        <p className="text-sm text-gray-600">
          CEP: {order.delivery_address.cep}
        </p>
      </div>
      <div className="border-t border-gray-300 pt-4 mt-4">
        <p className="text-lg font-semibold text-gray-800">Detalhes do Produto</p>
        <p className="text-sm text-gray-600">
          Nome do Produto: {order.sale_items[0].product_name}
        </p>
        <p className="text-sm text-gray-600">
          Quantidade: {order.sale_items[0].amount}
        </p>
        <p className="text-sm text-gray-600">
          Preço Unitário: R$ {order.sale_items[0].unity_price.toFixed(2)}
        </p>
      </div>



      {/* status */}
      <div className="flex mt-4">

        <div className="flex-1 relative text-center">
          <div className={`w-4 h-4 mx-auto rounded-full ${order.status >= 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
          <p className="text-xs mt-1">Pedido Emitido</p>
        </div>
        <div className="w-1/4 relative flex mt-1 ml-[-5em]">
          <div className={`w-1/2 h-2 relative ${order.status >= 1 ? 'bg-primary' : 'bg-gray-300'}`}>
            {order.status === 1 && (
              <div className="w-[0.55em] h-[0.55em] mt-1 bg-primary transform rotate-45 absolute right-[-0.2em] -translate-y-1/2" />
            )}
          </div>
          <div className={`w-1/2 h-2 ${order.status >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
        </div>


        <div className="flex-1 relative text-center ml-[-5em]">
          <div className={`w-4 h-4 mx-auto rounded-full ${order.status >= 2 ? 'bg-primary' : 'bg-gray-300'}`} />
          <p className="text-xs mt-1">Pagamento Aprovado</p>
        </div>
        <div className="w-1/4 relative flex mt-1 ml-[-5em]">
          <div className={`w-1/2 h-2 relative ${order.status >= 2 ? 'bg-primary' : 'bg-gray-300'}`}>
            {order.status === 2 && (
              <div className="w-[0.55em] h-[0.55em] mt-1 bg-primary transform rotate-45 absolute right-[-0.2em] -translate-y-1/2" />
            )}
          </div>
          <div className={`w-1/2 h-2 ${order.status >= 3 ? 'bg-primary' : 'bg-gray-300'}`} />
        </div>


        <div className="flex-1 relative text-center ml-[-5em]">
          <div className={`w-4 h-4 mx-auto rounded-full ${order.status >= 3 ? 'bg-primary' : 'bg-gray-300'}`} />
          <p className="text-xs mt-1">Em Transporte</p>
        </div>
        <div className="w-1/4 relative flex mt-1 ml-[-5em]">
          <div className={`w-1/2 h-2 relative ${order.status >= 3 ? 'bg-primary' : 'bg-gray-300'}`}>
            {order.status === 3 && (
              <div className="w-[0.55em] h-[0.55em] mt-1 bg-primary transform rotate-45 absolute right-[-0.2em] -translate-y-1/2" />
            )}
          </div>
          <div className={`w-1/2 h-2 ${order.status >= 4 ? 'bg-primary' : 'bg-gray-300'}`} />
        </div>

        {order.status <= 4 && (

          <div className="flex-1 relative text-center ml-[-5em]">
            <div className={`w-4 h-4 mx-auto rounded-full ${order.status >= 4 ? 'bg-primary' : 'bg-gray-300'}`} />
            <p className="text-xs mt-1">Recebido</p>
          </div>

        )}

      </div>

      <div className='flex items-center justify-center mt-10'>
        <Link href={`/minha-conta/pedidos/${order.id}`} className="text-gray-700 underline">
          click aqui e saiba mais detalhes do pedido
        </Link>

      </div>



    </div >

  );
};

export default OrderCard;
