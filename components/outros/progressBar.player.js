import React, { Fragment, useEffect, useRef, useState } from 'react';
import Musica from '../../static/music/yolocut.mp3';
import Styles from '../../styles/progressBar.module.css';
import FormatarSegundos from '../../utils/outros/formatarSegundos.js';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer(props) {
    const refMusica = useRef();

    const [tempoAtual, setTempoAtual] = useState(0);
    const [tempoReal, setTempoReal] = useState(0);

    // Constantes para verificar os segundos da música;
    const [tempoSegundosMaximo, setTempoSegundosMaximo] = useState(0);
    const [tempoSegundosAtual, setTempoSegundosAtual] = useState(0);

    const [widthElemento, setWidthElemento] = useState(0);
    const refPointer = useRef(null);
    let x = 1;

    useEffect(() => {
        // Pegar uma vez o width do elemento;
        var rect = document.querySelector('#progressWrapperPlayer').getBoundingClientRect();
        setWidthElemento(rect.width);

        // Ajustar novamente o width do elemento ao dar resize;
        window.addEventListener('resize', handleResize);
        function handleResize() {
            var rect = document.querySelector('#progressWrapperPlayer').getBoundingClientRect();
            setWidthElemento(rect.width);
        }

        // Pegar a duração da música;
        // console.log(refMusica.current.duration);
        setTempoSegundosMaximo(refMusica.current.duration);
        setarInformacoes(refMusica.current.duration, 0);
    }, []);

    function handleMouseMove(e) {
        e.preventDefault();
        var rect = document.querySelector('#progressWrapperPlayer').getBoundingClientRect();
        x = e.clientX - rect.left;

        // console.log(`${e.clientX} - ${rect.left}`);
        // console.log(x);
    }

    function handleMouseUp() {
        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Parte #01 - Ajustar variaveis tempoAtual e tempoReal, referentes ao que é exibido no player;
        // Ajustar caso seja menor que 0;
        x = x < 0 ? 0 : x;

        // Calcular o tempoReal, já que o tempoAtual pode passar de 100;
        let tempoRealCalculo = ((x / (widthElemento - 1)) * 100);
        setTempoReal(tempoRealCalculo);

        // Corrigir bug do "100";
        if (tempoRealCalculo >= 99) {
            // console.log('100!!!' + widthElemento);
            x = widthElemento;
            setTempoReal(100);
        }

        // Tempo "bruto", para exibir no elemento;
        setTempoAtual(x);

        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Parte #02 - Usar variaveis tempoSegundosMaximo e tempoSegundosAtual, referentes ao tempo real da música tocada;
        const segundoAtual = (tempoRealCalculo / 100) * tempoSegundosMaximo;
        setTempoSegundosAtual(segundoAtual);
        // console.log(segundoAtual);

        // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        // Parte #03 - Verificar o tempo atual e máximo para enviar para o componente pai (barra.player.js); 
        setarInformacoes(tempoSegundosMaximo, segundoAtual);
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
            // Caso o props.isPlaying seja true;
            if (props.isPlaying && tempoSegundosMaximo > refMusica.current.currentTime) {
                let segundoAtualMusicaTocando = refMusica.current.currentTime;
                console.log(segundoAtualMusicaTocando);

                let segundosReais = (segundoAtualMusicaTocando / tempoSegundosMaximo) * widthElemento;
                setTempoAtual(segundosReais);
                setarInformacoes(tempoSegundosMaximo, segundoAtualMusicaTocando);
            }
        }, 100);

        return () => clearInterval(intervalo);
    }, [props.isPlaying])

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
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseUp={() => handleMouseUp()}
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
