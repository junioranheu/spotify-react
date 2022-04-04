import React, { useContext, useEffect } from 'react';
import Styles from '../styles/fila.module.css';
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
            {/* Fila */}
            <div className={Styles.div}>
                <span className={Styles.titulo}>Fila</span>
                <span className={Styles.subtitulo}>Em reprodução</span>

                <div>
                    {musicaContext.musicaId > 0 ? (
                        <div>
                            <span>{musicaContext.nome}</span>
                            <span>{musicaContext.musicasBandas[0].bandas.nome}</span>
                        </div>
                    ) : (
                        <div>Nenhuma música em reprodução agora</div>
                    )}
                </div>
            </div>

            {/* Próximas */}
            <div className={Styles.div}>
                <span className={Styles.titulo}>Próximas</span>

                <div>
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
                </div>
            </div>
        </section>
    )
}
