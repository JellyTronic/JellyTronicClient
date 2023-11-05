import React from 'react';

interface AddressCardPorps {
  address: AddressPayment;
}

const AddressCard = ({ address }: AddressCardPorps) => {
  return (
    <div className="border p-4 rounded-lg shadow-md mb-4 bg-gray-100">
      <p>{address.street}, {address.number}</p>
      <p>{address.district} | {address.city} - {address.state}</p>
      <p>{address.cep}</p>

      <div className='mt-4'>
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
  );
};

export default AddressCard;
