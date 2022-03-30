import React, { useRef, useState } from 'react';
import Styles from '../../styles/ProgressBar.volume.module.css';

// https://codesandbox.io/s/quirky-hopper-jfcx9?file=/src/progress.js:0-2097
export default function ProgressBarVolume() {
    const [ptrPosition, setPtrPosition] = useState(null);
    const ptrRef = useRef(null);
    let isMouseDown = false;
    let x = 1;

    const handleMouseLeave = (e) => {
        isMouseDown = false;
    }

    const handleMouseMove = (e) => {
        e.preventDefault();
        var rect = document.querySelector('#progressWrapper').getBoundingClientRect();
        // console.log(e);
        // console.log(rect);
        x = e.clientX - rect.left;

        // Ajustar caso seja menor que 0 ou maior que 100;
        x = x < 0 ? 0 : x;
        // x = x > 100 ? 100 : x;

        // console.log(`${e.clientX} - ${rect.left}`);
        // console.log(x);
    }

    const handleMouseUp = (e) => {
        isMouseDown = false;
        setPtrPosition(x);
    
        console.log(x);
    }

    const handleMouseDown = (e) => {
        isMouseDown = true;
    }

    return (
        <div className={Styles.progressWrapper} id='progressWrapper'
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={handleMouseUp}
        >
            <div className={Styles.progress} style={{ width: ptrPosition }}>
                <div className={Styles.pointer} ref={ptrRef}>
                    <div className={Styles.toast}>
                    </div>
                </div>
            </div>
        </div>
    )
}
