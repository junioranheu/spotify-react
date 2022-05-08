import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Aviso } from '../components/outros/aviso';
import Botao from '../components/outros/botao.js';
import Styles from '../styles/entrar.module.css';
import { Auth, UsuarioContext } from '../utils/context/usuarioContext';
import CONSTANTS from '../utils/data/constUsuarios';

export default function Index() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;

    const refUsuario = useRef();
    const refSenha = useRef();
    const refBtn = useRef();

    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — Entrar';

        // Verificar se o usuário está logado;
        // Se estiver, redirecione-o;
        if (isAuth) {
            Router.push('/');
        }
    }, [isAuth]);

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState(null);
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para entrar;
    async function handleSubmit(e) {
        NProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        if (!formData || !formData.usuario || !formData.senha) {
            NProgress.done();
            Aviso.error('O nome de usuário e/ou e-mail estão vazios!', 5000);
            refSenha.current.value = '';
            refUsuario.current.select();
            refBtn.current.disabled = false;
            return false;
        }

        const url = `${CONSTANTS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${formData.usuario}&senha=${formData.senha}`;
        // console.log(url);

        const resposta = await fetch(url);
        if (resposta.status !== 200) {
            NProgress.done();
            refSenha.current.value = '';
            formData.senha = '';
            refUsuario.current.select();
            refBtn.current.disabled = false;
            Aviso.error('Algo deu errado<br/>Provavelmente o usuário e/ou a senha estão errados!', 5000);
            return false;
        }

        // Resposta em JSON;
        const usuario = await resposta.json();

        // Gerar token e autenticar/entrar;
        getToken(formData.usuario, formData.senha, usuario);
    };

    async function getToken(nomeUsuario, senha, usuario) {
        const url = `${CONSTANTS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${nomeUsuario}&senha=${senha}`;
 
        // Gerar token;
        const resposta = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (resposta.status !== 200) {
            Aviso.error('Algo deu errado ao se autenticar!', 5000);
            return false;
        }

        // Resposta em JSON;
        const token = await resposta.json();
        // console.log(respostaJson);

        // Inserir o token no json final para gravar localmente a sessão do login;
        usuario.token = token;
        Auth.setUsuarioLogado(usuario);

        // Atribuir autenticação ao contexto de usuário;
        setIsAuth(true);

        // Voltar à tela principal;
        // navigate('/', { replace: true });
        Router.push('/');
        NProgress.done();
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    return (
        <Fragment>
            {isAuth ? (
                <div>
                    {/* <span>Usuário já está autenticado</span> */}
                </div>
            ) : (
                <section className={Styles.container}>
                    <div className={Styles.containerInner}>
                        <span className={Styles.titulo}>Bem-vindo ao Spotify</span>

                        <div>
                            <input className={`${Styles.input} ${Styles.margemTopP}`} type='text' placeholder='E-mail ou nome de usuário'
                                name='usuario' onChange={handleChange} ref={refUsuario} onKeyPress={handleKeyPress}
                            />

                            <input className={`${Styles.input} ${Styles.margemTopP}`} type='password' placeholder='Senha'
                                name='senha' onChange={handleChange} ref={refSenha} onKeyPress={handleKeyPress}
                            />

                            <div className={`${Styles.botaoCustom} ${Styles.margemTopP}`} onClick={handleSubmit}>
                                <Botao texto={'Entrar'} url={''} isNovaAba={false} Svg='' refBtn={refBtn} />
                            </div>
                        </div>

                        <div className={Styles.divCode}>
                            <code>
                                Por enquanto não é possível criar uma nova conta.<br />
                                Entre com o usuário <b className='verde'>usuario</b> e a senha <b className='verde'>123</b>.
                            </code>
                        </div>
                    </div>
                </section>
            )}
        </Fragment>
    )
}

