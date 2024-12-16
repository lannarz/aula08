import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function Registrar() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [agencia, setAgencia] = useState('');
  const [localOrigem, setLocalOrigem] = useState('')

  const navigation = useNavigate();

  const registrar = async(event) => {
    event.preventDefault();
    try{
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers:{'Content-Type': 'Application/json'},
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });
      if(resposta.ok){
        navigation('/');
      }
    } catch (error){
      console.log(error)
      alert('Ocorreu um erro na aplicação: ');
    }
  }


  return (
    <main>
      <form onSubmit={registrar}>
        <input type="text" name="" id="" value={nome}  onChange={(event) => setNome(event.target.value)}/> <br/>
        <input type="email" email="" id="" onChange={(event) => setEmail(event.target.value)}/> <br/>
        <button>Salvar</button>
      </form>
    </main>
        
  );
}