export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}