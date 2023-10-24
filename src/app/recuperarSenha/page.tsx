"use client";
import { useEffect, useState } from "react";
import "./recuperarSenha.css";
import { recuperarSenhaUrl } from "@/utils/apiUrl";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Carregando");
  const router = useRouter();

  const setarEmail = (e: any) => {
    setEmail(e.target.value);
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
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await fetch(recuperarSenhaUrl.api_online, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire("Bom trabalho!", data.message, "success");
        router.push("/login");
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          Swal.fire("Deu errado!", errorData.message, "error");
        }
      }
    } catch (error) {
      console.error(
        "Erro ao enviar solicitação de redefinição de senha",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="container containerForm">
            <div className="descriptionForm">
              <a
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500 text-primary"
              >
                {"<<"} Voltar ao login
              </a>
              <br />
              <br />
              <h1 className="labelEmail">Informe seu email</h1>
              <p className="pEmail">
                para enviarmos o link de redefinição de senha
              </p>
            </div>

            <form className="space-y-6" onSubmit={envioForm}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Endereço de email:
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 inputEmail"
                    onChange={setarEmail}
                  />
                </div>
              </div>

              <div className="divButton">
                <button
                  type="submit"
                  className="button flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {!isLoading ? (
                    "Enviar"
                  ) : (
                    <div className="h-6 w-6 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
