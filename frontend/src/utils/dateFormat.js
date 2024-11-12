export function dateFormat(date = new Date()) {
  return new Date(date).toISOString().split("T")[0];
}
