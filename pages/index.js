import { loremIpsum } from 'lorem-ipsum';
import React, { useEffect } from 'react';
import Styles from '../styles/index.module.css';

export default function Index() {
    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — React.js — junioranheu';
    }, []);

    return (
        <section className={Styles.container}>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
            <h1>{loremIpsum({ count: 1 })}</h1>
        </section>
    )
}
