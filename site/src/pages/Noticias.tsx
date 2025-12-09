import { useEffect, useState } from "react";
import { listNoticias, createNoticia, updateNoticia, deleteNoticia } from "../services/noticiasService";
import "../styles/noticias.css";

export default function Noticias() {
  const [noticias, setNoticias] = useState<any[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEdit, setIdEdit] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const carregar = async () => {
    setLoading(true);
    const res = await listNoticias();
    setNoticias(res.data);
    setLoading(false);
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    if (!titulo || !descricao) return;

    const payload = { titulo, descricao };

    if (editando && idEdit !== null) {
      await updateNoticia(idEdit, payload);
    } else {
      await createNoticia(payload);
    }

    setTitulo("");
    setDescricao("");
    setEditando(false);
    setIdEdit(null);
    carregar();
  };

  const editar = (noticia: any) => {
    setTitulo(noticia.titulo);
    setDescricao(noticia.descricao);
    setIdEdit(noticia.id);
    setEditando(true);
  };

  const remover = async (id: number) => {
    await deleteNoticia(id);
    carregar();
  };

  return (
    <div className="noticias-container">
      <h2>Notícias</h2>

      <div className="form-box">
        <label className="form-label">Título</label>
        <input
            className="form-input"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
        />

        <label className="form-label">Descrição</label>
        <textarea
            className="form-input"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
        ></textarea>

       <button className="form-button" onClick={salvar}>
            {editando ? "Salvar Edição" : "Adicionar Notícia"}
        </button>

        </div>

      {loading ? (
        <p></p>
      ) : (
        <table className="tabela">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((n) => (
              <tr key={n.id}>
                <td>{n.titulo}</td>
                <td>{n.descricao}</td>
                <td>
                  <button onClick={() => editar(n)}>Editar</button>
                  <button onClick={() => remover(n.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
