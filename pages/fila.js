import React, { useContext, useEffect, useState } from 'react';
import Coracao from '../components/outros/coracao';
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

    const [isMusicaCurtida, setIsMusicaCurtida] = useState(false);
    function handleCoracao() {
        setIsMusicaCurtida(!isMusicaCurtida);
    }

    return (
        <section className={Styles.container}>
            {/* Fila */}
            <div className={Styles.div}>
                <span className={Styles.titulo}>Fila</span>
                <span className={Styles.subtitulo}>Em reprodução</span>

                <div>
                    {musicaContext.musicaId > 0 ? (
                        <div className={Styles.divMusica}>
                            <div className={Styles.divEsquerda}>
                                <span className={Styles.verde}>1</span>
                                <span>Imagem</span>

                                <div className={Styles.divInfoMusica}>
                                    <span className={Styles.verde}>{musicaContext.nome}</span>
                                    <span>{musicaContext.musicasBandas[0].bandas.nome}</span>
                                </div>
                            </div>

                            <div>
                                <span>Album</span>
                            </div>

                            <div className={Styles.divDireita}>
                                <span onClick={() => handleCoracao()} title={`Curtir/descurtir "${musicaContext.nome}"`}>
                                    <Coracao isMusicaCurtida={isMusicaCurtida} />
                                </span>

                                <span>Tempo</span>
                            </div>
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
