import Image from 'next/image';
import NProgress from 'nprogress';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import MusicaRow from '../../components/fila/musicaRow';
import { Aviso } from '../../components/outros/aviso';
import ImageWithFallback from '../../components/outros/imageWithFallback';
import ImgCinza from '../../static/image/cinza.webp';
import GifWait from '../../static/image/wait.gif';
import Styles from '../../styles/fila.module.css';
import StylesPlaylist from '../../styles/playlistDetalhes.module.css';
import { ListaMusicasContext, ListaMusicasStorage } from '../../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../../utils/context/musicaContext';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_MUSICAS from '../../utils/data/constMusicas';
import CONSTANTS_PLAYLISTS from '../../utils/data/constPlaylists';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';
import FormatarSegundosComLegenda from '../../utils/outros/formatarSegundosComLegenda.js';

export default function Playlist({ isApiOk, playlist, musicasDaPlaylist, imgCapa }) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    const [isPaginaCarregada, setIsPaginaCarregada] = useState(false);
    const [isErro, setIsErro] = useState(false);
    const [concatBandas, setConcatBandas] = useState('');
    const [duracaoPlaylist, setDuracaoPlaylist] = useState('');
    useEffect(() => {
        async function processoInicial() {
            NProgress.start();

            // Título da página;
            document.title = `Spotify — ${playlist.nome}`;

            // Setar o valor das bandas da playlist em setConcatBandas();
            // Setar o tempo todal da playlist;
            if (playlist.playlistsMusicas) {
                const c = concatenarBandas(playlist.playlistsMusicas);
                setConcatBandas(c);

                const d = somarDuracaoTotal(playlist.playlistsMusicas);
                setDuracaoPlaylist(d);
            }

            // Atualizar a fila do usuário com as músicas da playlist [id];
            ListaMusicasStorage.set(musicasDaPlaylist);
            setListaMusicasContext(musicasDaPlaylist);

            // Página carregada por completo;
            setIsPaginaCarregada(true);
            NProgress.done();
        }
 
        processoInicial();
    }, []);

    async function setarMusica(e) {
        // Se o usuário estiver deslogado;
        if (!isAuth) {
            Aviso.custom('Inicie uma sessão para escutar essa música', 5000);
            return false;
        }

        const id = e.currentTarget.id;
        // console.log(id);

        const url = `${CONSTANTS_MUSICAS.API_URL_GET_POR_ID}/${id}`;
        const res = await fetch(url)
        const musica = await res.json();
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);
    }

    function concatenarBandas(lista) {
        let bandas = '';
        const limite = 3;
        let contador = 0;
        let isPassouLimite = false;
        lista.forEach(function (playlist, index) {
            // console.log(playlist);

            if (contador <= (limite - 1)) {
                const banda = playlist.musicas.musicasBandas[0]?.bandas.nome;
                // console.log(banda);

                // Se a banda não estiver na string "bandas", adicione-a;
                if (!bandas.includes(banda)) {
                    bandas = bandas + `, ${banda}`;
                    contador++;
                }
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
        <Fragment>
            {!isPaginaCarregada ? (
                <section className={Styles.container}>
                    {/* Página carregando */}

                    {isErro && (
                        <div className={Styles.div}>
                            <span className={Styles.titulo}>Ops....</span>
                            <span className={Styles.textoNormal}>Parece que houve um erro na requisição da API.</span>

                            <div className={Styles.divImgWaiting}>
                                <Image src={GifWait} width={240} height={240} alt='' />
                            </div>
                        </div>
                    )}
                </section>
            ) : (
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
                        <section className={Styles.container}>
                            {/* Banner */}
                            <div className={StylesPlaylist.banner}>
                                {imgCapa && (
                                    <div>
                                        <ImageWithFallback
                                            objectFit='contain' width={220} height={220} className={StylesPlaylist.capa}
                                            src={imgCapa}
                                            fallbackSrc={ImgCinza}
                                        />

                                        {/* <Image src={imgCapa} width={240} height={240} alt='' /> */}
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
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas as playlists;
    const url = CONSTANTS_PLAYLISTS.API_URL_GET_TODOS;
    const res = await fetch(url);
    const playlists = await res.json();

    // Gerar o "paths";
    const paths = playlists.map(p => ({
        params: { id: p.playlistId.toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    let isApiOk = false;

    // Playlist;
    const url1 = `${CONSTANTS_PLAYLISTS.API_URL_GET_POR_ID}/${id}`;
    const res = await fetch(url1);
    const playlist = await res.json();

    // Atualizar a fila do usuário com as músicas da playlist [id];
    const url2 = `${CONSTANTS_MUSICAS.API_URL_POR_PLAYLIST}/${id}`;
    const res2 = await fetch(url2)
    const musicasDaPlaylist = await res2.json();

    // Capa;
    const imgCapa = `${CONSTANTS_UPLOAD.API_URL_GET_PLAYLIST}/${playlist.foto}`;

    // isApiOk;
    isApiOk = true;

    return {
        props: {
            isApiOk,
            playlist,
            musicasDaPlaylist,
            imgCapa
        },
        // revalidate: 10 // segundos
    }
}
