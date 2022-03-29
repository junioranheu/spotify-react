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
import Volume from '../svg/barra.player/volume';

export default function BarraPlayer() {
    const [isMusicaCurtida, setIsMusicaCurtida] = useState(false);

    function handleCoracao() {
        setIsMusicaCurtida(!isMusicaCurtida);
    }

    return (
        <section className={Styles.barraPlayer}>
            <div className={Styles.divInfo}>
                <div>
                    <div>
                        <Image src={ImgTheStroke} width={56} height={56} />
                    </div>

                    <div className={Styles.infoMusica}>
                        <span className={Styles.infoTitulo}>bla bla bla</span>
                        <span className={Styles.infoDescricao}>vai tomar no cu</span>
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

            <div className={Styles.divPlayer}>
                <h1>Parte 2</h1>
            </div>

            <div className={Styles.divOpcoes}>
                <Microfone />
                <Lista />
                <Dispositivo />
                <Volume />
                <span>volume</span>
                <Fullscreen />
            </div>
        </section>
    )
}

