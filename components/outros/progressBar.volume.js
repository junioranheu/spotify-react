import React, { useRef, useState } from 'react';
import Styles from '../../styles/ProgressBar.volume.module.css';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarVolume() {
    const [volume, setVolume] = useState(0);
    const [volumeReal, setVolumeReal] = useState(0);
    const refPointer = useRef(null);
    let x = 1;
    let widthElemento = 1;

    function handleMouseMove(e) {
        e.preventDefault();
        var rect = document.querySelector('#progressWrapper').getBoundingClientRect();
        x = e.clientX - rect.left;
        widthElemento = rect.width;

        // console.log(rect.width);
        // console.log(`${e.clientX} - ${rect.left}`);
        // console.log(x);
    }

    function handleMouseUp() {
        // Ajustar caso seja menor que 0;
        x = x < 0 ? 0 : x;

        // Calcular o volume real, já que o volume pode passar de 100;
        let volumeRealCalculo = ((x / widthElemento) * 100);
        setVolumeReal(volumeRealCalculo);
        // console.log(volumeRealCalculo);

        // Volume "bruto", para exibir no elemento;
        setVolume(x);
        // console.log(x);
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
