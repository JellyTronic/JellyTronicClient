// account.js

import React from 'react';
import Sidebar from './components/sidebar'; // Componente da barra lateral

const Account = () => {
  return (
    <div className="container mx-auto pl-2 pb-4 mt-8 bg-gray-200">
      <div className="flex">
        <Sidebar/>
        <main className="flex-1 p-4 bg-white rounded-md mt-4 mr-4">
          <h1>ola</h1>
          {/* Conteúdo principal da página */}
          {/* Outros componentes e informações do usuário */}
        </main>
      </div>
    </div>
  );
};

export default Account;
