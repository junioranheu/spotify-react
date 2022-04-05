import Router from 'next/router';
import NProgress from 'nprogress';
import React, { useContext } from 'react';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/navbar.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';

export default function Navbar() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;

    function deslogar() {
        NProgress.start();

        // Desatribuir autenticação ao contexto de usuário;
        setIsAuth(false);

        // Deslogar;
        Auth.deleteUsuarioLogado();
        NProgress.done();

        // Voltar à tela principal;
        Router.push('/');
    }

    return (
        <nav className={Styles.navbar}>
            {/* <h1>aea</h1> */}

            <div className={Styles.divDireita}>
                {isAuth ? (
                    <h1 onClick={() => deslogar()}>LOGADO</h1>
                ) : (
                    <Botao texto={'Entrar'} url={'/entrar'} isNovaAba={false} Svg='' />
                )}
            </div>
        </nav>
    )
}

