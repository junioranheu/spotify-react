import React, { useContext, useEffect } from 'react';
import { Aviso } from '../components/outros/aviso';
import Botao from '../components/outros/botao.js';
import Playlists from '../components/playlists/playlists';
import Styles from '../styles/index.module.css';
import StylesPlaylist from '../styles/playlists.module.css';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { MusicaContext } from '../utils/context/musicaContext';
import { UsuarioContext } from '../utils/context/usuarioContext';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function Index({ musicas, playlists }) {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — React.js — junioranheu';

        // Aviso;
        if (process.env.NODE_ENV === 'production') {
            const msg =
                `Olá! ${EmojiAleatorio()}<br/><br/> 
            Esse projeto foi replicado, sem fins lucrativos, a fim de estudo apenas, utilizando React.js e Next.js, a partir de um projeto real, de uma empresa real.<br/><br/> 
            Feito por @junioranheu.<br/><br/> 
            Todos os direitos reservados à @spotify.`;
            Aviso.custom(msg, 20000);
        }

        // console.log(musicas);
        // console.log(playlists);
    }, []);

    function renovarLista() {
        // Salvar no Context e no localStorage;
        // Guardar provisoriamente a lista de músicas em ListaMusicasContext;
        // console.log(musicas);
        ListaMusicasStorage.set(musicas);
        setListaMusicasContext(musicas);

        Aviso.custom('Lista de músicas padrão renovada em sua lista', 10000);
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
                    {playlists.map((p) => (
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
                    <Botao texto={'{ function renovarLista() }'} url={''} isNovaAba={false} Svg='' />
                </div>
            )}
        </section>
    )
}

export async function getStaticProps() {
    const res1 = await fetch('https://spotifyapi.azurewebsites.net/api/Musicas/todos')
    const musicas = await res1.json();

    const res2 = await fetch('https://spotifyapi.azurewebsites.net/api/Playlists/todos')
    const playlists = await res2.json();

    return {
        props: {
            musicas, playlists
        },
    }
}