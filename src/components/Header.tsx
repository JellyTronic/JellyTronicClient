'use client'

import Image from 'next/image';
// import { signIn, signOut, useSession } from 'next-auth/react';
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';
import { BiSearchAlt, BiSolidMap } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';
import { FiLogOut } from 'react-icons/fi';
import { BsFillPersonPlusFill, BsFillPersonFill, BsPersonFill, BsBoxFill } from 'react-icons/bs';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { CgFileDocument } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { perfil } from '@/utils/apiUrl';

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuIsOpenDesk, setMenuIsOpenDesk] = useState(false);

  const [idSessionStorage, setIdSessionStorage] = useState<string>();
  const [token, setToken] = useState<string>();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = sessionStorage.getItem("id");
      const secretToken = sessionStorage.getItem("secretToken");
      setIdSessionStorage(id!);
      setToken(secretToken!)

      if (id && secretToken) {
        (async () => {
          try {
            const response = await fetch(`${perfil.api_online}/${id}`, {
              headers: {
                Authorization: `Bearer ${secretToken}`,
              },
              method: "GET",
            });


            if (response.ok) {
              const data = await response.json();
              const nomeCompleto = data.data.name;
              const partesDoNome = nomeCompleto.split(" ");
              const primeiroNome = partesDoNome[0];
              setName(primeiroNome);
            } else {
              console.log("deu erro")
            }

          } catch (error) {
            console.error("Erro ao buscar dados do perfil:", error);
          }
        })();
      }
    }

  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/'
  }

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);
  const handleMenuDeskClick = () => setMenuIsOpenDesk(!menuIsOpenDesk);

  return (
    <div className='container mx-auto p-2 pt-4 lg:pt-1'>
      <div className='flex justify-between items-center lg:border-b lg:border-gray-500'>
        <div className='flex items-center p-2 px-3 relative'>

          <Link href='/'>
            <div className='hidden lg:flex relative h-[100px] w-[120px]'>
              <Image src='/logo.png' alt='ShopWave' fill objectFit='cover'/>
            </div>
          </Link>

          <div className="hidden lg:flex items-center justify-between border border-grayPrimary border-solid ml-[3%] mt-1 rounded-lg px-3 w-[500px] pr-4 lg:ml-16">
            <input type="text" placeholder='Search...' className='pl-2 h-10 w-[85%] focus:outline-none' />
            <div className='cursor-pointer'>
              <BiSearchAlt size={30} />
            </div>
          </div>

          {!menuIsOpen ? (
            <AiOutlineMenu size={25} color='#f36300' onClick={handleMenuClick} className='cursor-pointer lg:hidden' />
          ) : (
            <AiOutlineClose size={25} color='#f36300' onClick={handleMenuClick} className='cursor-pointer lg:hidden' />
          )}

          {menuIsOpen && (

            <div className='z-50 absolute top-12 left-[-8px] w-[260px] h-auto bg-white rounded-lg shadow-md flex flex-col justify-center p-2 pl-4'>

              {token ? (
                <>
                  <p className='flex items-center gap-2 text-xl font-semibold p-2 hover:font-semibold  hover:text-primary'>
                    <BsFillPersonFill />Bem-vindo, {name}
                  </p>

                  <Link href={'/cart'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-semibold p-2 hover:font-semibold hover:text-primary'><AiOutlineShoppingCart />Carrinho</p>
                  </Link>

                  <Link href={'/myRequests'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-semibold p-2 hover:font-semibold hover:text-primary'><BsBoxFill />Meus pedidos</p>
                  </Link>

                  <Link href={'/'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-semibold p-2 hover:font-semibold hover:text-primary'><CgFileDocument />Terms & Conditions</p>
                  </Link>

                  <Link href={'/'} onClick={() => setMenuIsOpen(false)} className='pb-2'>
                    <p className='flex items-center gap-2 text-xl font-semibold p-2 hover:font-semibold hover:text-primary'><MdOutlinePrivacyTip />Privacy Policy</p>
                  </Link>
                  <p
                    className='flex items-center justify-center gap-2 text-primary pt-1 text-lg font-bold border-t border-gray-800 w-[100%] cursor-pointer'
                    onClick={handleLogout}
                  >
                    <AiOutlineLogout size={22} />Logout
                  </p>
                </>
              ) : (
                <>
                  <Link href={'/cadastro'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold  hover:text-primary'><BsFillPersonPlusFill />Cadastre-se</p>
                  </Link>

                  <Link href={'/login'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold hover:text-primary'><BsFillPersonFill />Acesse agora</p>
                  </Link>

                  <Link href={'/'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold hover:text-primary'><CgFileDocument />Terms & Conditions</p>
                  </Link>

                  <Link href={'/'} onClick={() => setMenuIsOpen(false)} className='pb-2'>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold hover:text-primary'><MdOutlinePrivacyTip />Privacy Policy</p>
                  </Link>

                </>
              )}
            </div>
          )}

        </div>

        <Link href='/' className='pl-4'>
          <div className='relative h-[32px] w-[183px] lg:hidden'>
            <Image src='/logoName.png' alt='ShopWave' fill objectFit='cover'/>
          </div>
        </Link>

        {token ? (
          <>
            <div className='pr-2'>
              <div className='hidden lg:flex lg:items-center'>
                <BsPersonFill color='#f36300' size={34} />
                <div className='hidden lg:flex flex-col ml-2'>
                  <p>Olá, <span className='text-primary cursor-pointer'>{name}</span></p>
                  <div className='lg:flex lg:items-center lg:justify-center cursor-pointer' onClick={handleMenuDeskClick}>
                    <p className='text-primary block lg:ml-0 mt-1'>
                      Minha conta
                    </p>
                    <div className='lg:pl-1 lg:pt-1'>
                      <IoIosArrowDown className='text-primary' size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='pr-2'>
              <div className='hidden lg:flex lg:items-center'>
                <BsPersonFill color='#f36300' size={34} />
                <div className='hidden lg:flex flex-col ml-2'>
                  <p>Faça seu <Link href={'/login'} className='text-primary'>login</Link> ou </p>
                  <Link href={'/cadastro'} className='text-primary block lg:inline-block lg:ml-0 mt-1'>
                    cadastre-se
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {menuIsOpenDesk && (
          <div className='z-50 absolute top-24 right-[8em] w-[260px] h-auto bg-slate-200 rounded-lg shadow-md flex flex-col justify-center p-2 pl-4'>

            <Link href={'/minha-conta'} className='flex items-center gap-2 text-lg font-semibold p-2 hover:font-semibold  hover:text-primary'>
              <BsFillPersonFill size={22} />ver minha conta {name}
            </Link>

            <Link href={'/minha-conta/pedidos'} onClick={() => setMenuIsOpen(false)}>
              <p className='flex items-center gap-2 text-xl font-semibold p-2 hover:font-semibold hover:text-primary'><BsBoxFill />pedidos</p>
            </Link>

            <Link href={'/minha-conta/endereco'} onClick={() => setMenuIsOpen(false)} className='pb-2'>
              <p className='flex items-center gap-2 text-xl font-semibold p-2 hover:font-semibold hover:text-primary'><BiSolidMap />endereço</p>
            </Link>

            <p
              className='flex items-center justify-center gap-2 text-primary pt-1 text-lg font-bold border-t border-gray-800 w-[100%] cursor-pointer'
              onClick={handleLogout}
            >
              <FiLogOut color={'#f36300'} size={22} />Logout
            </p>
          </div>
        )}

        <div className='pr-2'>
          <Link href={'/cart'}>
            <AiOutlineShoppingCart color='#f36300' size={34} />
          </Link>
        </div>

      </div>
      <div className="flex items-center justify-between border border-grayPrimary border-solid ml-[3%] mt-1 rounded-lg px-3 w-[95%] pr-4 lg:hidden">
        <input type="text" placeholder='Search...' className='pl-2 h-10 w-[85%] focus:outline-none' />
        <div className='cursor-pointer'>
          <BiSearchAlt size={30} />
        </div>
      </div>
    </div >

  );
}

export default Header;
