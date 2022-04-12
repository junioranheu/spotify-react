import Link from 'next/link';
import React from 'react';
import ImageWithFallback from '../../components/outros/imageWithFallback';
import ImgCinza from '../../static/image/cinza.webp';
import Styles from '../../styles/playlists.module.css';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import BotaoPlay from '../svg/botaoPlay';

export default function Playlists({ playlist }) {
    // console.log(playlist);

    return (
        <Link href={`/playlist/${playlist.playlistId}`} passHref>
            <div className={Styles.playlist} id={playlist.playlistId}>
                <div className={Styles.divThumbnail}>
                    <ImageWithFallback
                        objectFit='contain' width={250} height={250}
                        src={`${CONSTANTS_UPLOAD.API_URL_GET_PLAYLIST}/${playlist.foto}`}
                        fallbackSrc={ImgCinza}
                    />
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

