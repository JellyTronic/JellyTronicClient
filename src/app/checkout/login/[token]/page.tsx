'use client'
import { useEffect, useState } from 'react';

// pages/checkout/login.js
// import { useRouter } from 'next/router';

const CheckoutLoginPage = ({ params }: { params: { token: string } }) => {
  // const router = useRouter();
  const [tokenParams, setTokenParams] = useState<string>("");
  const [tokenSession, setTokenSession] = useState<string>("");
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  useEffect(() => {
    // const searchParams = new URLSearchParams(window.location.search);
    // const token = searchParams.get("token");
    const tokenSpecial = sessionStorage.getItem('specialToken')
    // console.log(token)
    console.log(params.token)
    alert(params.token)

    // Verifique se o token é uma sequência hexadecimal válida
    if (params.token === tokenSpecial) {
      setIsTokenValid(true)
      // O token é válido (é uma sequência hexadecimal)
      // Continue com o processo de login do checkout
      // router.push('/checkout');
      alert('token valido')
    } else {
      alert("Desculpa, você não precisa acessar essa página e estamos redirecionando você a tela de login!")
      window.location.href = "/login"
    }

  }, []);

  return (
    <>
      {isTokenValid === true ? (
        <div>
          <p>O token é valido</p>
        </div>
      ) : (
        <>
          <p>Desculpa, Você não tem acesso a essa página!</p>
        </>
      )}
    </>
  );
};

export default CheckoutLoginPage;
