export const apiLogin = {
  api_local: "http://localhost:3001/api/v1/auth/login",
  api_online: "https://api-clientes-fatec-v1.onrender.com/api/v1/auth/login",
};

export const apiCadastro = {
  api_local: "http://localhost:3001/api/v1/clientes",
  api_online: "https://api-clientes-fatec-v1.onrender.com/api/v1/clientes",
};

export const perfil = {
  api_local: "http://localhost:3001/api/v1/clientes",
  api_online: "https://api-clientes-fatec-v1.onrender.com/api/v1/clientes",
};

export const recuperarSenhaUrl = {
  api_local: "http://localhost:3001/api/v1/auth/recuperarSenha",
  api_online:
    "https://api-clientes-fatec-v1.onrender.com/api/v1/auth/recuperarSenha",
};

export const verificarTokenRecuperarSenha = {
  api_local: "http://localhost:3001/api/v1/auth/reset-senha",
  api_online:
    "https://api-clientes-fatec-v1.onrender.com/api/v1/auth/reset-senha",
};

export const atualizarSenha = {
  api_local: "http://localhost:3001/api/v1/auth/nova-senha",
  api_online:
    "https://api-clientes-fatec-v1.onrender.com/api/v1/auth/nova-senha",
};
