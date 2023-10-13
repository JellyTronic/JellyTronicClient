export const formatPrice = (price: any) => {
  // Primeiro, substitua vírgulas por pontos para que o parseFloat funcione corretamente
  const numericPrice = parseFloat(price.toString().replace(',', '.'));

  // Use o toLocaleString() para formatar o número com separador de milhar e duas casas decimais
  return numericPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

