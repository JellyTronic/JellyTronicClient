'use client'
import { useEffect } from 'react';

// pages/checkout/login.js
// import { useRouter } from 'next/router';

const CheckoutLoginPage = () => {
  // const router = useRouter();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    console.log(token)

    // Verifique se o token é uma sequência hexadecimal válida
    if (typeof token === 'string') {
      if (/^[0-9a-fA-F]+$/.test(token)) {
        // O token é válido (é uma sequência hexadecimal)
        // Continue com o processo de login do checkout
        // router.push('/checkout');
        alert('token valido')
      } else {
        alert("naee")
        // O token não é válido, redirecione o usuário de volta para o carrinho ou exiba uma mensagem de erro
        // router.push('/carrinho');
      }
    }
  }, []);

  return (
    <div>
      <p>O token é valido</p>
    </div>
  );
};

export default CheckoutLoginPage;
