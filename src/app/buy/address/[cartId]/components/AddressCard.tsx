import { formatPrice } from '@/providers/formatCurrency';
import React from 'react';

interface AddressCardPorps {
  address: AddressPayment;
}

const AddressCard = ({ address }: AddressCardPorps) => {

  return (
    <div className="border p-4 rounded-lg shadow-md mb-1 bg-gray-100">
      <p>{address.street}, {address.number}</p>
      <p>{address.district} | {address.city} - {address.state}</p>
      <p>{address.cep}</p>

      <div className='mt-2'>
        {!address.complement ? (
          <></>
        ) : (
          <p><span className='font-medium text-lg'>complemento:</span> {address.complement}</p>
        )}

        {!address.reference ? (
          <></>
        ) : (
          <p><span className='font-medium text-lg'>referencia:</span> {address.reference}</p>
        )}


        <div className='mt-2 flex items-center justify-around'>
          <p><span className='font-medium text-lg'>entrega padrão:</span> {formatPrice(address.freight.default)}</p>
          <p><span className='font-medium text-lg'>entrega express:</span> {formatPrice(address.freight.express)}</p>
        </div>

      </div>

    </div>
  );
};

export default AddressCard;
