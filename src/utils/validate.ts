export function validateUsername(str: string) {
  const valid_map = ["admin", "editor"];
  return valid_map.includes(str.trim());
}
