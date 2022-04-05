import Styles from '../../styles/geral.module.css';

export default function Botao({ texto, url, isNovaAba, Svg, refBtn }) {
    function abrirUrl() {
        // console.log(isNovaAba);

        if (!url) {
            return false;
        }

        if (isNovaAba) {
            window.open(url, '_blank');
        } else {
            window.open(url, '_self');
        }
    }

    return (
        <button className={Styles.botao} onClick={() => abrirUrl()} ref={refBtn}>{Svg ? Svg : ''}{texto}</button>
    )
}