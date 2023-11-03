'use client'

import Button from '@/components/Button';
import { perfil } from '@/utils/apiUrl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddressCard from './components/AddressCard';
import { CiLocationOn } from 'react-icons/ci';
import ResumoPayment from './components/ResumoPayment';



const Address = ({ params }: { params: { cartId: string } }) => {
  const [cartId, setCartId] = useState(params.cartId);
  const [idUser, setIdUser] = useState();
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [addresses, setAdresses] = useState<AddressPayment[]>([]);


  useEffect(() => {
    const currentToken = sessionStorage.getItem("secretToken");
    const id = sessionStorage.getItem("id");

    if (!currentToken) {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
      setToken(currentToken!);
      fetch(`https://129.148.27.50/api/cliente/addresses/${id}`)
        // headers: {
        //   Authorization: `Bearer ${currentToken}`,
        // },
        // method: "GET",
        // })
        .then((response) => response.json())
        .then((data) => {
          // const newCep = data.data.deliveryAddress.cep.replace("-", "");
          console.log(data);
          setAdresses(data);
          // setCep(data.data.deliveryAddress.cep);
          // setAddressId(data.data.deliveryAddress.id);
          // setComplement(data.data.deliveryAddress.complement);
          // setNumber(data.data.deliveryAddress.number);
          // setReference(data.data.deliveryAddress.reference);

          // fetch(`https://viacep.com.br/ws/${newCep}/json`, {
          //   method: "GET",
          // })
          //   .then((response) => response.json())
          //   .then((data) => {
          //     console.log(data);
          //     setAdresses(data);
          //   });
        });
    }
  }, []);



  return (
    <div className="mx-auto container mt-2">
      <h1 className='font-semibold text-xl mb-4'>opções de entrega</h1>
      <div className='flex'>
        <div className="p-8 rounded shadow-md bg-gray-300 w-[70%] h-full">
          <h2 className="text-1xl font-semibold mb-4">endereço de entrega</h2>

          <div className="mb-4">
            <label htmlFor="endereco" className="block text-gray-700">Escolha o Endereço:</label>
            <select name="endereco" id="endereco" className="w-full p-2 border rounded">
              {addresses.map((address, index) => (
                <option key={index} value={address.id}>
                  {address.street}, {address.district}, {address.city}, {address.state}
                </option>
              ))}
            </select>
          </div>

          {addresses.map((address, index) => (
            <div key={index}>
              <AddressCard address={address} />
            </div>
          ))}
        </div>

        <ResumoPayment cartId={cartId} />

      </div>


    </div>
  );
};

export default Address;
