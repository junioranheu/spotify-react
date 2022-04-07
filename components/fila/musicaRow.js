import Image from 'next/image';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Coracao from '../../components/outros/coracao';
import Reticencias from '../../components/svg/reticencias';
import GifEqualiser from '../../static/image/equaliser.gif';
import Styles from '../../styles/fila.module.css';
import { MusicaContext } from '../../utils/context/musicaContext';
import AvisoFuncaoNaoDesenvolvida from '../../utils/outros/avisoFuncaoNaoDesenvolvida';
import FormatarSegundos from '../../utils/outros/formatarSegundos.js';
import BotaoPlay from '../svg/botaoPlay';

export default function MusicaRow({ i, id, foto, titulo, banda, album, tempo, setarMusica, isDesativarUm }) {

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

    // Quando uma música é selecionada no MusicaContext;
    const [musicaContext] = useContext(MusicaContext); // Context da música;
    useEffect(() => {
        // console.log(musicaContext);
        // console.log(musicaContext?.musicaId);
    }, [musicaContext]);

    return (
        <div className={Styles.divMusica}>
            <div className={Styles.divEsquerda}>

                {isDesativarUm ? (
                    <Fragment>
                        <span className={`${(i > 1 ? Styles.contador : Styles.contadorItem1)} ${(i === 1 ? Styles.verde : '')}`}>
                            {((id === musicaContext?.musicaId) ? <Image src={GifEqualiser} width={14} height={14} alt='' /> : i)}
                        </span>

                        <span className={`${(i > 1 ? Styles.esconderPlay : Styles.esconderItem1)}`} onClick={(e) => setarMusica(e)} id={id}><BotaoPlay width='14' cor='#A7A7A7' /></span>
                    </Fragment>
                ) : (
                    <Fragment>
                        <span className={Styles.contador}>
                            {((id === musicaContext?.musicaId) ? <Image src={GifEqualiser} width={14} height={14} alt='' /> : i)}
                        </span>

                        <span className={Styles.esconderPlay} onClick={(e) => setarMusica(e)} id={id}><BotaoPlay width='14' cor='#A7A7A7' /></span>
                    </Fragment>
                )}

                <div className={Styles.divImg}>
                    <Image src={ImagemBanda} width={40} height={40} alt='' />
                </div>

                <div className={Styles.divInfoMusica}>
                    <span className={`${Styles.verdeOnHover} ${(i === 1 && isDesativarUm ? Styles.verde : '')}`}>{titulo}</span>
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

                <span>{FormatarSegundos(tempo)}</span>
                <span className='pointer' onClick={AvisoFuncaoNaoDesenvolvida}><Reticencias width='16' cor='#A7A7A7' /></span>
            </div>
        </div>
    )
}

