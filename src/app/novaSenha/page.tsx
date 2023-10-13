"use client";

import { verificarTokenRecuperarSenha } from "@/utils/apiUrl";
import Error from "next/error";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormNovaSenha from "./formNovaSenha";

export default function NovaSenha() {
  const params = useSearchParams();

  const [token, setToken] = useState("");
  const [verificated, setVerificated] = useState(false);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (params.has("token")) {
      const currentToken = params.get("token");
      if (currentToken !== null) {
        setToken(currentToken);
      }
    }
    async function fetchData() {
      try {
        const response = await fetch(verificarTokenRecuperarSenha.api_online, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          setVerificated(data.message);
          setUserId(data.userId);
        } else {
          if (response.status === 401) {
            const errorData = await response.json();
            console.error(errorData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [params, token]);

  return (
    <>
      {!verificated ? (
        <Error statusCode={401} title="Página não autorizada" />
      ) : (
        <FormNovaSenha userId={userId} />
      )}
    </>
  );
}
