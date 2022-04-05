import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Styles from '../../styles/playlists.module.css';
import BotaoPlay from '../svg/botaoPlay';

export default function Playlists({ playlist }) {
    // console.log(playlist);

    // Import dinâmico: thumbnail da playlist;
    let Thumbnail = '';
    try {
        Thumbnail = require(`../../static/playlists/${playlist.foto}`);
        // console.log(Thumbnail);
    } catch (err) {
        Thumbnail = require('../../static/image/cinza.webp');
        // console.log(err);
    }

    return (
        <Link href={`/playlist/${playlist.playlistId}`}>
            <div className={Styles.playlist} id={playlist.playlistId}>
                <div className={Styles.divThumbnail}>
                    <Image src={Thumbnail} objectFit='contain' alt='' />
                </div>

                <div className={`${Styles.btnPlay}`}>
                    <BotaoPlay width='18' cor='var(--preto)' />
                </div>

                <span className={Styles.tituloPlaylist}>{playlist.nome}</span>
                <span className={Styles.descricaoPlaylist}>{playlist.sobre}</span>
            </div>
        </Link>
    )
}

