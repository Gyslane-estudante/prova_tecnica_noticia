import { useState } from "react";
import { pesquisaCEP } from "../services/cepService";
import "../styles/cep.css";

export default function Cep() {
  const [cep, setCep] = useState("");
  const [dados, setDados] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErro("");
    setDados(null);

    if (!cep || cep.length < 8) {
      setErro("Digite um CEP válido");
      return;
    }

    try {
      setLoading(true);
      const resposta = await pesquisaCEP(cep.replace("-", ""));

      if (resposta.erro) {
        setErro("CEP não encontrado");
        return;
      }

      setDados(resposta);
    } catch {
      setErro("Erro ao consultar o serviço");
    } finally {
      setLoading(false);
    }
  };

  const maskCep = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
};


  return (
    <div className="cep-container">
      <h2 className="cep-title">Consulta de Endereço por CEP</h2>

      <form className="cep-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="cep-input"
          placeholder="Digite o CEP (somente números)"
          value={cep}
          onChange={(e) => setCep(maskCep(e.target.value))}

        />

        <button className="cep-button" type="submit">
          Buscar
        </button>
      </form>

    

      {erro && <p className="error">{erro}</p>}

      {dados && (
        <div className="result-box">
          <p><strong>Logradouro:</strong> {dados.logradouro}</p>
          <p><strong>Bairro:</strong> {dados.bairro}</p>
          <p><strong>Cidade:</strong> {dados.localidade}</p>
          <p><strong>Estado:</strong> {dados.uf}</p>
        </div>
      )}
    </div>
  );
}
