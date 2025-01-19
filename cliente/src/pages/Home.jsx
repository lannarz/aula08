import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import "../pag.css";
import Header from "./Header";

export default function Home() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const buscarUsuario = async () => {
            try {
                const resposta = await fetch("http://localhost:3000/usuarios");
                const dados = await resposta.json();
                setUsuarios(dados);
            } catch {
                alert("Ocorreu um erro no app!");
            }
        };
        buscarUsuario();
    }, []);

    const exportarPDF = () => {
        const doc = new jsPDF();
        const tabela = usuarios.map((usuario) => [
            usuario.nome,
            usuario.email,
            usuario.telefone,
            usuario.agencia,
            usuario.localOrigem,
            usuario.localDestino,
            usuario.dataInicial,
            usuario.dataFinal,
        ]);
        doc.text("Lista de Usuários", 10, 10);
        doc.autoTable({
            head: [
                [
                    "Nome",
                    "E-mail",
                    "Telefone",
                    "Agência",
                    "Local de Origem",
                    "Local de Destino",
                    "Data Inicial",
                    "Data Final",
                ],
            ],
            body: tabela,
        });
        doc.save("usuarios.pdf");
    };

    return (
        <div>
            <Header />
            <h1>Emissão de Relatórios</h1>
            <div className="botoes">
                <button className="gerarPDF" onClick={exportarPDF}>
                    Importar PDF
                </button>
                <Link to="/usuarios">
                    <button className="novoRelatorio">Novo Relatório de Viagem</button>
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Agência</th>
                        <th>Local de Origem</th>
                        <th>Local de Destino</th>
                        <th>Data Inicial</th>
                        <th>Data Final</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario, index) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome || "-"}</td>
                                <td>{usuario.email || "-"}</td>
                                <td>{usuario.telefone || "-"}</td>
                                <td>{usuario.agencia || "-"}</td>
                                <td>{usuario.localOrigem || "-"}</td>
                                <td>{usuario.localDestino || "-"}</td>
                                <td>{usuario.dataInicial || "-"}</td>
                                <td>{usuario.dataFinal || "-"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: "center" }}>
                                Nenhum registro encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
