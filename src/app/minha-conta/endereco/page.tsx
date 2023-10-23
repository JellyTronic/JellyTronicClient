// account.js

"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar"; // Componente da barra lateral
import { perfil } from "@/utils/apiUrl";
import Image from "next/image";

const Endereco = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const currentToken = sessionStorage.getItem("secretToken");
    const id = sessionStorage.getItem("id");

    if (!currentToken) {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);

      fetch(`${perfil.api_online}/${id}`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setCep(data.data.deliveryAddress.cep);
          setComplement(data.data.deliveryAddress.complement);
          setNumber(data.data.deliveryAddress.number);
          setReference(data.data.deliveryAddress.reference);
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
                        Cep:
                      </label>
                      <input
                        type="text"
                        value={cep}
                        className="form-input border rounded py-2 px-4"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Número:
                      </label>
                      <input
                        type="text"
                        value={number}
                        className="form-input border rounded py-2 px-4"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Complemento:
                      </label>
                      <input
                        type="text"
                        value={complement}
                        className="form-input border rounded py-2 px-4"
                        disabled
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-600 font-bold">
                        Referência:
                      </label>
                      <input
                        type="text"
                        value={reference}
                        className="form-input border rounded py-2 px-4"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>Carregando...</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Endereco;
