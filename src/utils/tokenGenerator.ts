import crypto from "crypto";

// Função para gerar um token especial único
const generateSpecialToken = () => {
  try {
    const token = crypto.randomBytes(32).toString('hex');
    console.log('Token gerado:', token);
    return token;
  } catch (error) {
    console.error('Erro ao gerar token:', error);
    return null;
  }
}


module.exports = generateSpecialToken;
