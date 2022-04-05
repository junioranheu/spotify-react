import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Botao from '../../components/outros/botao.js';
import SetinhaBaixo from '../../components/svg/setinhaBaixo';
import Styles from '../../styles/navbar.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';

export default function Navbar() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        // console.log(isAuth);
        // console.log(Auth.getUsuarioLogado()?.nome);

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
                    <Fragment>
                        <div className={Styles.divOpcoes}>
                            {nomeUsuario}
                            <SetinhaBaixo width='12' cor='var(--branco)' />
                        </div>

                        <div className={Styles.subMenu}>
                           <span>Conta</span>
                           <span>Perfil</span>
                           <span>Terminar sessão</span>
                        </div>
                    </Fragment>
                ) : (
                    <Botao texto={'Entrar'} url={'/entrar'} isNovaAba={false} Svg='' />
                )}
            </div>
        </nav>
    )
}

