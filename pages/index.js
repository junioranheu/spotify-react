import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { Aviso } from '../components/outros/aviso';
import Styles from '../styles/index.module.css';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';

export default function Index({ musicas, playlists }) {
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

    async function setarMusica(e) {
        const id = e.target.id;
        // console.log(id);

        const res = await fetch(`https://spotifyapi.azurewebsites.net/api/Musicas/${id}`)
        const musicaJson = await res.json();

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musicaJson);
        setMusicaContext(musicaJson);
    }

    function renovarLista() {
        // Salvar no Context e no localStorage;
        // Guardar provisoriamente a lista de músicas em ListaMusicasContext;
        // console.log(musicas);
        ListaMusicasStorage.set(musicas);
        setListaMusicasContext(musicas);
    }

    return (
        <section className={Styles.container} style={{ color: 'white' }}>
            <h1>Página inicial</h1>

            <button onClick={() => renovarLista()}>TESTE: Renovar lista</button>
            <button><Link href={'/fila'}><a>Sua fila</a></Link></button>

            <h1>Músicas</h1>
            <ul>
                {musicas.map((m) => (
                    <li key={m.musicaId} id={m.musicaId} onClick={(e) => setarMusica(e)} className={Styles.aea}>
                        {m.nome} - {m.musicasBandas[0].bandas.nome}
                    </li>
                ))}
            </ul>

            <h1>Playlists</h1>
            <ul>
                {playlists.map((p) => (
                    <li key={p.playlistId} id={p.playlistId} className={Styles.aea}>
                        {p.nome} - {p.sobre}
                    </li>
                ))}
            </ul>
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