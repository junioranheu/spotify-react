import React from 'react';
import Styles from '../../styles/geral.module.css';

export default function Coracao({isMusicaCurtida}) {
    return (
        <div className={`${Styles.coracao} ${(isMusicaCurtida ? Styles.animarCoracao : '')}`}></div>
    )
}