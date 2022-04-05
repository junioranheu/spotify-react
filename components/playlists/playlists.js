import Image from 'next/image';
import React from 'react';
import Styles from '../../styles/playlists.module.css';

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
        <div className={Styles.playlist} key={playlist.playlistId} id={playlist.playlistId}>
            <div className={Styles.divThumbnail}>
                <Image src={Thumbnail} objectFit='contain' alt='' />
            </div>

            <span className={Styles.tituloPlaylist}>{playlist.nome}</span>
            <span className={Styles.descricaoPlaylist}>{playlist.sobre}</span>
        </div>
    )
}

