import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

export default function Registrar() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [agencia, setAgencia] = useState("");
    const [localOrigem, setLocalOrigem] = useState("");
    const [localDestino, setLocalDestino] = useState("");
    const [dataInicial, setDataInicial] = useState("");
    const [dataFinal, setDataFinal] = useState("");
    const navigate = useNavigate();

    const registrar = async (event) => {
        event.preventDefault();
        try {
            const resposta = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    email,
                    telefone,
                    agencia,
                    localOrigem,
                    localDestino,
                    dataInicial,
                    dataFinal,
                }),
            });
            if (resposta.ok) {
                navigate("/");
            } else {
                alert("Falha ao registrar. Verifique os dados e tente novamente.");
            }
        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro na aplicação.");
        }
    };

    return (
        <main>
            <div className="parteEsquerda">
                <h1>Formulario </h1>
            </div>

            <div className="partedireita">
                <form onSubmit={registrar}>
                    <div className="campo-grupo">
                        <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Nome" required />
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="E-mail" required />
                        <input type="tel" value={telefone} onChange={(event) => setTelefone(event.target.value)} placeholder="Telefone" required />
                        <input type="text" value={agencia} onChange={(event) => setAgencia(event.target.value)} placeholder="Agência" required />
                    </div>
                    <input type="text" value={localOrigem} onChange={(event) => setLocalOrigem(event.target.value)} placeholder="Local de Origem" required />
                    <input type="text" value={localDestino} onChange={(event) => setLocalDestino(event.target.value)} placeholder="Local de Destino" required />
                    <input type="date" value={dataInicial} onChange={(event) => setDataInicial(event.target.value)} required />
                    <input type="date" value={dataFinal} onChange={(event) => setDataFinal(event.target.value)} required />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </main>
    );
}
