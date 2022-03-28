import { loremIpsum } from 'lorem-ipsum';
import Link from 'next/link';
import { Resizable } from 're-resizable';
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
        <Resizable
            defaultSize={{
                width: 270,
            }}

            minHeight={'100vh'}
            minWidth={170}
            maxWidth={400}
        >
            <aside className={Styles.sidebar}>
                <div>
                    <Link href={'/'}><a><SpotifyLogo width='130px' /></a></Link>
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

                <div className={Styles.divisao}></div>

                <div className={Styles.divPlaylists}>
                    <span>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</span>
                    <span>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</span>
                    <span>{loremIpsum({ coucount: 1, sentenceUpperBound: 5 })}</span>
                    <span>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</span>
                </div>
            </aside>
        </Resizable>
    )
}

