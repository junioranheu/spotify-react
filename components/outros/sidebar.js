import React from 'react';
import Styles from '../../styles/sidebar.module.css';
import Biblioteca from '../svg/biblioteca';
import Casa from '../svg/casa';
import Lupa from '../svg/lupa';
import SpotifyLogo from '../svg/spotifyLogo';

export default function Sidebar() {
    return (
        <aside className={Styles.sidebar}>
            <div>
                <SpotifyLogo width='130px' />
            </div>

            <div className={Styles.divIcones}>
                <span>
                    <Casa width='24px' /> <span>Início</span>
                </span>

                <span>
                    <Lupa width='24px' /> <span>Procurar</span>
                </span>

                <span>
                    <Biblioteca width='24px' /> <span>Biblioteca</span>
                </span>
            </div>

            <div className={Styles.divIcones}>
                <span>Criar lista de reprodução</span>
                <span>Músicas que gostou</span>
            </div>
        </aside>
    )
}

