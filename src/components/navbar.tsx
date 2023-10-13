import Link from "next/link";
import "../components/navbar.css";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  function logout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    sessionStorage.clear();
    router.push("/login");
  }

  return (
    <>
      <header className="headerPerfil">
        <div className="logo">
          <h1>Perfil</h1>
        </div>
        <div className="items">
          <a href="#" onClick={(e) => logout(e)}>
            Logout
          </a>
        </div>
      </header>
    </>
  );
}
