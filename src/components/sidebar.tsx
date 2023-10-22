// Sidebar.js

import Link from 'next/link';
import React from 'react';
import { BiArrowFromLeft, BiArrowFromRight } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { BsBox, BsChevronRight, BsPerson } from 'react-icons/bs';

interface SidebarProps{
  activeLink: string;
}

const Sidebar = ({ activeLink }:SidebarProps) => {
  return (
    <nav className="bg-gray-200 w-[22em] mt-12 p-4">
      <ul>
        <li className={`bg-white rounded-xl p-2 mb-2 ${activeLink === 'minha-conta' ? 'border-l-2 border-primary' : ''}`}>
          <a href="/minha-conta">Minha Conta</a>
        </li>

        <li className={`bg-white rounded-xl pl-3 py-2 mb-2 pr-1 cursor-pointer ${activeLink === 'pedido' ? 'border-l-2 border-primary' : ''}`}>
          <Link href="/minha-conta/pedidos" className='flex items-center justify-between gap-2'>
            <BsBox />
            <div>
              <p className='font-medium'>Pedidos</p>
              <p className='text-gray-600 text-sm p-0 m-0'>acompanhar envio, ver Nota Fiscal</p>
            </div>
            <BsChevronRight className="text-sm text-gray-600" />
          </Link>
        </li>

        <li className={`bg-white rounded-xl pl-3 py-2 mb-2 pr-1 cursor-pointer ${activeLink === 'cadastro' ? 'border-l-2 border-primary' : ''}`}>
          <Link href="/minha-conta/usuario" className='flex items-center justify-between gap-2'>
            <BsPerson className="text-xl mr-2"/>
            <div>
              <p className='font-medium'>Cadastro</p>
              <p className='text-gray-600 text-sm p-0 m-0'>ver e alterar seus ddos, ver e-mail e sua senha</p>
            </div>
            <BsChevronRight className="text-sm text-gray-600" />
          </Link>
        </li>

        <li className={`bg-white rounded-xl pl-3 py-2 mb-2 pr-1 cursor-pointer ${activeLink === 'endereco' ? 'border-l-2 border-primary' : ''}`}>
          <Link href="/minha-conta/endereco" className='flex items-center justify-between'>
            <CiLocationOn className="text-xl"/>
            <div className='ml-[-2.5em]'>
              <p className='font-medium'>Endereço</p>
              <p className='text-gray-600 text-sm p-0 m-0'>ver e alterar seus endereços</p>
            </div>
            <BsChevronRight className="text-sm text-gray-600" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
