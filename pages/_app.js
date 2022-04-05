import 'nprogress/nprogress.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Barra from '../components/outros/barra';
import Navbar from '../components/outros/navbar';
import Sidebar from '../components/outros/sidebar';
import Styles from '../styles/geral.module.css';
import '../styles/globals.css';
import { ListaMusicasProvider } from '../utils/context/listaMusicasContext';
import { MusicaProvider } from '../utils/context/musicaContext';
import { UsuarioProvider } from '../utils/context/usuarioContext';

export default function App({ Component, pageProps }) {
    return (
        <UsuarioProvider>
            <ListaMusicasProvider>
                <MusicaProvider>
                    <ToastContainer />

                    <section className={`${Styles.container} semHighlight`}>
                        <Sidebar />

                        {/* Navbar + Views */}
                        <div className={Styles.containerInner}>
                            <Navbar />
                            <Component {...pageProps} />
                        </div>

                        <Barra />
                    </section>
                </MusicaProvider>
            </ListaMusicasProvider>
        </UsuarioProvider >
    )
}

