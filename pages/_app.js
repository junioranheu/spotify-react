import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Barra from '../components/outros/barra';
import Sidebar from '../components/outros/sidebar';
import Styles from '../styles/geral.module.css';
import '../styles/globals.css';
import { ListaMusicasProvider } from '../utils/context/listaMusicasContext';
import { MusicaProvider } from '../utils/context/musicaContext';

export default function App({ Component, pageProps }) {
    return (
        <ListaMusicasProvider>
            <MusicaProvider>
                <ToastContainer />

                <section className={`${Styles.container} semHighlight`}>
                    <Sidebar />
                    <Component {...pageProps} />
                    <Barra />
                </section>
            </MusicaProvider>
        </ListaMusicasProvider>
    )
}

