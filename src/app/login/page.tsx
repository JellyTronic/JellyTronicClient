"use client";
import { useRouter } from "next/navigation";
import FormLogin from "./formLogin";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import IsLogged from "@/components/isLogged";

export default function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSubmit = (formData: { token: string; id: number }) => {
    sessionStorage.setItem("secretToken", formData.token);
    sessionStorage.setItem("id", formData.id.toString());
    setIsAuthenticated(true);
  };

  useEffect(() => {
    if (sessionStorage.getItem("secretToken")) {
      setIsAuthenticated(true);
    }
  }, []);

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
