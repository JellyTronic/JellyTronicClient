export default function formatDate(date: string): string {
  const dataAmericana = date.split("T");
  const novaData = dataAmericana[0].split("-");
  const dataCorreta = `${novaData[2]}/${novaData[1]}/${novaData[0]}`;
  return dataCorreta;
}
