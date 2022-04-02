import React, { Fragment, useEffect, useRef, useState } from 'react';
import Musica from '../../static/music/yolo.mp3';
import Styles from '../../styles/progressBar.module.css';
import FormatarSegundos from '../../utils/outros/formatarSegundos.js';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer(props) {
    const refMusica = useRef();
    const refPointer = useRef(null);

    const [tempoAtual, setTempoAtual] = useState(0);
    const [tempoSegundosMaximo, setTempoSegundosMaximo] = useState(0);
    const [widthElemento, setWidthElemento] = useState(0);

    useEffect(() => {
        // Pegar uma vez o width do elemento;
        var rect = document.querySelector('#progressWrapperPlayer').getBoundingClientRect();
        setWidthElemento(rect.width);

        // Ajustar novamente o width do elemento ao dar resize, também ajustar o tempoAtual para desbugar visualmente;
        window.addEventListener('resize', handleResize);
        function handleResize() {
            var rect = document.querySelector('#progressWrapperPlayer').getBoundingClientRect();
            setWidthElemento(rect.width);

            if (rect.width > 0 && rect.width !== Infinity) {
                // console.log(rect.width);
                setarTempoAtual(rect.width);
            }
        }

        // Pegar a duração da música;
        // console.log(refMusica.current.duration);
        setTempoSegundosMaximo(refMusica.current.duration);
        setarInformacoes(refMusica.current.duration, 0);
    }, []);

    function handleClick(e) {
        e.preventDefault();
        var rect = document.querySelector('#progressWrapperPlayer').getBoundingClientRect();
        let posicaoClick = e.clientX - rect.left;
        // console.log(`${e.clientX} - ${rect.left}`);
        // console.log(posicaoClick);

        // Ajustar caso seja menor que 0;
        posicaoClick = posicaoClick < 0 ? 0 : posicaoClick;

        // Calcular o "tempo real";
        let tempoRealCalculo = ((posicaoClick / (widthElemento - 1)) * 100);

        // Corrigir bug do "100";
        if (tempoRealCalculo >= 99) {
            posicaoClick = widthElemento;
        }

        // Usar variaveis referentes ao tempo real da música tocada;
        const segundoAtual = (tempoRealCalculo / 100) * tempoSegundosMaximo;
        // console.log(segundoAtual);

        refMusica.current.currentTime = segundoAtual;
        setTempoAtual(segundoAtual);
    }

    useEffect(() => {
        // console.log(props.isPlaying);
        if (props.isPlaying) {
            refMusica.current.play();
        } else {
            refMusica.current.pause();
        }
    }, [props.isPlaying]);

    useEffect(() => {
        const intervalo = setInterval(() => {
            // console.table([props.isPlaying, tempoSegundosMaximo, refMusica.current.currentTime]);

            if (props.isPlaying && tempoSegundosMaximo > refMusica.current.currentTime) {
                setarTempoAtual(widthElemento);
            } 
        }, 100);

        return () => clearInterval(intervalo);
    }, [props.isPlaying])

    function setarTempoAtual(width) {
        let segundoAtualMusicaTocando = refMusica.current.currentTime;
        // console.log(segundoAtualMusicaTocando);

        let segundosReais = (segundoAtualMusicaTocando / tempoSegundosMaximo) * width;
        setTempoAtual(segundosReais);
        setarInformacoes(tempoSegundosMaximo, segundoAtualMusicaTocando);
    }

    function setarInformacoes(pTempoMaximo, pSegundoAtual) {
        const tempoSegundosMaximoAjustado = FormatarSegundos(pTempoMaximo);
        const tempoSegundosAtualAjustado = FormatarSegundos(pSegundoAtual);

        const infos = {
            tempoSegundosMaximo: tempoSegundosMaximoAjustado,
            tempoSegundosAtual: tempoSegundosAtualAjustado
        };

        // console.log(infos);
        props.getInfoPlayer(infos);
    }

    return (
        <Fragment>
            <div className={Styles.progressWrapper} id='progressWrapperPlayer'
                onClick={(e) => handleClick(e)}
            >
                <div className={Styles.progress} style={{ width: tempoAtual }}>
                    <div className={Styles.pointer} ref={refPointer}>
                        <div className={Styles.toast}></div>
                    </div>
                </div>
            </div>

            <audio ref={refMusica} src={Musica} autoPlay={false} controls={false} />
        </Fragment>
    )
}
