import Image from 'next/image';
import React, { useState } from 'react';
import Coracao from '../../components/outros/coracao';
import Reticencias from '../../components/svg/reticencias';
import Styles from '../../styles/fila.module.css';
import BotaoPlay from '../svg/botaoPlay';

export default function MusicaRow({ i, id, foto, titulo, banda, album, tempo, setarMusica }) {

    // Import dinâmico: capa da banda;
    let ImagemBanda = '';
    try {
        ImagemBanda = require(`../../static/capas/${foto}`);
        // console.log(ImagemBanda);
    } catch (err) {
        ImagemBanda = require('../../static/image/cinza.webp');
        // console.log(err);
    }

    const [isMusicaCurtida, setIsMusicaCurtida] = useState(false);
    function handleCoracao() {
        setIsMusicaCurtida(!isMusicaCurtida);
    }

    return (
        <div className={Styles.divMusica} >
            <div className={Styles.divEsquerda}>
                <span className={`${Styles.contador} ${(i === 1 ? Styles.verde : '')}`}>{i}</span>
                <span className={Styles.esconderPlay} onClick={(e) => setarMusica(e)} id={id}><BotaoPlay width='14' cor='#A7A7A7' /></span>

                <div>
                    <Image src={ImagemBanda} width={40} height={40} alt='' />
                </div>

                <div className={Styles.divInfoMusica}>
                    <span className={`${Styles.verdeOnHover} ${(i === 1 ? Styles.verde : '')}`}>{titulo}</span>
                    <span>{banda}</span>
                </div>
            </div>

            <div className={Styles.divMeio}>
                <span>{album}</span>
            </div>

            <div className={Styles.divDireita}>
                <span onClick={() => handleCoracao()} title={`Curtir/descurtir "${titulo}"`}>
                    <Coracao isMusicaCurtida={isMusicaCurtida} />
                </span>

                <span>{tempo}</span>
                <span><Reticencias width='16' cor='#A7A7A7' /></span>
            </div>
        </div>
    )
}

