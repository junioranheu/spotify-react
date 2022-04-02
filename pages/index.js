import React, { useEffect } from 'react';
import Styles from '../styles/index.module.css';

export default function Index({ musicas }) {
    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — React.js — junioranheu';
    }, []);

    return (
        <section className={Styles.container}>
            <ul>
                {musicas.map((m) => (
                    <li key={m.musicaId}>
                        {m.nome} - {m.musicasBandas[0].bandas.nome}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export async function getStaticProps() {
    const res = await fetch('https://spotifyapi.azurewebsites.net/api/Musicas/todos')
    const musicas = await res.json();

    return {
        props: {
            musicas,
        },
    }
}