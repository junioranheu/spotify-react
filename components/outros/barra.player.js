import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import ImgTheStroke from '../../static/image/thestrokes.webp';
import Styles from '../../styles/barra.player.module.css';
import { MusicaContext } from '../../utils/context/musicaContext';
import Aleatorio from '../svg/barra.player/aleatorio';
import BotaoAvancar from '../svg/barra.player/botaoAvancar';
import BotaoPlay from '../svg/barra.player/botaoPlay';
import BotaoStop from '../svg/barra.player/botaoStop';
import BotaoVoltar from '../svg/barra.player/botaoVoltar';
import Coracao from '../svg/barra.player/coracao';
import CoracaoPreenchido from '../svg/barra.player/coracaoPreenchido';
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
        console.log(musicaContext);
    }, [musicaContext]);

    return (
        <section className={Styles.barraPlayer}>
            {/* =-=-=-=-=-=-=-=-=-=-=-= Primeira div, esquerda =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divInfo}>
                <div>
                    <div>
                        <Image src={ImgTheStroke} width={56} height={56} />
                    </div>

                    <div className={Styles.infoMusica}>
                        <span className={Styles.infoTitulo} title={'You Only Live Once'}>You Only Live Once</span>
                        <span className={Styles.infoDescricao} title={'The Strokes'}>The Strokes</span>
                    </div>
                </div>

                <span onClick={() => handleCoracao()} className={Styles.spanIcone} title='Curtir/descurtir música'>
                    {isMusicaCurtida ? (
                        <CoracaoPreenchido />
                    ) : (
                        <Coracao />
                    )}
                </span>

                <span className={Styles.spanIcone} title='Ativar/desativar modo picture-in-picture'>
                    <Toggle />
                </span>
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Segunda div, meio =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divPlayer}>
                <div className={Styles.divPlayerIcones}>
                    <span className={Styles.spanIcone} title='Ativar/desativar modo aleatório'>
                        <Aleatorio />
                    </span>

                    <span className={Styles.spanIcone} title='Voltar uma música'>
                        <BotaoVoltar />
                    </span>

                    <span className={Styles.btnPlay} onClick={() => handleIsPlaying()} >
                        {isPlaying ? (
                            <BotaoStop />
                        ) : (
                            <BotaoPlay />
                        )}
                    </span>

                    <span className={Styles.spanIcone} title='Avançar uma música'>
                        <BotaoAvancar />
                    </span>

                    <span className={Styles.spanIcone} title='Ativar/desativar modo loop'>
                        <Loop />
                    </span>
                </div>

                <div className={Styles.divPlayerInner}>
                    <ProgressBarPlayer isPlaying={isPlaying} volume={volume} />
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

