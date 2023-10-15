import { useEffect, useState } from "react";
import "../components/isLogged.css";
import { useRouter } from "next/navigation";

export default function IsLogged() {

  const router = useRouter();
  useEffect(() => {
    sessionStorage.removeItem('specialToken')
  }, [router]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1>Você está logado!</h1>
        <br />
        <h3>Redirecionando para a página de perfil em 01 segundos</h3>
      </div>
    </>
  );
}
