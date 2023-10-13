"use client";

import { InputMask } from "@react-input/mask";
import "./page.css";
import { apiCadastro } from "@/utils/apiUrl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Cadastro() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Carregando");

  const [identify_document, setIdentify_document] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [reference, setReference] = useState("");
  const [complement, setComplement] = useState("");

  const setarEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const setarPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const setarRg = (e: any) => {
    setIdentify_document(e.target.value);
  };
  const setarNome = (e: any) => {
    setName(e.target.value);
  };
  const setarTelefone = (e: any) => {
    setPhone(e.target.value);
  };
  const setarDataNascimento = (e: any) => {
    setBirthdate(e.target.value);
  };
  const setarGenero = (e: any) => {
    setGender(e.target.value);
  };
  const setarConfirmSenha = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const setarCep = (e: any) => {
    const valorDigitado = e.target.value;
    setCep(valorDigitado);
  };
  const setarNum = (e: any) => {
    setNumber(e.target.value);
  };
  const setarComplemento = (e: any) => {
    setComplement(e.target.value);
  };
  const setarReferencia = (e: any) => {
    setReference(e.target.value);
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

    try {
      const response = await fetch(apiCadastro.api_online, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          name,
          phone,
          identify_document,
          birthdate,
          gender,
          status,
          cep,
          number,
          complement,
          reference,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire("Cadastrado com sucesso!", data.message, "success");
        router.push("/login");
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          console.log(errorData);
          const message = errorData.erro || "Confirme suas informações";
          Swal.fire("Falha ao cadastrar!", message, "error");
        }
      }
    } catch (error) {
      console.error("Erro ao enviar solicitação de cadastro", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 textoCrie">
            Crie sua conta
          </h2>
        </div>

        <div className="mt-10 md:mx-auto sm:w-full sm:max-w-x1 divForm1">
          <form className="space-y-6" onSubmit={envioForm}>
            <h1 className="infoPessoal">Informações pessoais</h1>
            <div className="flex">
              <div className="w-1/2 mr-20">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nome
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={setarNome}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="identity_document"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Documento de identificação
                  </label>
                  <div className="mt-2">
                    <input
                      id="identity_document"
                      name="identity_document"
                      type="text"
                      autoComplete="identity_document"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={setarRg}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Telefone/Celular
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      autoComplete="phone"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={setarTelefone}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="birthdate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Data de nascimento
                  </label>
                  <div className="mt-2">
                    <input
                      id="birthdate"
                      name="birthdate"
                      type="date"
                      autoComplete="birthdate"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={setarDataNascimento}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Genêro
                  </label>
                  <div className="mt-2">
                    <select required onChange={setarGenero}>
                      <option>Escolha um gênero: </option>
                      <option value={"M"}>Masculino</option>
                      <option value={"F"}>Feminino</option>
                      <option value={"I"}>Outros</option>
                    </select>
                  </div>
                </div>
                <br />
                <br />
                <br />
              </div>
              <div className="w-1/2">
                <div className="mb-4">
                  <label
                    htmlFor="cep"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cep
                  </label>
                  <div className="mt-2">
                    <input
                      id="cep"
                      name="cep"
                      type="text"
                      autoComplete="cep"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={setarCep}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Número da casa/apto
                  </label>
                  <div className="mt-2">
                    <input
                      id="number"
                      name="number"
                      type="text"
                      autoComplete="number"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={setarNum}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="complement"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Complemento
                  </label>
                  <div className="mt-2">
                    <input
                      id="complement"
                      name="complement"
                      type="text"
                      autoComplete="complement"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={setarComplemento}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="reference"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Referência
                  </label>
                  <div className="mt-2">
                    <input
                      id="reference"
                      name="reference"
                      type="text"
                      autoComplete="reference"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={setarReferencia}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="divForm2">
              <h1 className="infoLogin">Informações de login</h1>
              <div className="mt-2">
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

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Senha
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={setarPassword}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirme sua senha
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={setarConfirmSenha}
                  />
                </div>
              </div>
            </div>

            <div className="divBtnCadastrar">
              <button
                type="submit"
                className="globalButton flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 btnCadastrar"
              >
                {!isLoading ? "Cadastrar" : loadingText}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Você ja tem uma conta?{" "}
            <a
              href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Entre aqui
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
