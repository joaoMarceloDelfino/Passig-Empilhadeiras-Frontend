export const status = [
    { code: "AL", description: "Aluguel de empilhadeiras" },
    { code: "MA", description: "Manutenção de empilhadeiras" },
]


export function findStatusByCode(code) {
  return status.find(status => status.code === code);
}

