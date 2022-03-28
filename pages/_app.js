import React from 'react';
import Barra from '../components/outros/barra';
import Sidebar from '../components/outros/sidebar';
import Styles from '../styles/geral.module.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <section className={Styles.container}>
            <Sidebar />
            <Component {...pageProps} />
            <Barra />
        </section>
    )
}

