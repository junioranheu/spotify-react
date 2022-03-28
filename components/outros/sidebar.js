import React from 'react';
import Styles from '../../styles/sidebar.module.css';
import Biblioteca from '../svg/biblioteca';
import Casa from '../svg/casa';
import Coracao from '../svg/coracao';
import Lupa from '../svg/lupa';
import Mais from '../svg/mais';
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
                <span>
                    <span className={`${Styles.quadrado} ${Styles.quadradoBranco}`}>
                        <Mais width='12px' cor='var(--preto)' />
                    </span>

                    <span>Criar lista de reprodução</span>
                </span>

                <span>
                    <span className={`${Styles.quadrado} ${Styles.quadradoColorido}`}>
                        <Coracao width='12px' cor='var(--branco)' />
                    </span>

                    <span>Músicas curtidas</span>
                </span>
            </div>
        </aside>
    )
}

