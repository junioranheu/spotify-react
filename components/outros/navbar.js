import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Botao from '../../components/outros/botao.js';
import SetinhaBaixo from '../../components/svg/setinhaBaixo';
import Styles from '../../styles/navbar.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import AvisoFuncaoNaoDesenvolvida from '../../utils/outros/avisoFuncaoNaoDesenvolvida';

export default function Navbar() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        // console.log(isAuth);
        // console.log(Auth.getUsuarioLogado()?.nome);

        // Atribuir nome do usuário logado;
        setNomeUsuario(isAuth ? Auth.getUsuarioLogado()?.nome : null);
    }, [isAuth]);

    const [isExibirSubmenu, setIsExibirSubmenu] = useState(false);
    function mostrarSubmenu() {
        setIsExibirSubmenu(!isExibirSubmenu);
    }

    const asPath = useRouter();
    useEffect(() => {
        // console.log(asPath.pathname);

        // Cada reload, setar como false, para fechar submenu;
        setIsExibirSubmenu(false);
    }, [asPath]);

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
                                <span onClick={AvisoFuncaoNaoDesenvolvida}>Conta</span>
                                <span onClick={AvisoFuncaoNaoDesenvolvida}>Perfil</span>
                                <span onClick={deslogar}>Terminar sessão</span>
                            </div>
                        )}
                    </Fragment>
                ) : (
                    <div className={Styles.botaoCustom}>
                        <Botao texto={'Entrar'} url={'/entrar'} isNovaAba={false} Svg='' />
                    </div>
                )}
            </div>
        </nav>
    )
}

