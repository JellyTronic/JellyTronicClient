'use client'

import Button from '@/components/Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddressCard from './components/AddressCard';
import ResumoPayment from './components/ResumoPayment';
import { AddressData } from '@/types/cepVia';
import { apiAtualizarEndereco } from '@/utils/apiUrl';

const Address = ({ params }: { params: { cartId: string } }) => {
  const [cartId, setCartId] = useState(params.cartId);
  const [idUser, setIdUser] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const [addresses, setAdresses] = useState<AddressPayment[]>([]);
  const [cep, setCep] = useState<AddressData[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number>();
  const [addressNumber, setAddressNumber] = useState<string>('');
  const [addressCep, setAddressCep] = useState<string>('');
  const [addressReference, setAddressReference] = useState<string>('');
  const [addressComplement, setAddressComplement] = useState<string>('');

  const [newAddress, setNewAddress] = useState({
    cep: '',
    number: '',
    complement: '',
    reference: '',
  });

  const handleAddressChange = (event: any) => {
    event.preventDefault();
    setSelectedAddress(event.target.value);
    const enderecoId = event.target.value
    // console.log(event.target.value)
    sessionStorage.setItem('idAddress', enderecoId!.toString());
  };

  useEffect(() => {
    const currentToken = sessionStorage.getItem("secretToken");
    const id = sessionStorage.getItem("id");
    setIdUser(id!);

    if (!currentToken) {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
      setToken(currentToken!);
      fetch(`https://129.148.27.50/api/cliente/addresses/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setAdresses(data);
        });
    }
  }, []);



  const handleCep = (event: any) => {
    const cepNew = event.target.value

    fetch(`https://viacep.com.br/ws/${cepNew}/json`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCep([data]);
        setNewAddress({ ...newAddress, cep: data.cep })
      });
  }

  const handleNewAddressSubmit = () => {

    if(newAddress.reference === '') {
      alert('insira uma referencia para a entrega!');
    return;
    };

    if(newAddress.complement === '') {
      alert('insira uma complemeto para a entrega!');
      return;
    }

    if(newAddress.number === '') {
      alert('insira um número para a entrega!');
      return;
    }

    if(newAddress.complement.length <= 3) {
      alert('insira mais de 3 caracteres para o complemento!');
      return;
    }

    if(newAddress.reference.length <= 3) {
      alert('insira mais de 3 caracteres para a referencia!');
      return;
    }

    fetch(`${apiAtualizarEndereco.api_online}/cliente/${idUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newAddress),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Endereço enviado com sucesso:', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro ao enviar endereço:', error);
      });
  };


  return (
    <div className="mx-auto container mt-2">
      <h1 className='font-semibold text-xl mb-4'>opções de entrega</h1>
      <div className='lg:flex'>
        <div className="p-8 rounded shadow-md bg-gray-300 ml-4 lg:ml-0 w-[92%] lg:w-[70%] h-full">
          <h2 className="text-1xl font-semibold mb-4">endereços de entrega</h2>

          <div className="mb-4">
            <p className="block text-gray-700">Escolha o Endereço onde seu pedido será entregue:</p>

            {addresses.map((address, index) => (
              <label key={index} className="flex items-center">

                <div className={`w-6 h-6 flex items-center justify-center rounded-full border ${selectedAddress == address.id ? 'border-primary' : 'border-gray-400'}`}>
                  <div className={`w-3 h-3 rounded-full ${selectedAddress == address.id ? 'bg-primary' : 'bg-gray-200'}`}></div>
                </div>

                <input
                  type="radio"
                  name="endereco"
                  value={address.id}
                  checked={selectedAddress == address.id}
                  onChange={handleAddressChange}
                  className="hidden"
                />

                <div className="p-4 rounded w-[80%]">
                  <AddressCard address={address} />
                </div>
              </label>

            ))}
          </div>

          <div>
            <h3>Deseja adicionar outro dendereço para entrega ?</h3>

            <div className='lg:flex items-center'>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className='mr-3'>
                  <input type="text"
                    className='mr-3 p-3 rounded-md'
                    maxLength={8}
                    placeholder="99999-999"
                    onChange={handleCep}
                  />
                </div>
              </form>
              <Link href="https://buscacepinter.correios.com.br/app/endereco/index.php" target='_blank' className='text-gray-800'>não sei meu cep</Link>
            </div>
          </div>

          {cep.length >= 1 && (
            <>
              <div className='flex flex-wrap w-full'>

                <div className='w-full mb-4 mt-4'>
                  <label htmlFor="endereco" >endereço</label>
                  <input type="text" value={cep[0].logradouro} disabled className='bg-gray-200 p-2 w-full rounded-md mr-4' />
                </div>

                <div className='w-full mb-4'>
                  <label htmlFor="bairro">bairro</label>
                  <input type="text" value={cep[0].bairro} disabled className='bg-gray-200 p-2 w-full rounded-md mr-4' />
                </div>

                <div className='w-full mb-4 flex flex-col'>
                  <label htmlFor="cidade">cidade</label>
                  <input type="text" value={cep[0].localidade} disabled className='bg-gray-200 p-2 w-[80%] rounded-md mr-4' />
                </div>

                <div className='w-full mb-4 flex flex-col'>
                  <label htmlFor="uf">estado</label>
                  <input type="text" value={cep[0].uf} disabled className='bg-gray-200 p-2 w-[30%] rounded-md mr-4' />
                </div>

                <div className='w-full flex flex-col'>
                  <label htmlFor="number">número</label>
                  <input
                    type="text"
                    className='bg-gray-100 p-2 w-[30%] rounded-md mr-4'
                    placeholder="Ex: 999"
                    required
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, number: e.target.value })
                    }
                  />
                </div>

                <div className='w-full mt-4'>
                  <label htmlFor="complemento">complemento</label>
                  <input
                    type="text"
                    className='bg-gray-100 p-2 w-full rounded-md mr-4 mb-4'
                    placeholder="Ex: casa 01"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, complement: e.target.value })
                    }
                  />
                </div>

                <div className='w-full mt-4'>
                  <label htmlFor="referencia">referencia</label>
                  <input
                    type="text"
                    className='bg-gray-100 p-2 w-full rounded-md mr-4 mb-4'
                    placeholder="Ex: próximo a pádaria Dom João"
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, reference: e.target.value })
                    }
                  />
                </div>

              </div>

              <Button onClick={handleNewAddressSubmit}>Enviar novo endereço</Button>
            </>
          )}

        </div>

        <ResumoPayment cartId={cartId} />

      </div>


    </div>
  );
};

export default Address;
