"use client";

import "./page.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar"; // Componente da barra lateral
import { perfil } from "@/utils/apiUrl";
import Image from "next/image";
import formatDate from "./utils/formatDate";
import formatPhone from "./utils/formatPhone";
import formatRg from "./utils/formatRg";

const Cadastro = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [id, setId] = useState();
  const [identify_document, setIdentify_document] = useState("**.***.***-*");
  const [name, setName] = useState("*******");
  const [phone, setPhone] = useState("(**) *****-****");
  const [birthdate, setBirthdate] = useState("************");
  const [email, setEmail] = useState("***********@******");
  const [gender, setGender] = useState("***");
  const [image_path, setImage_path] = useState("/imgs/perfil/foto.jpg");

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
          setId(data.data.customer.id);
          setIdentify_document(
            formatRg(data.data.customer.identify_document.toString())
          );
          setName(data.data.customer.name);
          setPhone(formatPhone(data.data.customer.phone));
          setBirthdate(formatDate(data.data.customer.birthdate));
          setEmail(data.data.customer.email);

          if (data.data.customer.gender == "F") {
            setGender("Feminino");
          } else {
            setGender("Masculino");
          }

          setImage_path(data.data.customer.image_path);
        });
    }
  }, []);

  return (
    <div className="container mx-auto pl-2 pb-4 mt-8 bg-gray-200">
      <div className="flex">
        <Sidebar activeLink={"cadastro"} />
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
                    <label className="block text-gray-600 font-bold">
                      Telefone:
                    </label>
                    <input
                      type="text"
                      value={phone}
                      className="form-input border rounded py-2 px-4"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">
                      Data de Nascimento:
                    </label>
                    <input
                      type="text"
                      value={birthdate}
                      className="form-input border rounded py-2 px-4"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">
                      Email:
                    </label>
                    <input
                      type="text"
                      value={email}
                      className="form-input border rounded py-2 px-4"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">
                      Gênero:
                    </label>
                    <input
                      type="text"
                      value={gender}
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
      </div>
    </div>
  );
};

export default Cadastro;
