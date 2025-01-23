  import { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import Header from "./Header";
  import Footer from "./Footer";

  export default function Alterar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [agencia, setAgencia] = useState('');
    const [localOrigem, setLocalOrigem] = useState('');
    const [localDestino, setLocalDestino] = useState('');
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');

    useEffect(() => {
      const buscarUsuario = async () => {
        try {
          const resposta = await fetch(`http://localhost:3000/usuarios/${id}`);
          const dados = await resposta.json();
          setNome(dados.nome);
          setTelefone(dados.telefone);
          setAgencia(dados.agencia);
          setLocalOrigem(dados.localOrigem);
          setLocalDestino(dados.localDestino);
          setDataInicial(dados.dataInicial);
          setDataFinal(dados.dataFinal);
        } catch {
          alert("Erro ao buscar usuário!");
        }
      };
      buscarUsuario();
    }, [id]);

    const alterar = async (event) => {
      event.preventDefault();
      try {
        await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome,
            telefone,
            agencia,
            localOrigem,
            localDestino,
            dataInicial,
            dataFinal,
          }),
        });
        navigate("/");
      } catch {
        alert("Erro ao alterar");
      }
    };

    return (
      <div>
      <Header />
      <div className="mainAlterar">
        <h2>Alterar Dados de Registro: {id}</h2>
        <form className="DadosAlterar" onSubmit={alterar}>
          <div className="esquerdaAlterar">
            <label className="CampoComponente">
              Nome:
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
            <label className="CampoComponente">
              Telefone:
              <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </label>
            <label className="CampoComponente">
              Agência:
              <input type="text" value={agencia} onChange={(e) => setAgencia(e.target.value)} />
            </label>
            <label className="CampoComponente">
              Local de Origem:
              <input type="text" value={localOrigem} onChange={(e) => setLocalOrigem(e.target.value)} />
            </label>
            <label className="CampoComponente">
              Local de Destino:
              <input type="text" value={localDestino} onChange={(e) => setLocalDestino(e.target.value)} />
            </label>
          </div>
    
          <div className="direitaAlterar">
            <label className="CampoComponente">
              Data Inicial:
              <input type="date" value={dataInicial} onChange={(e) => setDataInicial(e.target.value)} />
            </label>
            <label className="CampoComponente">
              Data Final:
              <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />
            </label>
            <button type="submit">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
    
    );
  }
