import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Registrar from "./pages/Registro";
import Alterar from "./pages/Alterar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Registrar />} />
        <Route path="/alterar/:id" element={<Alterar />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);


/* 
import { useEffect, useState } from "react";
import {jsPDF} from "jspdf";
import "jspdf-autotable";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    }
    buscarUsuario();
  }, [usuarios])
   
  const removerPessoa = async (id) => {
    try{
      await fetch('http://localhost:3000/usuarios/'+id, {
        method: 'DELETE'
      })
    }
    catch{
      alert('opss lascau')

    }
  }

  // PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    const tabela = usuarios.map( usuario => [
      usuario.nome,
      usuario.email
    ]);
    doc.text('Lista de Usuários', 10, 10);
    doc.autoTable({
      head: [["Nome", "E-mail"]],
      body: tabela
    });

    doc.save("alunos.pdf");
  }

  return (
    <div>
    <button onClick={()=> exportarPDF() }>Gerar PDF</button> 

    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td><button onClick={() => removerPessoa(usuario.id)}>X</button></td>
        </tr>
      )}
    </table>
    </div>
  );
}
 */