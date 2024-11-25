import { useState } from "react";

export default function Registrar() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const registrar = async(event) => {
    event.preventDefault();
    try{
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });
    } catch (error){
      console,log(error)
      alert('Ocorreu um erro na aplicação: ');
    }
  }


  return (
    <main>
      <form onSubmit={registrar}>
        <input value={nome} type="text" onChange={(event) => setNome(event.target.value)}/> <br/>
        <input type="email" onChange={(event) => seteEmail(event.target.value)}/> <br/>
        <button>Salvar</button>
      </form>
    </main>
        
  );
}