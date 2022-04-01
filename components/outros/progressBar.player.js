import React, { useEffect, useRef, useState } from 'react';
import Styles from '../../styles/progressBar.module.css';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer(props) {
    const [tempoAtual, setTempoAtual] = useState(0);
    const [tempoReal, setTempoReal] = useState(0);

    // Constantes para verificar os segundos da música;
    const [tempoSegundosMaximo, setTempoSegundosMaximo] = useState(20);
    const [tempoSegundosAtual, setTempoSegundosAtual] = useState(0);

    const [widthElemento, setWidthElemento] = useState(0);
    const refPointer = useRef(null);
    let x = 1;

    useEffect(() => {
        // Pegar uma vez o tamanho do elemento;
        var rect = document.querySelector('#progressWrapperPlayer').getBoundingClientRect();
        const widthElemento = rect.width;
        setWidthElemento(widthElemento);
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
    }

    useEffect(() => {
        const intervalo = setInterval(() => {
            // Caso o props.isPlaying seja true, "itere" os segundos para mostrar no tempoReal;
            if (props.isPlaying) {
                if (tempoAtual >= tempoSegundosMaximo) {
                    console.log('FIMMMMMMMMMMMMM');
                } else {
                    // Iterar;
                    setTempoAtual(tempoAtual + (widthElemento / tempoSegundosMaximo));
                }
            }

            // Verificar o tempo atual e máximo para enviar para o componente pai (barra.player.js);
            const tempoSegundosMaximoAjustado = fancyTimeFormat(tempoSegundosMaximo);
            const tempoSegundosAtualAjustado = fancyTimeFormat(tempoSegundosAtual);

            const infos = {
                tempoSegundosMaximo: tempoSegundosMaximoAjustado,
                tempoSegundosAtual: tempoSegundosAtualAjustado
            };

            // console.log(infos);
            // props.getInfoPlayer(infos);
        }, 1000);

        return () => clearInterval(intervalo);
    }, [props.isPlaying, tempoAtual, tempoSegundosAtual])

    useEffect(() => {
        console.log(tempoAtual);
    }, [tempoAtual])

    function fancyTimeFormat(duration) {
        // Hours, minutes and seconds
        var hrs = ~~(duration / 3600);
        var mins = ~~((duration % 3600) / 60);
        var secs = ~~duration % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    return (
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
    )
}
