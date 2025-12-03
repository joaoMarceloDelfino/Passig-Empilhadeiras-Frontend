export const status = [
    { code: "FO", description: "Funcionando" },
    { code: "NF", description: "Não Funcionando" },
    { code: "MA", description: "Manutenção" },
    { code: "IN", description: "Inativa" },
    { code: "RE", description: "Reservada" }
]


export function findStatusByCode(code) {
  return status.find(status => status.code === code);
}

