import { Aviso } from '../../components/outros/aviso';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';

function avisoFuncaoNaoDesenvolvida() {
    const msg = `Essa função ainda não foi desenvolvida! ${EmojiAleatorio()}`;
    // console.log(msg);
    Aviso.custom(msg, 20000);
}

export default avisoFuncaoNaoDesenvolvida;