import React, { Fragment, useContext } from 'react';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import BarraDeslogado from './barra.deslogado';
import BarraPlayer from './barra.player';

export default function Barra() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;

    return (
        <Fragment>
            {isAuth ? (
                <BarraPlayer />
            ) : (
                <BarraDeslogado />
            )}
        </Fragment>
    )
}

