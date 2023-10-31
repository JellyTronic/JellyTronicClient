// account.js

"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar"; // Componente da barra lateral
import { apiAtualizarEndereco, apiCadastro, perfil } from "@/utils/apiUrl";
import "./page.css";
import Swal from "sweetalert2";
import { InputMask } from "primereact/inputmask";
import { Router } from "next/router";

const Endereco = () => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cep, setCep] = useState("*****-***");
  const [number, setNumber] = useState("****");
  const [complement, setComplement] = useState("******");
  const [reference, setReference] = useState("*******");
  const [logradouro, setLogradouro] = useState("**********************");
  const [bairro, setBairro] = useState("****************");
  const [localidade, setLocalidade] = useState("**********");
  const [uf, setUf] = useState("**");
  const [addressId, setAddressId] = useState();

  const [editandoCep, setEditandoCep] = useState(false);
  const [editandoNumber, setEditandoNumber] = useState(false);
  const [editandoComplement, setEditandoComplement] = useState(false);
  const [editandoReference, setEditandoReference] = useState(false);

  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isLoadingNumber, setIsLoadingNumber] = useState(false);
  const [isLoadingComplement, setIsLoadingComplement] = useState(false);
  const [isLoadingReference, setIsLoadingReference] = useState(false);

  const handleEdicaoCep = async () => {
    if (editandoCep) {
      try {
        setIsLoadingCep(true);
        const response = await fetch(
          `${apiAtualizarEndereco.api_online}/${addressId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ cep }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoadingCep(false);
          Swal.fire("Cep atualizado!", data, "success");
          const newCep = cep.replace("-", "");
          fetch(`https://viacep.com.br/ws/${newCep}/json`, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
              setBairro(data.bairro);
              setLocalidade(data.localidade);
              setLogradouro(data.logradouro);
              setUf(data.uf);
            });
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            const { message } = errorData;
            setIsLoadingCep(false);
            Swal.fire("Erro ao atualizar!", message, "error");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    setEditandoCep(!editandoCep);
  };
  const handleEdicaoNumber = async () => {
    if (editandoNumber) {
      setIsLoadingNumber(true);
      try {
        const response = await fetch(
          `${apiAtualizarEndereco.api_online}/${addressId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ number }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoadingNumber(false);
          Swal.fire("Número atualizado!", data, "success");
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            const { message } = errorData;
            setIsLoadingNumber(false);
            Swal.fire("Erro ao atualizar!", message, "error");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    setEditandoNumber(!editandoNumber);
  };
  const handleEdicaoComplement = async () => {
    if (editandoComplement) {
      try {
        setIsLoadingComplement(true);
        const response = await fetch(
          `${apiAtualizarEndereco.api_online}/${addressId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ complement }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoadingComplement(false);
          Swal.fire("Complemento atualizado!", data, "success");
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            const { message } = errorData;
            setIsLoadingComplement(false);
            Swal.fire("Erro ao atualizar!", message, "error");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    setEditandoComplement(!editandoComplement);
  };
  const handleEdicaoReference = async () => {
    if (editandoReference) {
      try {
        setIsLoadingReference(true);
        const response = await fetch(
          `${apiAtualizarEndereco.api_online}/${addressId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ reference }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsLoadingReference(false);
          Swal.fire("Referência atualizada!", data, "success");
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            const { message } = errorData;
            setIsLoadingReference(false);
            Swal.fire("Erro ao atualizar!", message, "error");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    setEditandoReference(!editandoReference);
  };

  const handleChangeCep = (e: any) => {
    setCep(e.target.value);
  };
  const handleChangeNumber = (e: any) => {
    setNumber(e.target.value);
  };
  const handleChangeComplement = (e: any) => {
    setComplement(e.target.value);
  };
  const handleChangeReference = (e: any) => {
    setReference(e.target.value);
  };

  useEffect(() => {
    const currentToken = sessionStorage.getItem("secretToken");
    const id = sessionStorage.getItem("id");

    if (!currentToken) {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
      setToken(currentToken);
      fetch(`${perfil.api_online}/${id}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          const newCep = data.data.deliveryAddress.cep.replace("-", "");
          setCep(data.data.deliveryAddress.cep);
          setAddressId(data.data.deliveryAddress.id);
          setComplement(data.data.deliveryAddress.complement);
          setNumber(data.data.deliveryAddress.number);
          setReference(data.data.deliveryAddress.reference);

          fetch(`https://viacep.com.br/ws/${newCep}/json`, {
            method: "GET",
          })
            .then((response) => response.json())
            .then((data) => {
              setBairro(data.bairro);
              setLocalidade(data.localidade);
              setLogradouro(data.logradouro);
              setUf(data.uf);
            });
        });
    }
  }, []);

  return (
    <div className="container mx-auto pl-2 pb-4 mt-8 bg-gray-200">
      <div className="flex">
        <Sidebar activeLink={"endereco"} />
        <main className="flex-1 p-4 bg-white rounded-md mt-4 mr-4">
          {/* Conteúdo principal da página */}
          {/* Outros componentes e informações do usuário */}

          <div className="flex-1 p-4 bg-white rounded-md mt-4 mr-4">
            {isAuthenticated ? (
              <div className="perfil-container">
                <div className="perfil">
                  <h1 className="text-2xl mb-4">Endereço</h1>

                  <hr className="my-4" />
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Logradouro:
                      </label>
                      <input
                        type="text"
                        value={logradouro}
                        className="form-input border rounded py-2 px-4"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Bairro:
                      </label>
                      <input
                        type="text"
                        value={bairro}
                        className="form-input border rounded py-2 px-4"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Localidade:
                      </label>
                      <input
                        type="text"
                        value={localidade}
                        className="form-input border rounded py-2 px-4"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        UF:
                      </label>
                      <input
                        type="text"
                        value={uf}
                        className="form-input border rounded py-2 px-4"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Cep:
                      </label>
                      <InputMask
                        type="text"
                        value={cep}
                        className="form-input border rounded py-2 px-4"
                        disabled={!editandoCep}
                        onChange={handleChangeCep}
                        mask="99999-999"
                      />
                      <button
                        className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded buttonChange"
                        onClick={handleEdicaoCep}
                      >
                        {isLoadingCep ? (
                          <div className="h-6 w-6 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
                        ) : editandoCep ? (
                          "Salvar"
                        ) : (
                          "Editar"
                        )}
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Número:
                      </label>
                      <input
                        type="text"
                        value={number}
                        className="form-input border rounded py-2 px-4"
                        disabled={!editandoNumber}
                        onChange={handleChangeNumber}
                        maxLength={10}
                      />
                      <button
                        className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded buttonChange"
                        onClick={handleEdicaoNumber}
                      >
                        {isLoadingNumber ? (
                          <div className="h-6 w-6 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
                        ) : editandoNumber ? (
                          "Salvar"
                        ) : (
                          "Editar"
                        )}
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Complemento:
                      </label>
                      <input
                        type="text"
                        value={complement}
                        className="form-input border rounded py-2 px-4"
                        disabled={!editandoComplement}
                        onChange={handleChangeComplement}
                        maxLength={255}
                      />
                      <button
                        className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded buttonChange"
                        onClick={handleEdicaoComplement}
                      >
                        {isLoadingComplement ? (
                          <div className="h-6 w-6 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
                        ) : editandoComplement ? (
                          "Salvar"
                        ) : (
                          "Editar"
                        )}
                      </button>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Referência:
                      </label>
                      <input
                        type="text"
                        value={reference}
                        className="form-input border rounded py-2 px-4"
                        disabled={!editandoReference}
                        onChange={handleChangeReference}
                        maxLength={255}
                      />
                      <button
                        className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded buttonChange"
                        onClick={handleEdicaoReference}
                      >
                        {isLoadingReference ? (
                          <div className="h-6 w-6 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
                        ) : editandoReference ? (
                          "Salvar"
                        ) : (
                          "Editar"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container flex flex-col items-center justify-center mt-52">
                <div className="h-12 w-12 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Endereco;
