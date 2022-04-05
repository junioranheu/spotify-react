import React, { useContext } from 'react';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/navbar.module.css';
import { UsuarioContext } from '../../utils/context/usuarioContext';

export default function Navbar() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;

    return (
        <nav className={Styles.navbar}>
            {/* <h1>aea</h1> */}

            <div className={Styles.divDireita}>
                {isAuth ? (
                    <h1>LOGADO</h1>
                ) : (
                    <Botao texto={'Entrar'} url={'/entrar'} isNovaAba={false} Svg='' />
                )}
            </div>
        </nav>
    )
}

