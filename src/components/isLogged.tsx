import { useEffect, useState } from "react";
import "../components/isLogged.css";
import { useRouter } from "next/navigation";

export default function IsLogged() {
  const [contador, setContador] = useState(3);

  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    const interval = setInterval(() => {
      setContador((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.location.reload();
    };
  }, [router]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1>Você está logado!</h1>
        <br />
        <h3>Redirecionando para a página inicial em alguns segundos</h3>
      </div>
    </>
  );
}
