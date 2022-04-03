import React, { Fragment, useEffect, useRef, useState } from 'react';
// import Musica from '../../static/music/3.mp3';
import Styles from '../../styles/progressBar.module.css';
import FormatarSegundos from '../../utils/outros/formatarSegundos.js';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer(props) {
    useEffect(() => {
        // Tentar infinitas vezes encontrar o refMusica.current.duration;
        function forcarDuracao() {
            if (!refMusica.current.duration) {
                window.setTimeout(forcarDuracao, 100);
                // console.log('Tentando de novo');
            } else {
                // console.log(refMusica.current.duration);
                setTempoSegundosMaximo(refMusica.current.duration);
                setTempoAtual(0);
                setarInformacoes(refMusica.current.duration, 0);

                // Tocar automaticamente;
                if (props.isPlaying) {
                    refMusica.current.play();
                }
            }
        }

        forcarDuracao();
    }, [props.arquivoMusica]);

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
        setTempoAtual(posicaoClick);
    }

    useEffect(() => {
        let volumeAjustado = props.volume / 100;
        refMusica.current.volume = volumeAjustado;

        if (props.isPlaying) {
            refMusica.current.play();
        } else {
            refMusica.current.pause();
        }
    }, [props.isPlaying, props.volume]);

    // "Core do Player";
    useEffect(() => {
        const intervalo = setInterval(() => {
            // console.table([props.isPlaying, tempoSegundosMaximo, refMusica.current.currentTime, props.isModoLoop]);

            if (props.isPlaying && props.arquivoMusica && tempoSegundosMaximo > refMusica.current.currentTime) {
                // console.log(refMusica.current.currentTime);
                setarTempoAtual(widthElemento);
            } else {
                if (props.arquivoMusica) {
                    if (props.isPlaying) {
                        if (props.isModoLoop) {
                            // console.log('Modo loop ativado');
                            refMusica.current.currentTime = 0;
                            setTempoAtual(0);
                            refMusica.current.play();
                        } else {
                            // console.log('Pular para a próxima música');
                            props.handleAvancar();
                        }
                    } else {
                        console.log(`Música "${props.musicaContext.nome}" pausada`);
                    }
                }
            }
        }, 100);

        return () => clearInterval(intervalo);
    }, [props.isPlaying, props.arquivoMusica, tempoSegundosMaximo, props.isModoLoop])

    function setarTempoAtual(width) {
        const currentTime = refMusica.current ? refMusica.current.currentTime : 0;
        let segundoAtualMusicaTocando = currentTime;
        // console.log(segundoAtualMusicaTocando);

        let segundosReais = (segundoAtualMusicaTocando / tempoSegundosMaximo) * width;
        setTempoAtual(segundosReais);
        setarInformacoes(tempoSegundosMaximo, segundoAtualMusicaTocando);
    }

    const [playingInfos, setPlayingInfos] = useState({});
    function setarInformacoes(pTempoMaximo, pSegundoAtual) {
        const tempoSegundosMaximoAjustado = FormatarSegundos(pTempoMaximo);
        const tempoSegundosAtualAjustado = FormatarSegundos(pSegundoAtual);

        const infos = {
            tempoSegundosMaximo: tempoSegundosMaximoAjustado,
            tempoSegundosAtual: tempoSegundosAtualAjustado
        };

        // console.log(infos);
        setPlayingInfos(infos);
    }

    return (
        <Fragment>
            {/* Esquerda, tempo atual */}
            <span className={Styles.tempoSpan}>{playingInfos.tempoSegundosAtual ?? '0:00'}</span>

            {/* Meio, progress bar */}
            <div className={Styles.progressWrapper} id='progressWrapperPlayer'
                onClick={(e) => handleClick(e)}
            >
                <div className={Styles.progress} style={{ width: tempoAtual }}>
                    <div className={Styles.pointer} ref={refPointer}>
                        <div className={Styles.toast}></div>
                    </div>
                </div>
            </div>

            {/* Direita, tempo total da música em questão */}
            <span className={Styles.tempoSpan}>{playingInfos.tempoSegundosMaximo ?? '0:00'}</span>

            {/* Áudio */}
            <audio ref={refMusica} src={props.arquivoMusica} autoPlay={false} controls={false} />
        </Fragment>
    )
}
