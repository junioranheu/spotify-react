import React, { useContext, useEffect } from 'react';
import { Aviso } from '../components/outros/aviso';
import Botao from '../components/outros/botao.js';
import Playlists from '../components/playlists/playlists';
import Styles from '../styles/index.module.css';
import StylesPlaylist from '../styles/playlists.module.css';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { UsuarioContext } from '../utils/context/usuarioContext';
import CONSTANTS_MUSICAS from '../utils/data/constMusicas';
import CONSTANTS_PLAYLISTS from '../utils/data/constPlaylists';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function Index({ playlists }) {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;

    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — React.js — junioranheu';

        // console.log(musicas);
        // console.log(playlists);
    }, []);

    async function renovarLista() {
        const url = CONSTANTS_MUSICAS.API_URL_GET_TODOS;
        const res = await fetch(url)
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
    )
}

export async function getStaticProps() {
    const url = CONSTANTS_PLAYLISTS.API_URL_GET_TODOS;
    const res = await fetch(url)
    const playlists = await res.json();

    return {
        props: {
            playlists
        },
    }
}