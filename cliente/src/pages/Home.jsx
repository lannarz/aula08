import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import "../pag.css";


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

    const removerPessoa = async (id) => {
        try {
            await fetch("http://localhost:3000/usuarios/" + id, {
                method: "DELETE",
            });
            setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
        } catch {
            alert("Ops, algo deu errado!");
        }
    };

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
            <button className ="gerarPDF" onClick={exportarPDF}>Gerar PDF</button>
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
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.telefone}</td>
                            <td>{usuario.agencia}</td>
                            <td>{usuario.localOrigem}</td>
                            <td>{usuario.localDestino}</td>
                            <td>{usuario.dataInicial}</td>
                            <td>{usuario.dataFinal}</td>
                            <td>
                                <button onClick={() => removerPessoa(usuario.id)}>Remover</button>
                                <Link to={"/alterar/" + usuario.id}>
                                    <button>Alterar</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
