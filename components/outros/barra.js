import React, { Fragment, useState } from 'react';
import BarraDeslogado from './barra.deslogado';
import BarraPlayer from './barra.player';

export default function Barra() {
    const [isLogado, setIsLogado] = useState(true);
    function handleClick() {
        setIsLogado(!isLogado);
    }

    return (
        <Fragment>
            <div style={{ position: 'absolute', top: 15, right: 20, cursor: 'pointer', color: 'white' }} onClick={() => handleClick()}>
                <span><code>Autenticar</code></span>
            </div>

            {isLogado ? (
                <BarraPlayer />
            ) : (
                <BarraDeslogado />
            )}
        </Fragment>
    )
}

