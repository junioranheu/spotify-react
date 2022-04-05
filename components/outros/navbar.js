import Router from 'next/router';
import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/navbar.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';

export default function Navbar() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        console.log(isAuth);
        console.log(Auth.getUsuarioLogado()?.nome);

        setNomeUsuario(isAuth ? Auth.getUsuarioLogado()?.nome : null);
    }, [isAuth]);

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
            {/* <div>
                <h1>aea</h1>
            </div> */}

            <div className={Styles.divDireita}>
                {isAuth ? (
                    <h1 onClick={() => deslogar()}>{nomeUsuario}</h1>
                ) : (
                    <Botao texto={'Entrar'} url={'/entrar'} isNovaAba={false} Svg='' />
                )}
            </div>
        </nav>
    )
}

