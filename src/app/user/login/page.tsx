"use client"

import Button from "@/components/Button";
import customers from "@/types/customers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Login = () => {

  const [clientes, setClientes] = useState<customers[]>([]);
  const [email, setEmail] = useState("");
  // const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");

  const fetchClientes = async () => {
    try {
      const response = await fetch('https://api-cadastro-clientes.onrender.com/clientes');
      const data = await response.json();
      setClientes(data.data.clientes);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleLogin = () => {
    const clienteEncontrado = clientes.find(
      cliente => cliente.email === email
    );

    if (clienteEncontrado) {
      setMensagemErro("");
      localStorage.setItem("nome", clienteEncontrado.nome);
      localStorage.setItem("sobrenome", clienteEncontrado.sobrenome);
      window.location.href = "/";
    } else {
      setMensagemErro("Credenciais inválidas. Por favor, verifique seu email e senha.");
    }
  };

  return (
    <div className="container mt-20">
      <div className="w-[75%] ml-[12.5%]">
        <Image src={'/logo.png'} alt="logo" height={120} width={120} className="mb-4 ml-[25%]" />
        <input
          type="text"
          placeholder="Email"
          className="border border-gray-500 w-[100%] mb-2 pl-2 rounded-lg"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {/* <input
          type="password"
          placeholder="Senha"
          className="border border-gray-500 w-[100%] mb-4 pl-2 rounded-lg"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        /> */}
        <Button className="w-[100%]" onClick={handleLogin}>Login</Button>
        {mensagemErro && <p className="mt-2 text-sm text-red-500">{mensagemErro}</p>}
        <p className="mt-2 text-sm">
          Não tem login? Cadastre-se <Link href={'/user/login'} className="text-primary">aqui!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
