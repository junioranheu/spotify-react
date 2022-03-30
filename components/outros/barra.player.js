import Image from 'next/image';
import React, { useState } from 'react';
import ImgTheStroke from '../../static/thestrokes.webp';
import Styles from '../../styles/barra.player.module.css';
import Coracao from '../svg/barra.player/coracao';
import CoracaoPreenchido from '../svg/barra.player/coracaoPreenchido';
import Dispositivo from '../svg/barra.player/dispositivo';
import Fullscreen from '../svg/barra.player/fullscreen';
import Lista from '../svg/barra.player/lista';
import Microfone from '../svg/barra.player/microfone';
import Toggle from '../svg/barra.player/toggle';
import Volume1 from '../svg/barra.player/volume1';
import Volume2 from '../svg/barra.player/volume2';
import Volume3 from '../svg/barra.player/volume3';
import Volume4 from '../svg/barra.player/volume4';
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

    return (
        <section className={Styles.barraPlayer}>
            {/* Primeira div, esquerda */}
            <div className={Styles.divInfo}>
                <div>
                    <div>
                        <Image src={ImgTheStroke} width={56} height={56} />
                    </div>

                    <div className={Styles.infoMusica}>
                        <span className={Styles.infoTitulo}>bla bla bla!</span>
                        <span className={Styles.infoDescricao}>chalequito</span>
                    </div>
                </div>

                <span onClick={() => handleCoracao()} className={Styles.spanCoracao}>
                    {isMusicaCurtida ? (
                        <CoracaoPreenchido />
                    ) : (
                        <Coracao />
                    )}
                </span>

                <Toggle />
            </div>

            {/* Segunda div, meio */}
            <div className={Styles.divPlayer}>
                <h1>Parte 2</h1>
            </div>

            {/* Terceira div, direita */}
            <div className={Styles.divOpcoes}>
                <Microfone />
                <Lista />
                <Dispositivo />

                <span onClick={() => handleVolume()} className={Styles.spanVolume}>
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

                <Fullscreen />
            </div>

            {
                // Exibir o volume 
                process.env.NODE_ENV === 'development' && (
                    <span style={{ color: 'var(--verde)' }}>
                        <code>{volume}</code>
                    </span>
                )
            }
        </section>
    )
}

