import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pag.css";

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
            const dados = {
                nome,
                email,
                telefone,
                agencia,
                localOrigem,
                localDestino,
                dataInicial,
                dataFinal,
            };
    
            const resposta = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dados),
            });
    
            if (resposta.ok) {
                const usuarioCriado = await resposta.json();
                console.log("Usuário registrado:", usuarioCriado);
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
                <h1>Bem vindo de volta!</h1>
                <p>Para se manter conectado conosco, faça login com suas informações pessoais</p>
                <button className="signInButton">Entrar</button>
            </div>

            <div className="parteDireita">
                <form onSubmit={registrar}>
                    <h1>Formulário de Viagem</h1>
                    <p>Preencha os campos com seus dados:</p>
                    <input
                        type="text"
                        value={nome}
                        onChange={(event) => setNome(event.target.value)}
                        placeholder="Nome"
                        className="inputCampo"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="E-mail"
                        className="inputCampo"
                        required
                    />
                    <div className="campoGrupo">
                        <div className="campoDataRotulo">
                            <label htmlFor="dataInicial">Data Inicial:</label>
                            <input
                                type="date"
                                id="dataInicial"
                                value={dataInicial}
                                onChange={(event) => setDataInicial(event.target.value)}
                                className="campoPequeno"
                                required
                            />
                        </div>
                        <div className="campoDataRotulo">
                            <label htmlFor="dataFinal">Data Final:</label>
                            <input
                                type="date"
                                id="dataFinal"
                                value={dataFinal}
                                onChange={(event) => setDataFinal(event.target.value)}
                                className="campoPequeno"
                                required
                            />
                        </div>
                    </div>
                    <div className="campoGrupo">
                        <input
                            type="tel"
                            value={telefone}
                            onChange={(event) => setTelefone(event.target.value)}
                            placeholder="Telefone"
                            className="campoPequeno"
                            required
                        />
                        <input
                            type="text"
                            value={agencia}
                            onChange={(event) => setAgencia(event.target.value)}
                            placeholder="Agência"
                            className="campoPequeno"
                            required
                        />
                    </div>
                    <div className="campoGrupo">
                        <input
                            type="text"
                            value={localOrigem}
                            onChange={(event) => setLocalOrigem(event.target.value)}
                            placeholder="Local de Origem"
                            className="campoPequeno"
                            required
                        />
                        <input
                            type="text"
                            value={localDestino}
                            onChange={(event) => setLocalDestino(event.target.value)}
                            placeholder="Local de Destino"
                            className="campoPequeno"
                            required
                        />
                    </div>
                    <button type="submit" className="submitButton">Enviar</button>
                </form>
            </div>
        </main>
    );
}
