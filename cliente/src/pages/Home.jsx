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
        const buscarUsuarios = async () => {
            try {
                const resposta = await fetch("http://localhost:3000/usuarios");
                const dados = await resposta.json();
                console.log(dados); 
                setUsuarios(dados);
            } catch {
                alert("Ocorreu um erro no app!");
            }
        };
        buscarUsuarios();
    }, []);
    

    const removerPessoa = async (id) => {
        try {
            await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'DELETE',
            });
            setUsuarios(usuarios.filter(usuario => usuario.id !== id)); 
        } catch {
            alert('Erro ao remover usuário');
        }
    };


    const exportarPDF = () => {
        const doc = new jsPDF();
        const tabela = usuarios.map((usuario) => [
            usuario.nome,
            usuario.telefone,
            usuario.agencia,
            usuario.dataInicial,
            usuario.dataFinal,
            usuario.localOrigem,
            usuario.localDestino,
        ]);
        doc.text("Lista de Viagens", 10, 10);
        doc.autoTable({
            head: [
                [
                    "Nome",
                    "Telefone",
                    "Agência",
                    "Data Inicial",
                    "Data Final",
                    "Local de Origem",
                    "Local de Destino",
                ],
            ],
            body: tabela,
        });
        doc.save("viagens.pdf");
    };


    const pesquisarTabela = () => {
        setMostrarTabela(true); 
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
                        Listar Relatório
                    </button>
                </div>

                <table className="tabela-movida">
                    <thead>
                        <tr>
                            <th className="centralizarNome">Nome</th>
                            <th>Telefone</th>
                            <th>Agência</th>
                            <th>Data Inicial</th>
                            <th>Data Final</th>
                            <th>Local de Origem</th>
                            <th>Local de Destino</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mostrarTabela &&
                            usuarios.length > 0 &&
                            usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.nome || "-"}</td>
                                    <td>{usuario.telefone || "-"}</td>
                                    <td>{usuario.agencia || "-"}</td>
                                    <td>{usuario.dataInicial || "-"}</td>
                                    <td>{usuario.dataFinal || "-"}</td>
                                    <td>{usuario.localOrigem || "-"}</td>
                                    <td>{usuario.localDestino || "-"}</td>
                                    <td>
                                        <Link to={`/alterar/${usuario.id}`}>
                                            <button className="estilizacaoButton">
                                                Alterar
                                            </button>
                                        </Link>
                                        <button
                                            className="estilizacaoButton"
                                            onClick={() => removerPessoa(usuario.id)}
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className="tabela-informacoes">
                    <p className="contador-elementos">
                        Mostrando {usuarios.length} de {usuarios.length} elementos
                    </p>
                    <div className="paginacao">
                        <button className="btn-paginacao">Anterior</button>
                        <span className="pagina-atual">1</span>
                        <button className="btn-paginacao">Próximo</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
