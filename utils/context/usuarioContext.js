import { createContext, useState } from 'react';
import HorarioBrasilia from '../../utils/outros/horarioBrasilia';

// Criar o contexto para usar no providar abaixo;
export const UsuarioContext = createContext();

// Provider: para "segurar" uma informação e passar para todos os componentes "child";
export const UsuarioProvider = props => {
    // https://stackoverflow.com/questions/68189273/referenceerror-localstorage-is-not-defined-using-local-storage-in-nextjs
    if (typeof window !== 'undefined') {
        const [isAuth, setIsAuth] = useState(localStorage.getItem('usuarioAutenticado') !== null ? true : false);

        return (
            <UsuarioContext.Provider value={[isAuth, setIsAuth]}>
                {props.children}
            </UsuarioContext.Provider>
        );
    } else {
        return null;
    }
}

// Funções referentes à autenticação do usuário;
export const Auth = {
    // Função para salvar/instânciar o usuário logado (local storage);
    setUsuarioLogado(data) {
        // console.log(data);
        const dadosUsuario = {
            usuarioId: data.usuarioId,
            nome: data.nomeCompleto,
            nomeUsuarioSistema: data.nomeUsuarioSistema,
            email: data.email,
            usuarioTipoId: data.usuarioTipoId,
            foto: data.foto,
            cidadeId: data.usuariosInformacoes.cidadeId,
            cidadeNome: data.usuariosInformacoes.cidades.nome,
            isVerificado: data.isVerificado,
            token: data.token,
            dataAutenticacao: HorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
        };
        // console.log(dadosUsuario);

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem('usuarioAutenticado', parsedData);
    },

    // Função responsável por recuperar os dados do usuário logado (local storage);
    getUsuarioLogado() {
        let data = localStorage.getItem('usuarioAutenticado');

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        // console.log(dataJson);
        return dataJson;
    },

    // "Deslogar" usuário;
    deleteUsuarioLogado() {
        localStorage.removeItem('usuarioAutenticado');
        // console.log('deslogado');
        // window.location.reload();
    },

    // Função para atualizar as informações do usuário logado (local storage);
    // Caso a variável venha como parâmetro pelo "data, use-a, senão, usa o que já estava em "Auth.getUsuarioLogado().xxx;
    updateUsuarioLogado(data) {
        // console.log(data);
        const dadosUsuario = {
            usuarioId: (data.usuarioId ? data.usuarioId : Auth.getUsuarioLogado().usuarioId),
            nome: (data.nome ? data.nome : Auth.getUsuarioLogado().nome),
            nomeUsuarioSistema: (data.nomeUsuarioSistema ? data.nomeUsuarioSistema : Auth.getUsuarioLogado().nomeUsuarioSistema),
            email: (data.email ? data.email : Auth.getUsuarioLogado().email),
            usuarioTipoId: (data.usuarioTipoId ? data.usuarioTipoId : Auth.getUsuarioLogado().usuarioTipoId),
            foto: (data.foto ? data.foto : Auth.getUsuarioLogado().foto),
            cidadeId: (data.cidadeId ? data.cidadeId : Auth.getUsuarioLogado().cidadeId),
            cidadeNome: (data.cidadeNome ? data.cidadeNome : Auth.getUsuarioLogado().cidadeNome),
            token: (data.token ? data.token : Auth.getUsuarioLogado().token),
            isVerificado: (data.isVerificado ? data.isVerificado : Auth.getUsuarioLogado().isVerificado),
            dataAutenticacao: (data.dataAutenticacao ? data.dataAutenticacao : Auth.getUsuarioLogado().dataAutenticacao)
        };
        // console.log(dadosUsuario);

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem('usuarioAutenticado', parsedData);
    }
}
