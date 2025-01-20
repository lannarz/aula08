import "./../pag.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="redes-sociais">
        <p className="tamanhoDaRedesocial">REDES SOCIAIS</p>
        <img className="tamanhoDaRedeS" src="src/fotos/face.png" alt="Facebook" />
        <img className="tamanhoDaRedeInsta" src="src/fotos/insta.png" alt="Instagram" />
        <img className="tamanhoDaRedeS" src="src/fotos/tt.png" alt="Twitter" />
      </div>
      <div className="descricoes">
        <p>Termos • Politica de Privacidade</p>
        <p id="transparente">© 2018 Direitos Autorais</p>
      </div>
    </div>
  );
}
