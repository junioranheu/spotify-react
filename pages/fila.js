import React, { useContext, useEffect } from 'react';
import Styles from '../styles/index.module.css';
import { ListaMusicasContext } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';

export default function Fila() {
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — Fila de reprodução';
    }, []);

    function handleClick(e) {
        const id = e.target.id;
        // console.log(id);

        // const res = await fetch(`https://spotifyapi.azurewebsites.net/api/Musicas/${id}`)
        // const musica = await res.json();
        const musicaJson = listaMusicasContext.filter(x => x.musicaId === parseInt(id));
        const musica = musicaJson[0];
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);
    }

    return (
        <section className={Styles.container}>
            <h1>Fila</h1>

            {listaMusicasContext.length > 0 ? (
                <ul>
                    {listaMusicasContext.map((m) => (
                        <li key={m.musicaId} id={m.musicaId} onClick={(e) => handleClick(e)} className={Styles.aea}>
                            {m.nome} - {m.musicasBandas[0].bandas.nome}
                        </li>
                    ))}
                </ul>
            ) : (
                <div>Sem músicas na sua fila de reprodução</div>
            )}
        </section>
    )
}
