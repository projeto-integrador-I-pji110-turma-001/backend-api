import crypto from "crypto";

export const isArray = (v) => !!v && v.constructor === Array;

export const generateRandomString = (size = 10) =>
  crypto
    .randomBytes(size * 2)
    .toString("base64")
    .replace(/\W/g, "")
    .slice(0, size);

export function maskSensitiveInfo(obj: { [o: string]: any }) {
  const newObj = {};
  for (const o in obj) {
    if (o === "x-api-key" || o === "x-internal-api-key") {
      newObj[o] = `${obj[o].slice(0, 5)}....`;
      continue;
    }
    newObj[o] = obj[o];
  }
  return newObj;
}

export function formatCpf(cpf: string): string {
  const cleanedCpf = cpf.replace(/\D/g, "");

  if (cleanedCpf.length !== 11) {
    throw new Error("CPF inválido. Deve conter 11 dígitos.");
  }

  return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function formatCnpj(cnpj: string): string {
  const cleanedCnpj = cnpj.replace(/\D/g, "");

  if (cleanedCnpj.length !== 14) {
    throw new Error("CNPJ inválido. Deve conter 14 dígitos.");
  }

  return cleanedCnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5"
  );
}
