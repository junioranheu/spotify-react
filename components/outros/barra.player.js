import Image from 'next/image';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Styles from '../../styles/barra.player.module.css';
import { ListaMusicasContext } from '../../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../../utils/context/musicaContext';
import Aleatorio from '../svg/barra.player/aleatorio';
import BotaoAvancar from '../svg/barra.player/botaoAvancar';
import BotaoPlay from '../svg/barra.player/botaoPlay';
import BotaoStop from '../svg/barra.player/botaoStop';
import BotaoVoltar from '../svg/barra.player/botaoVoltar';
import Dispositivo from '../svg/barra.player/dispositivo';
import Fila from '../svg/barra.player/fila';
import FullScreen from '../svg/barra.player/fullscreen';
import Loop from '../svg/barra.player/loop';
import Microfone from '../svg/barra.player/microfone';
import Toggle from '../svg/barra.player/toggle';
import Volume1 from '../svg/barra.player/volume1';
import Volume2 from '../svg/barra.player/volume2';
import Volume3 from '../svg/barra.player/volume3';
import Volume4 from '../svg/barra.player/volume4';
import Coracao from './coracao';
import ProgressBarPlayer from './progressBar.player';
import ProgressBarVolume from './progressBar.volume';

export default function BarraPlayer() {
    const [isMusicaCurtida, setIsMusicaCurtida] = useState(false);
    function handleCoracao() {
        setIsMusicaCurtida(!isMusicaCurtida);
    }

    const [volume, setVolume] = useState(50);
    function getVolume(v) {
        setVolume(Math.floor(v));
    }

    function handleVolume() {
        if (volume > 0) {
            setVolume(0);
        } else {
            setVolume(50);
        }
    }

    function handleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const [isPlaying, setIsPlaying] = useState(false);
    function handleIsPlaying() {
        setIsPlaying(!isPlaying);
    }

    // Quando uma música é selecionada no MusicaContext;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;
    useEffect(() => {
        // console.log(musicaContext);
        // console.log(musicaContext.musicaId);
    }, [musicaContext]);

    // Importar músicas dinamicamente: https://stackoverflow.com/questions/64317730/how-to-dynamically-import-sound-files-in-react;
    const [arquivoMusica, setArquivoMusica] = useState();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    useEffect(() => {
        async function importDinamico() {
            // Importar música dinamicamente;
            const arquivo = await import(`../../static/music/${musicaContext.musicaId}.mp3`);
            setArquivoMusica(arquivo.default);

            console.log(`Música "${musicaContext.nome}" (${musicaContext.musicaId}) importada`);

            // Lógica para não dar play automaticamente ao carregar página;
            if (!isFirstLoad) {
                setIsPlaying(true);
            } else {
                setIsFirstLoad(false);
            }
        }

        if (musicaContext.musicaId > 0) {
            importDinamico();
        }
    }, [musicaContext.musicaId]);

    // Import dinâmico: capa da banda;
    let ImagemBanda = '';
    try {
        const foto = musicaContext.musicasBandas[0].bandas.foto;
        ImagemBanda = require(`../../static/capas/${foto}`);
        // console.log(ImagemBanda);
    } catch (err) {
        ImagemBanda = require('../../static/image/cinza.webp');
        // console.log(err);
    }

    const [listaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    function handleAvancar() {
        // console.log(listaMusicasContext);

        if (listaMusicasContext.length > 0) {
            // console.log(musicaContext.musicaId);
            const index = listaMusicasContext.findIndex(m => m.musicaId === musicaContext.musicaId);
            let proximaMusica = listaMusicasContext[index + 1]; // Avançar;

            // Caso "proximaMusica" esteja vazia, pegue a primeira da lista novamente;
            if (!proximaMusica) {
                // console.log('Não existe index + 1... voltar para o 0');
                proximaMusica = listaMusicasContext[0];
            }

            // console.log(proximaMusica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(proximaMusica);
            setMusicaContext(proximaMusica);
        }
    }

    function handleVoltar() {
        // console.log(listaMusicasContext);

        if (listaMusicasContext.length > 0) {
            // console.log(musicaContext.musicaId);
            const index = listaMusicasContext.findIndex(m => m.musicaId === musicaContext.musicaId);
            let proximaMusica = listaMusicasContext[index - 1]; // Voltar;

            // Caso "proximaMusica" esteja vazia, pegue a primeira da lista novamente;
            if (!proximaMusica) {
                // console.log('Não existe index + 1... voltar para o 0');
                proximaMusica = listaMusicasContext[0];
            }

            // console.log(proximaMusica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(proximaMusica);
            setMusicaContext(proximaMusica);
        }
    }

    return (
        <section className={Styles.barraPlayer}>
            {/* =-=-=-=-=-=-=-=-=-=-=-= Primeira div, esquerda =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divInfo}>
                {musicaContext.musicaId > 0 && (
                    <Fragment>
                        <div>
                            <div>
                                <Image src={ImagemBanda} width={56} height={56} alt='' />
                            </div>

                            <div className={Styles.infoMusica}>
                                <span className={Styles.infoTitulo} title={musicaContext.nome}>
                                    {musicaContext.nome}
                                </span>

                                <span className={Styles.infoDescricao} title={musicaContext.musicasBandas[0].bandas.nome}>
                                    {musicaContext.musicasBandas[0].bandas.nome}
                                </span>
                            </div>
                        </div>

                        <span onClick={() => handleCoracao()} className={`${Styles.spanIcone} ${Styles.iconeCoracao}`} title='Curtir/descurtir música'>
                            <Coracao isMusicaCurtida={isMusicaCurtida} />
                        </span>

                        <span className={Styles.spanIcone} title='Ativar/desativar modo picture-in-picture'>
                            <Toggle />
                        </span>
                    </Fragment>
                )}
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Segunda div, meio =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divPlayer}>
                <div className={Styles.divPlayerIcones}>
                    <span className={Styles.spanIcone} title='Ativar/desativar modo aleatório'>
                        <Aleatorio />
                    </span>

                    <span className={Styles.spanIcone} onClick={() => handleVoltar()} title='Voltar uma música'>
                        <BotaoVoltar />
                    </span>

                    <span className={Styles.btnPlay} onClick={() => handleIsPlaying()} >
                        {isPlaying ? (
                            <BotaoStop />
                        ) : (
                            <BotaoPlay />
                        )}
                    </span>

                    <span className={Styles.spanIcone} onClick={() => handleAvancar()} title='Avançar uma música'>
                        <BotaoAvancar />
                    </span>

                    <span className={Styles.spanIcone} title='Ativar/desativar modo loop'>
                        <Loop />
                    </span>
                </div>

                <div className={Styles.divPlayerInner}>
                    <ProgressBarPlayer isPlaying={isPlaying} volume={volume} arquivoMusica={arquivoMusica} musicaContext={musicaContext} />
                </div>
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Terceira div, direita =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divOpcoes}>
                <span className={Styles.spanIcone} title='Visualizar letra'>
                    <Microfone />
                </span>

                <span className={Styles.spanIcone} title='Visualizar fila'>
                    <Fila />
                </span>

                <span className={Styles.spanIcone} title='Transmitir para outro dispositivo'>
                    <Dispositivo />
                </span>

                <span onClick={() => handleVolume()} className={Styles.spanIcone}>
                    {
                        volume >= 65 ? (
                            <Volume4 />
                        ) : volume >= 30 && volume < 65 ? (
                            <Volume3 />
                        ) : volume >= 1 && volume < 30 ? (
                            <Volume2 />
                        ) : (
                            <Volume1 />
                        )
                    }
                </span>

                <div className={Styles.divVolume} title={`Volume ${volume}`}>
                    <ProgressBarVolume getVolume={getVolume} volume={volume} />
                </div>

                <span onClick={() => handleFullScreen()} className={Styles.spanIcone}>
                    <FullScreen />
                </span>
            </div>
        </section>
    )
}

