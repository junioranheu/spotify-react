import React, { Fragment, useState } from 'react';
import BarraDeslogado from './barra.deslogado';

export default function Barra() {
    const [isLogado, setIsLogado] = useState(false);

    return (
        <Fragment>
            {isLogado ? (
                <h1>Logado</h1>
            ) : (
                <BarraDeslogado />
            )}
        </Fragment>
    )
}

