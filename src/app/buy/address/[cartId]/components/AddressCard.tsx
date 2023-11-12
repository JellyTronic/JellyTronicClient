import Button from '@/components/Button';
import { formatPrice } from '@/providers/formatCurrency';
import React from 'react';

interface AddressCardPorps {
  address: AddressPayment;
}

const AddressCard = ({ address }: AddressCardPorps) => {

  const addValueFrete = (number:number, value:number) => {
    sessionStorage.setItem('typeEntrega', number.toString());
    sessionStorage.setItem('valueEntrega', value.toString());

    window.location.reload();
  }

  return (
    <div className='lg:flex lg:justify-between'>
      <div className="border p-4 rounded-lg shadow-md mb-1 bg-gray-100 w-[100%] lg:w-[70%]">

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

        </div>

      </div>

      <div className='flex lg:mt-2 lg:block'>
        <div>
          <p className='font-medium text-lg'>entrega padrão:</p>
          <Button variant='border'onClick={() => addValueFrete(1, address.freight.default)}>{formatPrice(address.freight.default)}</Button>
        </div>

        <div>
          <p className='font-medium text-lg lg:mt-4'>entrega express:</p>
          <Button variant='outlined' onClick={() => addValueFrete(2,address.freight.express)}>{formatPrice(address.freight.express)}</Button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
