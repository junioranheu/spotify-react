import React, { useEffect, useRef, useState } from 'react';
import Styles from '../../styles/progressBar.module.css';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarVolume(props) {
    const [volume, setVolume] = useState(0);
    const [widthElemento, setWidthElemento] = useState(0);
    const refPointer = useRef(null);

    useEffect(() => {
        // Pegar uma vez o tamanho do elemento;
        var rect = document.querySelector('#progressWrapperVolume').getBoundingClientRect();
        const widthElemento = rect.width;
        setWidthElemento(widthElemento);

        // Definir o volume ao carregar, com base em props.volume;
        const volumeInicial = (props.volume * widthElemento) / 100;
        setVolume(volumeInicial);
    }, [props.volume]);

    function handleClick(e) {
        e.preventDefault();
        var rect = document.querySelector('#progressWrapperVolume').getBoundingClientRect();
        let posicaoClick = e.clientX - rect.left;

        // Ajustar caso seja menor que 0;
        posicaoClick = posicaoClick < 0 ? 0 : posicaoClick;

        // Calcular o volume real, já que o volume pode passar de 100;
        let volumeRealCalculo = ((posicaoClick / (widthElemento - 1)) * 100);
        props.getVolume(volumeRealCalculo);

        // Corrigir bug do "100";
        if (volumeRealCalculo >= 99) {
            // console.log('100!!!' + widthElemento);
            posicaoClick = widthElemento;
            setVolumeReal(100);
        }

        // Volume "bruto", para exibir no elemento;
        setVolume(posicaoClick);
    }

    return (
        <div className={Styles.progressWrapper} id='progressWrapperVolume'
            onClick={(e) => handleClick(e)}
        >
            <div className={Styles.progress} style={{ width: volume }}>
                <div className={Styles.pointer} ref={refPointer}>
                    <div className={Styles.toast}></div>
                </div>
            </div>
        </div>
    )
}
