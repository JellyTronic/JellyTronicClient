"use client";

import "./page.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar"; // Componente da barra lateral
import { apiCadastro, perfil } from "@/utils/apiUrl";
import Image from "next/image";
import formatDate from "./utils/formatDate";
import formatPhone from "./utils/formatPhone";
import formatRg from "./utils/formatRg";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { InputMask } from "primereact/inputmask";

const Cadastro = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [token, setToken] = useState("");

  const [id, setId] = useState();
  const [identify_document, setIdentify_document] = useState("**.***.***-*");
  const [name, setName] = useState("*******");
  const [phone, setPhone] = useState("(**) *****-****");
  const [birthdate, setBirthdate] = useState("************");
  const [email, setEmail] = useState("***********@******");
  const [gender, setGender] = useState("***");
  const [image_path, setImage_path] = useState("/imgs/perfil/foto.jpg");
  const [defaultName, setDefaultName] = useState("");
  const [editandoPhone, setEditandoPhone] = useState(false);
  const [editandoEmail, setEditandoEmail] = useState(false);
  const [editandoPassword, setEditandoPassword] = useState(false);
  const [editandoName, setEditandoName] = useState(false);

  const [isLoadingPhone, setIsLoadingPhone] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [isLoadingName, setIsLoadingName] = useState(false);

  const router = useRouter();

  const handleChangePhone = (e: any) => {
    setPhone(e.target.value);
  };
  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleChangePassword = (e: any) => {};

  const handleEdicaoPhone = async () => {
    if (editandoPhone) {
      try {
        setIsLoadingPhone(true);
        const response = await fetch(`${apiCadastro.api_online}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoadingPhone(false);
          Swal.fire("Telefone atualizado!", data, "success");
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            const { message } = errorData;
            setIsLoadingPhone(false);
            Swal.fire("Erro ao atualizar!", message, "error");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    setEditandoPhone(!editandoPhone);
  };

  const handleEdicaoEmail = async () => {
    if (editandoEmail) {
      try {
        setIsLoadingEmail(true);
        const response = await fetch(`${apiCadastro.api_online}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoadingEmail(false);
          Swal.fire("Email atualizado!", data, "success");
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            const { message } = errorData;
            setIsLoadingEmail(false);
            Swal.fire("Erro ao atualizar!", message, "error");
          }
          if (response.status === 404) {
            const errorData = await response.json();

            const { error } = errorData;
            setIsLoadingEmail(false);
            Swal.fire("Erro ao atualizar!", error, "error");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    setEditandoEmail(!editandoEmail);
  };

  const handleEdicaoName = async () => {
    if (editandoName) {
      try {
        setIsLoadingName(true);
        const response = await fetch(`${apiCadastro.api_online}/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoadingName(false);
          Swal.fire("Nome atualizado!", data, "success");
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            const { message } = errorData;
            setIsLoadingName(false);
            Swal.fire("Erro ao atualizar!", message, "error");
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    setEditandoName(!editandoName);
  };

  const handleEdicaoPassword = () => {
    router.push("/recuperarSenha");
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
          setId(data.data.customer.id);
          setIdentify_document(
            formatRg(data.data.customer.identify_document.toString())
          );
          setName(data.data.customer.name);
          setDefaultName(data.data.customer.name);
          setPhone(data.data.customer.phone);
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
      <div className="lg:flex">
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
                  <h2>Seja bem-vindo, {defaultName.split(" ")[0]}</h2>
                </div>
                <hr className="my-4" />
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">
                      Nome Completo:
                    </label>
                    <input
                      type="text"
                      value={name}
                      className="form-input border rounded py-2 px-4"
                      disabled={!editandoName}
                      onChange={handleChangeName}
                      maxLength={50}
                    />
                    <button
                      className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded buttonChange"
                      onClick={handleEdicaoName}
                    >
                      {isLoadingName ? (
                        <div className="h-6 w-6 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
                      ) : editandoName ? (
                        "Salvar"
                      ) : (
                        "Editar"
                      )}
                    </button>
                  </div>
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
                    <InputMask
                      type="text"
                      value={phone}
                      className="form-input border rounded py-2 px-4"
                      disabled={!editandoPhone}
                      onChange={handleChangePhone}
                      mask="(99) 99999-9999"
                    />
                    <button
                      className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded buttonChange"
                      onClick={handleEdicaoPhone}
                    >
                      {isLoadingPhone ? (
                        <div className="h-6 w-6 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
                      ) : editandoPhone ? (
                        "Salvar"
                      ) : (
                        "Editar"
                      )}
                    </button>
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
                      disabled={!editandoEmail}
                      onChange={handleChangeEmail}
                      maxLength={50}
                    />
                    <button
                      className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded buttonChange"
                      onClick={handleEdicaoEmail}
                    >
                      {isLoadingEmail ? (
                        <div className="h-6 w-6 border-4 border-l-gray-200 border-r-gray-200 border-b-gray-200 border-t-primary animate-spin ease-linear rounded-full"></div>
                      ) : editandoEmail ? (
                        "Salvar"
                      ) : (
                        "Editar"
                      )}
                    </button>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-600 font-bold">
                      Senha:
                    </label>
                    <input
                      type="text"
                      value="**********"
                      className="form-input border rounded py-2 px-4"
                      disabled
                    />
                    <button
                      className="ml-2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded buttonChange"
                      onClick={handleEdicaoPassword}
                    >
                      Altere
                    </button>
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
