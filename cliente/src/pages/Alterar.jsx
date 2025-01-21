import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";  // Certifique-se de importar o Footer corretamente

export default function Alterar() {
  const { id } = useParams();  // Captura o id da URL
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
        const dados = await resposta.json();
        setUsuario(dados);
      } catch {
        alert("Erro ao buscar usuário!");
      }
    };
    buscarUsuario();
  }, [id]);

  if (!usuario) return <div>Carregando...</div>;

  return (
    <div>
      <Header /> 
      <h2>Alterar Usuário: {usuario.nome}</h2>
      <form>
        <label>
          Nome:
          <input type="text" defaultValue={usuario.nome} />
        </label>
        <label>
          Telefone:
          <input type="text" defaultValue={usuario.telefone} />
        </label>
     
        <button type="submit">Salvar Alterações</button>
      </form>
      <Footer /> 
    </div>
  );
}
