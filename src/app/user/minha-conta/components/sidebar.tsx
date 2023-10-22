// Sidebar.js

import React from 'react';

const Sidebar = () => {
  return (
    <nav className="bg-gray-200 w-1/4 mt-12 p-4">
      <ul>
        <div className="bg-white border border-gray-300 rounded-md p-2 mb-2">
          <li className="mb-2">
            <a href="/user/pedido">Minha Conta</a>
          </li>
        </div>
        <div className="bg-white border border-gray-300 rounded-md p-2 mb-2">
          <li className="mb-2">
            <a href="/user/pedido">Pedidos</a>
          </li>
        </div>
        <div className="bg-white border border-gray-300 rounded-md p-2 mb-2">
          <li className="mb-2">
            <a href="/user/perfil">Cadastro</a>
          </li>
        </div>
        <div className="bg-white border border-gray-300 rounded-md p-2 mb-2">
          <li className="mb-2">
            <a href="/user/endereco">Endereço</a>
          </li>
        </div>
        {/* Adicione mais itens de menu conforme necessário */}
      </ul>
    </nav>
  );
};

export default Sidebar;
