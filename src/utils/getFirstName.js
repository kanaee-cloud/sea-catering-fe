export function getFirstName(fullName) {
  if (!fullName || typeof fullName !== "string") return "";
  return fullName.trim().split(" ")[0];
}