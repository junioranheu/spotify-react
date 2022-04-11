import 'nprogress/nprogress.css';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Aviso } from '../components/outros/aviso';
import Barra from '../components/outros/barra';
import Navbar from '../components/outros/navbar';
import Sidebar from '../components/outros/sidebar';
import Styles from '../styles/geral.module.css';
import '../styles/globals.css';
import { IsPlayingProvider } from '../utils/context/isPlayingContext';
import { ListaMusicasProvider } from '../utils/context/listaMusicasContext';
import { MusicaProvider } from '../utils/context/musicaContext';
import { UsuarioProvider } from '../utils/context/usuarioContext';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';

export default function App({ Component, pageProps }) {

    useEffect(() => {
        // Aviso;
        if (process.env.NODE_ENV === 'production') {
            const msg =
                `Olá! ${EmojiAleatorio()}<br/><br/> 
            Esse projeto foi replicado, sem fins lucrativos, a fim de estudo apenas, utilizando React.js e Next.js, a partir de um projeto real, de uma empresa real.<br/><br/> 
            Feito por @junioranheu.<br/><br/> 
            Todos os direitos reservados à @spotify.`;
            Aviso.custom(msg, 20000);
        }
    }, []);

    return (
        <UsuarioProvider>
            <ListaMusicasProvider>
                <MusicaProvider>
                    <IsPlayingProvider>
                        <ToastContainer className='semHighlight' />

                        <section className={`${Styles.container} semHighlight`}>
                            <div className={Styles.sideBarRemoverSeWidthPequeno}>
                                <Sidebar />
                            </div>

                            {/* Navbar + Views */}
                            <div className={Styles.containerInner}>
                                <Navbar />
                                <Component {...pageProps} />
                            </div>

                            <Barra />
                        </section>
                    </IsPlayingProvider>
                </MusicaProvider>
            </ListaMusicasProvider>
        </UsuarioProvider >
    )
}

