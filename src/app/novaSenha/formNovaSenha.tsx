"use client";
import { useEffect, useState } from "react";
import "./formNovaSenha.css";
import { atualizarSenha, recuperarSenhaUrl } from "@/utils/apiUrl";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function FormNovaSenha(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingText, setLoadingText] = useState("Carregando");
  const [id, setId] = useState(0);
  const router = useRouter();

  const setarEmail = (e: any) => {
    setId(props.userId);
    setEmail(e.target.value);
  };

  const setarNewPassword = (e: any) => {
    setNewPassword(e.target.value);
  };
  const setarConfirmNewPassword = (e: any) => {
    setConfirmNewPassword(e.target.value);
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
      const response = await fetch(atualizarSenha.api_online, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, newPassword, confirmNewPassword, email }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire("Senha atualizada com sucesso!", data.message, "success");
        router.push("/login");
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          Swal.fire("Deu errado!", errorData.message, "error");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="container">
            <div className="descriptionForm">
              <h1 className="labelEmail">Redefinição de senha</h1>
              <p className="pEmail">Preencha os campos com sua nova senha</p>
            </div>

            <form className="space-y-6" onSubmit={envioForm}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirme seu email:
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 inputSenha"
                    onChange={setarEmail}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Digite a nova senha:
                </label>
                <div className="mt-2">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="newPassword"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 inputSenha"
                    onChange={setarNewPassword}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirme a nova senha:
                </label>
                <div className="mt-2">
                  <input
                    id=""
                    name="confirmNewPassword"
                    type="password"
                    autoComplete="confirmNewPassword"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 inputSenha"
                    onChange={setarConfirmNewPassword}
                  />
                </div>
              </div>

              <div className="divButton">
                <button
                  type="submit"
                  className="button flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 buttonSend"
                >
                  {!isLoading ? "Cadastrar nova senha" : loadingText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
