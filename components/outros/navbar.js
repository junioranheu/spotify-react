import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Botao from '../../components/outros/botao.js';
import SetinhaBaixo from '../../components/svg/setinhaBaixo';
import Styles from '../../styles/navbar.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';

export default function Navbar() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        // console.log(isAuth);
        // console.log(Auth.getUsuarioLogado()?.nome);

        setNomeUsuario(isAuth ? Auth.getUsuarioLogado()?.nome : null);
    }, [isAuth]);

    const [isExibirSubmenu, setIsExibirSubmenu] = useState(false);
    function mostrarSubmenu() {
        setIsExibirSubmenu(!isExibirSubmenu);
    }

    function avisoNaoDesenvolvido() {
        const msg = `Essa função ainda não foi desenvolvida! ${EmojiAleatorio()}`;
        // console.log(msg);
        Aviso.custom(msg, 20000);
    }

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
                    <Fragment>
                        <div className={Styles.divOpcoes} onClick={() => mostrarSubmenu()}>
                            {nomeUsuario}
                            <SetinhaBaixo width='12' cor='var(--branco)' />
                        </div>

                        {isExibirSubmenu && (
                            <div className={Styles.subMenu}>
                                <span onClick={avisoNaoDesenvolvido}>Conta</span>
                                <span onClick={avisoNaoDesenvolvido}>Perfil</span>
                                <span onClick={deslogar}>Terminar sessão</span>
                            </div>
                        )}
                    </Fragment>
                ) : (
                    <Botao texto={'Entrar'} url={'/entrar'} isNovaAba={false} Svg='' />
                )}
            </div>
        </nav>
    )
}

