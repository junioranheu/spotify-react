import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import MusicaRow from '../../components/fila/musicaRow';
import Styles from '../../styles/fila.module.css';
import StylesPlaylist from '../../styles/playlistDetalhes.module.css';
import { ListaMusicasContext } from '../../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../../utils/context/musicaContext';

export default function Playlist() {
    const router = useRouter();
    const [playlistId, setPlaylistId] = useState(0);

    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    const [playlist, setPlaylist] = useState({});
    const [capaPlaylist, setCapaPlaylist] = useState();
    const [concatBandas, setConcatBandas] = useState('');
    useEffect(() => {
        async function fetchPlaylist(id) {
            const res = await fetch(`https://spotifyapi.azurewebsites.net/api/Playlists/${id}`)
            const playlist = await res.json();
            setPlaylist(playlist);
            // console.log(playlist);

            // Título da página;
            document.title = `Spotify — ${playlist.nome}`;

            // Import dinâmico: capa da playlist;
            let ImagemCapaPlaylist = '';
            try {
                ImagemCapaPlaylist = require(`../../static/playlists/${playlist.foto}`);
                // console.log(ImagemCapaPlaylist);
            } catch (err) {
                ImagemCapaPlaylist = require('../../static/image/cinza.webp');
                // console.log(err);
            }

            setCapaPlaylist(ImagemCapaPlaylist);

            // Setar o valor das bandas da playlist em setConcatBandas();
            if (playlist.playlistsMusicas) {
                const c = concatenarBandas(playlist.playlistsMusicas);
                setConcatBandas(c);
            }
        }

        // Setar o ID da URL;
        setPlaylistId(router.query.id);

        // Buscar playlist;
        fetchPlaylist(router.query.id);
    }, [router]);

    function setarMusica(e) {
        const id = e.currentTarget.id;
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

    function concatenarBandas(lista) {
        lista.forEach(function (item, index) {
            console.log(item, index);
        });

        //         const l = lista.reduce(function (a, b) {
        //             return a.concat(b).concat(",");
        //         }, []).slice(0, -1);

        // console.log(l);

        return 'a';
    }

    return (
        <section className={Styles.container}>
            {/* Banner */}
            <div className={StylesPlaylist.banner}>
                {capaPlaylist && (
                    <div>
                        <Image src={capaPlaylist} width={220} height={220} alt='' />
                    </div>
                )}

                <div className={StylesPlaylist.divDireita}>
                    <span className={StylesPlaylist.span1}>Lista de reprodução</span>
                    <span className={StylesPlaylist.span2}>{playlist.nome}</span>
                    <span className={StylesPlaylist.span3}>{concatBandas}</span>
                    <span className={StylesPlaylist.span4}>
                        {playlist.usuarios?.nomeCompleto} • {playlist.playlistsMusicas?.length} {(playlist.playlistsMusicas?.length > 1 ? 'músicas' : 'música')}, 3h 20 min
                    </span>
                </div>
            </div>

            {/* Playlist */}
            <div className={Styles.div}>
                <div>
                    {playlist?.playlistsMusicas?.length > 0 ? (
                        <Fragment>
                            {playlist.playlistsMusicas.map((m, i) => (
                                <MusicaRow
                                    key={m.musicas.musicaId}
                                    i={(i + 1)} // A ordem tem que começar no 1;
                                    id={m.musicas.musicaId}
                                    foto={m.musicas.musicasBandas[0]?.bandas?.foto}
                                    titulo={m.musicas.nome}
                                    banda={m.musicas.musicasBandas[0]?.bandas?.nome}
                                    album={m.musicas.albunsMusicas?.albuns?.nome}
                                    tempo={m.musicas.duracaoSegundos}
                                    setarMusica={setarMusica}
                                    isDesativarUm={false}
                                />
                            ))}
                        </Fragment>
                    ) : (
                        <div>
                            <span className={Styles.textoNormal}>Sem músicas na sua fila de reprodução</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

