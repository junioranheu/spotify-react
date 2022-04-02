import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const MusicaContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const MusicaProvider = props => {
    // https://stackoverflow.com/questions/68189273/referenceerror-localstorage-is-not-defined-using-local-storage-in-nextjs
    if (typeof window !== 'undefined') {
        const [musica, setMusica] = useState(localStorage.getItem('musicaContext') ? JSON.parse(localStorage.getItem('musicaContext')) : {});

        // const [musica, setMusica] = useState({});

        return (
            <MusicaContext.Provider value={[musica, setMusica]}>
                {props.children}
            </MusicaContext.Provider>
        );
    } else {
        return null;
    }
}

// Funções para salvar em localStorage;
export const MusicaStorage = {
    set(data) {
        // console.log(data);
        let parsedData = JSON.stringify(data);
        localStorage.setItem('musicaContext', parsedData);
    },

    get() {
        let data = localStorage.getItem('musicaContext');

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        // console.log(dataJson);
        return dataJson;
    },

    delete() {
        localStorage.removeItem('musicaContext');
    }
}