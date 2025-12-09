import axios from "axios";

export async function pesquisaCEP(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar CEP");
  }
}
