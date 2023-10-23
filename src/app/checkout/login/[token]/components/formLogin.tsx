import "./formLogin.css";

import { apiLogin } from "@/utils/apiUrl";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface LoginFormProps {
  onSubmit: (formData: { token: string; id: number }) => void;
}

export default function FormLogin({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Carregando");

  const setarEmail = (e: any) => {
    if (e.target.value !== "") setEmail(e.target.value);
  };
  const setarPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const updateLoadingText = () => {
    setLoadingText((prevText) => {
      if (prevText === "Carregando...") {
        return "Carregando";
      } else {
        return prevText + ".";
      }
    });
  };

  useEffect(() => {
    let interval: any;

    if (isLoading) {
      interval = setInterval(updateLoadingText, 500);
    } else {
      setLoadingText("Carregando");
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  const envioForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      console.error("DEU ERRADO!");
      return;
    }

    try {
      const response = await fetch(apiLogin.api_online, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire("Bom trabalho!", data.message, "success");

        onSubmit({ token: data.token, id: data.id });
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          const { message } = errorData;
          Swal.fire("Erro ao logar!", message, "error");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={envioForm}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Endereço de email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={setarEmail}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Senha
          </label>
          <div className="text-sm">
            <a
              href="/recuperarSenha"
              className="font-semibold text-primary hover:text-primaryDarker"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={setarPassword}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryDarker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {!isLoading ? "Entrar" : loadingText}
        </button>
      </div>
    </form>
  );
}
