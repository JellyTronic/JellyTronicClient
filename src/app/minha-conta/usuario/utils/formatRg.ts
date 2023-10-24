export default function formatRg(rg: string): string {
  const part1 = rg.slice(0, 2);
  const part2 = rg.slice(2, 5);
  const part3 = rg.slice(5, 8);
  const part4 = rg.slice(8, 9);

  const rgFormatado = `${part1}.${part2}.${part3}-${part4}`;

  return rgFormatado;
}
