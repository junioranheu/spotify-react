import React, { Fragment, useState } from 'react';
import BarraDeslogado from './barra.deslogado';
import BarraPlayer from './barra.player';

export default function Barra() {
    const [isLogado, setIsLogado] = useState(true);

    return (
        <Fragment>
            {isLogado ? (
                <BarraPlayer/>
            ) : (
                <BarraDeslogado />
            )}
        </Fragment>
    )
}

