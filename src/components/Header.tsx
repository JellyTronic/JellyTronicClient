'use client'

import Image from 'next/image';
// import { signIn, signOut, useSession } from 'next-auth/react';
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineLogout, AiOutlineClose } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { BsFillPersonPlusFill, BsFillPersonFill, BsPersonFill, BsBoxFill } from 'react-icons/bs';
import { MdOutlinePrivacyTip } from 'react-icons/md';
import { CgFileDocument } from 'react-icons/cg';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [nomeLocalStorage, setNomeLocalStorage] = useState<string|null>("");
  const [sobrenomeLocalStorage, setSobrenomeLocalStorage] = useState<string|null>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nome = localStorage.getItem("nome");
      const sobrenome = localStorage.getItem("sobrenome");
      setNomeLocalStorage(nome);
      setSobrenomeLocalStorage(sobrenome);
    }
  }, []);
  // const handleLoginClick = () => {
  //   signIn();
  // };

  // const handleLogoutClick = () => {
  //   setMenuIsOpen(false);
  //   signOut();
  // };

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <div className='container mx-auto p-2 pt-4 lg:pt-1'>
      <div className='flex justify-between items-center lg:border-b lg:border-gray-500'>
        <div className='flex items-center p-2 px-3 relative'>

          <Link href='/'>
            <div className='hidden lg:flex relative h-[100px] w-[120px]'>
              <Image src='/logo.png' alt='ShopWave' fill />
            </div>
          </Link>

          <div className="hidden lg:flex items-center justify-between border border-grayPrimary border-solid ml-[3%] mt-1 rounded-lg px-3 w-[500px] pr-4 lg:ml-16">
            <input type="text" placeholder='Search...' className='pl-2 h-10 w-[85%] focus:outline-none' />
            <div className='cursor-pointer'>
              <BiSearchAlt size={30} />
            </div>
          </div>

          {!menuIsOpen ? (
            <AiOutlineMenu size={25} color='#17a2b8' onClick={handleMenuClick} className='cursor-pointer lg:hidden' />
          ) : (
            <AiOutlineClose size={25} color='#17a2b8' onClick={handleMenuClick} className='cursor-pointer lg:hidden' />
          )}

          {menuIsOpen && (

            <div className='z-50 absolute top-12 left-[-8px] w-[260px] h-auto bg-white rounded-lg shadow-md flex flex-col justify-center p-2 pl-4'>

              {nomeLocalStorage && sobrenomeLocalStorage ? (
                <>
                  <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold  hover:text-primary'>
                    <BsFillPersonFill />Bem-vindo, {nomeLocalStorage} {sobrenomeLocalStorage}
                  </p>

                  <Link href={'/cart'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold hover:text-primary'><AiOutlineShoppingCart />Carrinho</p>
                  </Link>

                  <Link href={'/myRequests'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold hover:text-primary'><BsBoxFill />Meus pedidos</p>
                  </Link>

                  <Link href={'/'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold hover:text-primary'><CgFileDocument />Terms & Conditions</p>
                  </Link>

                  <Link href={'/'} onClick={() => setMenuIsOpen(false)} className='pb-2'>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold hover:text-primary'><MdOutlinePrivacyTip />Privacy Policy</p>
                  </Link>
                  <p
                    className='flex items-center justify-center gap-2 text-primary pt-1 text-lg font-semibold border-t border-gray-800 w-[100%] cursor-pointer hover:font-bold'
                    onClick={() => {
                      setMenuIsOpen(false);
                      localStorage.removeItem("nome");
                      localStorage.removeItem("sobrenome");
                      window.location.reload();
                    }}
                  >
                    <AiOutlineLogout size={22} />Logout
                  </p>
                </>
              ) : (
                <>
                  <Link href={'/user/register'} onClick={() => setMenuIsOpen(false)}>
                    <p className='flex items-center gap-2 text-xl font-medium p-2 hover:font-semibold  hover:text-primary'><BsFillPersonPlusFill />Cadastre-se</p>
                  </Link>

                  <Link href={'/user/login'} onClick={() => setMenuIsOpen(false)}>
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

        <Link href='/'>
          <div className='relative h-[32px] w-[183px] lg:hidden'>
            <Image src='/logoName.png' alt='ShopWave' fill />
          </div>
        </Link>

        <div className='pr-2'>
          <div className='hidden lg:flex lg:items-center'>
            <BsPersonFill color='#17a2b8' size={34} />
            <div className='hidden lg:flex flex-col ml-2'>
              <p>Faça seu <Link href={'/user/login'} className='text-primary'>login</Link> ou </p>
              <Link href={'/user/register'} className='text-primary block lg:inline-block lg:ml-0 mt-1'>
                cadastre-se
              </Link>
            </div>
          </div>
        </div>

        <div className='pr-2'>
          <Link href={'/cart'}>
            <AiOutlineShoppingCart color='#17a2b8' size={34} />
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
