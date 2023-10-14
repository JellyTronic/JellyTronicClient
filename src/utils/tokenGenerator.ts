import crypto from "crypto";

// Função para gerar um token especial único
const generateSpecialToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  return token;
}

module.exports = generateSpecialToken;
