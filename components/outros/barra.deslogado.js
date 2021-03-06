import React from 'react';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/barra.deslogado.module.css';

export default function BarraDeslogado() {
    return (
        <section className={Styles.barraDeslogado}>
            <div className={Styles.divEsquerda}>
                <span className={Styles.titulo}>Pré-visualização do Spotify</span>
                <span>Registre-se para ouvir músicas e podcasts ilimitados com alguns anúncios de vez em quando. Não é necessário cartão de crédito.</span>
            </div>

            <div>
                <div className={Styles.botaoCustom}>
                    <Botao texto={'Registre-se já gratuitamente'} url={'/entrar'} isNovaAba={false} Svg='' />
                </div>
            </div>
        </section>
    )
}

