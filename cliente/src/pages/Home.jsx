import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import "../pag.css";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarTabela, setMostrarTabela] = useState(false); // Controle para mostrar/ocultar os dados da tabela

    useEffect(() => {
        const buscarUsuario = async () => {
            try {
                const resposta = await fetch("http://localhost:3000/usuarios");
                const dados = await resposta.json();
                console.log(dados); // Verifique os dados retornados
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

    const pesquisarTabela = () => {
        setMostrarTabela(true); // Mostra os dados da tabela após clicar no botão pesquisar
    };

    return (
        <div>
            <Header />
            <div className="Central">
                <h1 className="linha">Emissão de Relatórios</h1>
                <div className="botoes">
                    <button className="estilizacaoButton" onClick={exportarPDF}>
                        Gerar PDF
                    </button>
                    <Link to="/usuarios">
                        <button className="estilizacaoButton">Novo Relatório de Viagem</button>
                    </Link>
                    <button className="estilizacaoButton" onClick={pesquisarTabela}>
                        Pesquisar
                    </button>
                </div>

                <table className="tabela-movida">
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
                        {mostrarTabela &&
                            usuarios.length > 0 &&
                            usuarios.map((usuario) => (
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
                            ))}
                    </tbody>
                </table>
            </div>
            <Footer /> 
        </div>
    );
}
