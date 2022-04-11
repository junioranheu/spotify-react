import Image from 'next/image';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Aviso } from '../components/outros/aviso';
import Botao from '../components/outros/botao.js';
import Playlists from '../components/playlists/playlists';
import GifWait from '../static/image/wait.gif';
import Styles from '../styles/index.module.css';
import StylesPlaylist from '../styles/playlists.module.css';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { UsuarioContext } from '../utils/context/usuarioContext';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function Index({ playlists }) {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;

    const [isApiOk, setIsApiOk] = useState(null);
    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — React.js — junioranheu';

        async function verificarAPI() {
            try {
                const res = await fetch('https://spotifyapi.azurewebsites.net/status');
                // console.log(res.status);

                if (res.status === 200) {
                    setIsApiOk(true);
                } else {
                    setIsApiOk(false);
                }
            } catch (error) {
                console.log('Houve algum erro na requisição da API');
            }
        }

        // Verificar se a API está "on";
        verificarAPI();

        // console.log(musicas);
        // console.log(playlists);
    }, []);

    async function renovarLista() {
        const res = await fetch('https://spotifyapi.azurewebsites.net/api/Musicas/todos')
        const musicas = await res.json();

        // Salvar no Context e no localStorage;
        // console.log(musicas);
        ListaMusicasStorage.set(musicas);
        setListaMusicasContext(musicas);

        Aviso.custom('Todas as músicas disponíveis atualmente foram importadas para sua fila', 10000);
    }

    function gerarOla() {
        var hora = HorarioBrasilia().hour();
        // console.log(hora);
        var msg = '';

        if (hora >= 5 && hora < 12) {
            msg = 'Bom dia';
        } else if (hora >= 12 && hora < 18) {
            msg = 'Boa tarde';
        } else {
            msg = 'Boa noite';
        }

        return msg;
    }

    return (
        <Fragment>
            {isApiOk === false ? (
                <section className={Styles.container} style={{ color: 'white' }}>
                    <div className={Styles.div}>
                        <span className={Styles.titulo}>Aguarde alguns segundos, por favor.</span>
                        <span className={Styles.textoNormal}>A API está off-line.</span>
                        <span className={Styles.textoNormal}>Ela está hospedada na Azure, em um plano gratuito, por isso é necessário aguardar um pouquinho no primeiro acesso! {EmojiAleatorio()}</span>

                        <div className={Styles.divImgWaiting}>
                            <Image src={GifWait} width={240} height={240} alt='' />
                        </div>
                    </div>
                </section>
            ) : (
                <section className={Styles.container} style={{ color: 'white' }}>
                    <span className={Styles.bomDia}>{gerarOla()}</span>

                    <div className={Styles.div}>
                        <span className={Styles.titulo}>Playlists disponíveis no momento {EmojiAleatorio()}</span>

                        <div className={StylesPlaylist.divPlaylists}>
                            {playlists.filter(x => x.isAtivo === 1).map((p) => (
                                <Playlists playlist={p} key={p.playlistId} />
                            ))}
                        </div>
                    </div>

                    <div className={Styles.div}>
                        <span className={Styles.titulo}>Outras playlists</span>
                        <span className={Styles.textoNormal}>Novas playlists serão criadas e, mais para frente, será permitido criar suas proprias!</span>

                        {isAuth && (
                            <span className={Styles.textoNormal}>Para “renovar” sua playlist por completo, clique no botão abaixo.</span>
                        )}
                    </div>

                    {isAuth && (
                        <div className={Styles.botaoCustom} onClick={() => renovarLista()}>
                            <Botao texto={'Importar todas as músicas'} url={''} isNovaAba={false} Svg='' />
                        </div>
                    )}
                </section>
            )}
        </Fragment >
    )
}

export async function getStaticProps() {
    const res = await fetch('https://spotifyapi.azurewebsites.net/api/Playlists/todos')
    const playlists = await res.json();

    return {
        props: {
            playlists
        },
    }
}