import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import MusicaRow from '../../components/fila/musicaRow';
import { Aviso } from '../../components/outros/aviso';
import Styles from '../../styles/fila.module.css';
import StylesPlaylist from '../../styles/playlistDetalhes.module.css';
import { ListaMusicasContext } from '../../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../../utils/context/musicaContext';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import FormatarSegundosComLegenda from '../../utils/outros/formatarSegundosComLegenda.js';

export default function Playlist() {
    const router = useRouter();
    const [playlistId, setPlaylistId] = useState(0);

    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    const [playlist, setPlaylist] = useState({});
    const [capaPlaylist, setCapaPlaylist] = useState();
    const [concatBandas, setConcatBandas] = useState('');
    const [duracaoPlaylist, setDuracaoPlaylist] = useState('');
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
            // Setar o tempo todal da playlist;
            if (playlist.playlistsMusicas) {
                const c = concatenarBandas(playlist.playlistsMusicas);
                setConcatBandas(c);

                const d = somarDuracaoTotal(playlist.playlistsMusicas);
                setDuracaoPlaylist(d);
            }
        }

        if (router.query.id) {
            // Setar o ID da URL;
            setPlaylistId(router.query.id);

            // Buscar playlist;
            fetchPlaylist(router.query.id);
        }
    }, [router]);

    async function setarMusica(e) {
        // Se o usuário estiver deslogado;
        if (!isAuth) {
            Aviso.custom('Inicie uma sessão para escutar essa música', 5000);
            return false;
        }

        const id = e.currentTarget.id;
        // console.log(id);

        const res = await fetch(`https://spotifyapi.azurewebsites.net/api/Musicas/${id}`)
        const musica = await res.json();
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);
    }

    function concatenarBandas(lista) {
        let bandas = '';
        const limite = 3;
        let isPassouLimite = false;
        lista.forEach(function (playlist, index) {
            // console.log(playlist);

            if (index <= (limite - 1)) {
                const banda = playlist.musicas.musicasBandas[0]?.bandas.nome;
                // console.log(banda);

                bandas = bandas + `, ${banda}`;
            } else {
                isPassouLimite = true;
            }
        });

        bandas = bandas.replace(', ', '');

        // Se passou do limite...
        if (isPassouLimite) {
            bandas = bandas + ' e mais';
        }

        return bandas;
    }

    function somarDuracaoTotal(lista) {
        let duracao = 0;
        lista.forEach(function (playlist, index) {
            // console.log(playlist);
            const d = playlist.musicas.duracaoSegundos;
            duracao += d;
        });

        return duracao;
    }

    return (
        <section className={Styles.container}>
            {/* Banner */}
            <div className={StylesPlaylist.banner}>
                {capaPlaylist && (
                    <div>
                        <Image src={capaPlaylist} className={StylesPlaylist.capa} width={220} height={220} alt='' />
                    </div>
                )}

                <div className={StylesPlaylist.divDireita}>
                    <span className={StylesPlaylist.span1}>Lista de reprodução</span>
                    <span className={StylesPlaylist.span2}>{playlist.nome}</span>
                    <span className={StylesPlaylist.span3}>{concatBandas}</span>
                    <span className={StylesPlaylist.span4}>
                        {playlist.usuarios?.nomeCompleto} • {playlist.playlistsMusicas?.length} {(playlist.playlistsMusicas?.length > 1 ? 'músicas' : 'música')}, {FormatarSegundosComLegenda(duracaoPlaylist)}
                    </span>
                </div>
            </div>

            <div className={StylesPlaylist.divisao}></div>

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

