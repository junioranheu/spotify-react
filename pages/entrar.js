import React, { useContext, useEffect } from 'react';
import Botao from '../components/outros/botao.js';
import Styles from '../styles/entrar.module.css';
import { UsuarioContext } from '../utils/context/usuarioContext';

export default function Index() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;

    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — Entrar';

        // Verificar se o usuário está logado;
        // Se estiver, redirecione-o;
        if (isAuth) {
            navigate('/', { replace: true });
        }
    }, []);

    return (
        <section className={Styles.container}>
            <span className={Styles.titulo}>Bem-vindo ao Spotify</span>

            <div>
                <input className={`${Styles.input} ${Styles.margemTopP}`} type='email' placeholder='E-mail' />
                <input className={`${Styles.input} ${Styles.margemTopP}`} type='password' placeholder='Senha' />

                <div className={`${Styles.botaoCustom} ${Styles.margemTopP}`}>
                    <Botao texto={'Entrar'} url={'/'} isNovaAba={false} Svg='' />
                </div>
            </div>

            <div className={Styles.divCode}>
                <code>
                    Por enquanto não é possível criar uma nova conta.<br />
                    Entre com o usuário <b className='verde'>usuario</b> e a senha <b className='verde'>123</b>.
                </code>
            </div>
        </section>
    )
}

