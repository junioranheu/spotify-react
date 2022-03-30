import React, { useEffect, useRef, useState } from 'react';
import Styles from '../../styles/progressBar.volume.module.css';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarVolume(props) {
    const [volume, setVolume] = useState(0);
    const [volumeReal, setVolumeReal] = useState(0);
    const [widthElemento, setWidthElemento] = useState(0);
    const refPointer = useRef(null);
    let x = 1;

    useEffect(() => {
        // Pegar uma vez o tamanho do elemento;
        var rect = document.querySelector('#progressWrapper').getBoundingClientRect();
        const widthElemento = rect.width;
        setWidthElemento(widthElemento);

        // Definir o volume ao carregar, com base em props.volume;
        const volumeInicial = (props.volume * widthElemento) / 100;
        setVolume(volumeInicial);
    }, []);


    function handleMouseMove(e) {
        e.preventDefault();
        var rect = document.querySelector('#progressWrapper').getBoundingClientRect();
        x = e.clientX - rect.left;

        // console.log(`${e.clientX} - ${rect.left}`);
        // console.log(x);
    }

    function handleMouseUp() {
        // Ajustar caso seja menor que 0;
        x = x < 0 ? 0 : x;

        // Calcular o volume real, já que o volume pode passar de 100;
        let volumeRealCalculo = ((x / (widthElemento - 1)) * 100);
        setVolumeReal(volumeRealCalculo);
        props.getVolume(volumeRealCalculo);

        // Corrigir bug do "100";
        if (volumeRealCalculo >= 99) {
            console.log('100!!!' + widthElemento);
            x = widthElemento;
            setVolumeReal(100);
        }

        // Volume "bruto", para exibir no elemento;
        setVolume(x);
    }

    return (
        <div className={Styles.progressWrapper} id='progressWrapper'
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseUp={() => handleMouseUp()}
        >
            <div className={Styles.progress} style={{ width: volume }}>
                <div className={Styles.pointer} ref={refPointer}>
                    <div className={Styles.toast}></div>
                </div>
            </div>
        </div>
    )
}
