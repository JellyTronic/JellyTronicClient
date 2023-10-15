"use client";
import { useRouter } from "next/navigation";
import FormLogin from "./components/formLogin";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import IsLogged from "./components/isLogged";

export default function Login({ params }: { params: { token: string } }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const router = useRouter();
  const [tokenParams, setTokenParams] = useState<string>("");
  const [tokenSession, setTokenSession] = useState<string>("");
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  const handleLoginSubmit = (formData: { token: string; id: number }) => {
    sessionStorage.setItem("secretToken", formData.token);
    sessionStorage.setItem("id", formData.id.toString());
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem("secretToken")) {
      setIsAuthenticated(true);
    }

    // const searchParams = new URLSearchParams(window.location.search);
    // const token = searchParams.get("token");
    const tokenSpecial = sessionStorage.getItem('specialToken')
    // console.log(token)
    // console.log(params.token)
    // alert(params.token)

    // Verifique se o token é uma sequência hexadecimal válida
    if (params.token === tokenSpecial) {
      setIsTokenValid(true)
      // O token é válido (é uma sequência hexadecimal)
      // Continue com o processo de login do checkout
      // router.push('/checkout');
      // alert('token valido')
    } else {
      alert("Desculpa, você não precisa acessar essa página e estamos redirecionando você a tela de login!")
      window.location.href = "/login"
    }

  }, []);

  // const IsLogged = () => {
  //   window.location.href = "/cart"
  // }


  return (
    <>
      {!isAuthenticated ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Entre em sua conta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <FormLogin onSubmit={handleLoginSubmit} />
            <p className="mt-10 text-center text-sm text-gray-500">
              Não está cadastrado?{" "}
              <a
                href="/cadastro"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Cadastre-se aqui
              </a>
            </p>
          </div>
        </div>
      ) : (
        <IsLogged />
      )}
    </>
  );
}
