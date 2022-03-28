import React from 'react';
import Styles from '../../styles/barra.player.module.css';
import Coracao from '../svg/barra.player/coracao';
import Dispositivo from '../svg/barra.player/dispositivo';
import Fullscreen from '../svg/barra.player/fullscreen';
import Lista from '../svg/barra.player/lista';
import Microfone from '../svg/barra.player/microfone';
import Toggle from '../svg/barra.player/toggle';
import Volume from '../svg/barra.player/volume';

export default function BarraPlayer() {
    return (
        <section className={Styles.barraPlayer}>
            <div className={Styles.divInfo}>
                <Coracao />
                <Toggle />
                <Microfone />
                <Lista />
                <Dispositivo />
                <Volume />
                <Fullscreen />
            </div>

            <div className={Styles.divPlayer}>
                <h1>Parte 2</h1>
            </div>

            <div className={Styles.divOpcoes}>
                <h1>Parte 3</h1>
            </div>
        </section>
    )
}

