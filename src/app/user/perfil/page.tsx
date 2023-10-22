'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../minha-conta/components/sidebar'; // Componente da barra lateral
import { perfil } from '@/utils/apiUrl';
import Image from "next/image";

const Perfil = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [id, setId] = useState();
  const [identify_document, setIdentify_document] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [image_path, setImage_path] = useState("/imgs/perfil/foto.jpg");

  useEffect(() => {
    const currentToken = sessionStorage.getItem("secretToken");
    const id = sessionStorage.getItem("id");

    if (!currentToken) {
      window.location.href = '/login';
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
          setId(data.data.id);
          setIdentify_document(data.data.identify_document);
          setName(data.data.name);
          setPhone(data.data.phone);
          setBirthdate(data.data.birthdate);
          setEmail(data.data.email);
          setGender(data.data.gender);
          setImage_path(data.data.image_path);
        });
    }
  }, []);

  return (
    <div className="container mx-auto pl-2 pb-4 mt-8 bg-gray-200">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 bg-white rounded-md mt-4 mr-4">
          {isAuthenticated ? (
            <div className="perfil-container">
              <div className="perfil">
                <h1 className="text-2xl mb-4">Cadastro</h1>
                <div className="text-center">
                  <Image
                    alt="foto de perfil"
                    src={image_path}
                    width={70}
                    height={70}
                  />
                  <h2>Seja bem-vindo, {name}</h2>
                </div>
                <hr className="my-4" />
                <div>
                  <h2 className="text-lg">Dados:</h2>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">RG:</label>
                    <input
                      type="text"
                      value={identify_document}
                      className="form-input border rounded py-2 px-4"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">Telefone:</label>
                    <input
                      type="text"
                      value={phone}
                      className="form-input border rounded py-2 px-4"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">Data de Nascimento:</label>
                    <input
                      type="text"
                      value={birthdate}
                      className="form-input border rounded py-2 px-4"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">Email:</label>
                    <input
                      type="text"
                      value={email}
                      className="form-input border rounded py-2 px-4"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">Gênero:</label>
                    <div className="flex space-x-4">
                      <label>
                        <input
                          type="radio"
                          value="M"
                          checked={gender === "M"}
                          onChange={() => setGender("M")}
                          disabled
                        />
                        Masculino
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="F"
                          checked={gender === "F"}
                          onChange={() => setGender("F")}
                          disabled
                        />
                        Feminino
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Carregando...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
