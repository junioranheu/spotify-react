import { loremIpsum } from 'lorem-ipsum';
import Link from 'next/link';
import { Resizable } from 're-resizable';
import React from 'react';
import Styles from '../../styles/sidebar.module.css';
import AvisoFuncaoNaoDesenvolvida from '../../utils/outros/avisoFuncaoNaoDesenvolvida';
import Biblioteca from '../svg/biblioteca';
import Casa from '../svg/casa';
import Coracao from '../svg/coracao';
import Github from '../svg/github';
import Lupa from '../svg/lupa';
import Mais from '../svg/mais';
import SpotifyLogo from '../svg/spotifyLogo';

export default function Sidebar() {

    return (
        <Resizable
            defaultSize={{
                width: 280,
            }}

            minHeight={'100vh'}
            minWidth={185}
            maxWidth={400}
        >
            <aside className={Styles.sidebar}>
                <div>
                    <Link href={'/'}><a><SpotifyLogo width='130px' /></a></Link>
                </div>

                <div className={Styles.divIcones}>
                    <span>
                        <Link href={'/'}>
                            <a>
                                <Casa width='24px' /> <span>Início</span>
                            </a>
                        </Link>
                    </span>

                    <span>
                        <Lupa width='24px' /> <span className='pointer' onClick={AvisoFuncaoNaoDesenvolvida}>Procurar</span>
                    </span>

                    <span>
                        <Link href={'/fila'}>
                            <a>
                                <Biblioteca width='24px' /> <span>Sua fila</span>
                            </a>
                        </Link>
                    </span>

                    <span className='pointer' onClick={() => window.open('https://github.com/junioranheu', '_blank')}>
                        <Github width='24px' /> <span>Github</span>
                    </span>
                </div>

                <div className={Styles.divIcones}>
                    <span>
                        <span className={`${Styles.quadrado} ${Styles.quadradoBranco}`}>
                            <Mais width='12px' cor='var(--preto)' />
                        </span>

                        <span className='pointer' onClick={AvisoFuncaoNaoDesenvolvida}>Criar lista de reprodução</span>
                    </span>

                    <span>
                        <span className={`${Styles.quadrado} ${Styles.quadradoColorido}`}>
                            <Coracao width='12px' cor='var(--branco)' />
                        </span>

                        <span className='pointer' onClick={AvisoFuncaoNaoDesenvolvida}>Músicas curtidas</span>
                    </span>
                </div>

                <div className={Styles.divisao}></div>

                <div className={Styles.divPlaylists}>
                    <span><Link href={'/'}><a>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</a></Link></span>
                    <span><Link href={'/'}><a>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</a></Link></span>
                    <span><Link href={'/'}><a>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</a></Link></span>
                    <span><Link href={'/'}><a>{loremIpsum({ count: 1, sentenceUpperBound: 5 })}</a></Link></span>
                </div>
            </aside>
        </Resizable>
    )
}

