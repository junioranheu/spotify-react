import React, { useContext, useEffect } from 'react';
import Styles from '../styles/index.module.css';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';

export default function Index({ musicas }) {
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — React.js — junioranheu';

        // Salvar no Context e no localStorage;
        // Guardar provisoriamente a lista de músicas em ListaMusicasContext;
        ListaMusicasStorage.set(musicas);
        setListaMusicasContext(musicas);
    }, [musicas]);

    async function handleClick(e) {
        const id = e.target.id;
        // console.log(id);

        const res = await fetch(`https://spotifyapi.azurewebsites.net/api/Musicas/${id}`)
        const musica = await res.json();
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);
    }

    return (
        <section className={Styles.container}>
            <ul>
                {musicas.map((m) => (
                    <li key={m.musicaId} id={m.musicaId} onClick={(e) => handleClick(e)} className={Styles.aea}>
                        {m.nome} - {m.musicasBandas[0].bandas.nome}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://spotifyapi.azurewebsites.net/api/Musicas/todos')
    const musicas = await res.json();

    return {
        props: {
            musicas,
        },
    }
}