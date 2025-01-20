import { useState } from "react";
import "./../pag.css";

export default function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    return (
        <header className="header">
            <img src="/src/fotos/Lufthansa_Logo.png" alt="Logo" className="header-logo" />
            <div className="header-options">
                <span className="header-login">LOGIN</span>
                <div className="header-menu">
                    <span onClick={toggleMenu} className="menu-title">MENU</span>
                    {menuAberto && (
                        <ul className="menu-dropdown">
                            <li>xxx</li>
                            <li>xxx</li>
                            <li>xxx</li>
                        </ul>
                    )}
                </div>
                <span className="header-sair">SAIR</span>
            </div>
        </header>
    );
}
