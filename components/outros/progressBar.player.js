import React, { useEffect, useRef, useState } from 'react';
import Styles from '../../styles/progressBar.module.css';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarPlayer() {
    const [tempoAtual, setTempoAtual] = useState(0);
    const [tempoReal, setTempoReal] = useState(0);

    // Constantes para verificar os segundos da música;
    const [tempoSegundosMaximo, setTempoSegundosMaximo] = useState(120);
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
