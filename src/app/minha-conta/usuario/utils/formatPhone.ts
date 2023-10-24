export default function formatPhone(phone: string): string {
  const part1 = phone.slice(0, 2);
  const part2 = phone.slice(2, 7);
  const part3 = phone.slice(7, 12);

  const telefoneFormatado = `(${part1})${part2}-${part3}`;

  return telefoneFormatado;
}
