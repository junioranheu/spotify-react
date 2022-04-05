import Router from 'next/router';
import React, { Fragment, useContext, useEffect } from 'react';
import MusicaRow from '../components/fila/musicaRow';
import { Aviso } from '../components/outros/aviso';
import Styles from '../styles/fila.module.css';
import { ListaMusicasContext } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import { UsuarioContext } from '../utils/context/usuarioContext';

export default function Fila() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — Fila de reprodução';

        // console.log(musicaContext);
        // console.log(listaMusicasContext);

        // Verificar se o usuário está logado;
        // Se NÃO estiver, redirecione-o;
        if (!isAuth) {
            Aviso.custom('Inicie uma sessão para visualizar sua fila', 5000);
            Router.push('/entrar');
        }
    }, [isAuth]);

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

    return (
        <Fragment>
            {!isAuth ? (
                <div>
                    {/* <span>Usuário não está autenticado</span> */}
                </div>
            ) : (
                <section className={Styles.container}>
                    {/* Atual */}
                    <div className={Styles.div}>
                        <span className={Styles.titulo}>Fila</span>
                        <span className={Styles.subtitulo}>Em reprodução</span>

                        <div>
                            {musicaContext?.musicaId > 0 ? (
                                <MusicaRow
                                    i={1}
                                    id={musicaContext.musicaId}
                                    foto={musicaContext.musicasBandas[0]?.bandas.foto}
                                    titulo={musicaContext.nome}
                                    banda={musicaContext.musicasBandas[0]?.bandas.nome}
                                    album={(musicaContext.albunsMusicas ? musicaContext.albunsMusicas[0]?.albuns.nome : '')}
                                    tempo={musicaContext.duracaoSegundos}
                                    setarMusica={setarMusica}
                                />
                            ) : (
                                <div>
                                    <span className={Styles.textoNormal}>Nenhuma música em reprodução agora</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Próximas na fila */}
                    <div className={Styles.div}>
                        <span className={Styles.titulo}>Próximas</span>

                        <div>
                            {listaMusicasContext?.length > 0 ? (
                                <Fragment>
                                    {listaMusicasContext.filter(x => x.musicaId !== musicaContext?.musicaId).map((m, i) => (
                                        <MusicaRow
                                            key={m.musicaId}
                                            i={(i + 2)} // A ordem tem que começar no 2;
                                            id={m.musicaId}
                                            foto={m.musicasBandas[0]?.bandas.foto}
                                            titulo={m.nome}
                                            banda={m.musicasBandas[0]?.bandas.nome}
                                            album={m.albunsMusicas[0]?.albuns.nome}
                                            tempo={m.duracaoSegundos}
                                            setarMusica={setarMusica}
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
        </Fragment >
    )
}
