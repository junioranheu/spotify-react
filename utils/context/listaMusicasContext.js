import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const ListaMusicasContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const ListaMusicasProvider = props => {
    // https://stackoverflow.com/questions/68189273/referenceerror-localstorage-is-not-defined-using-local-storage-in-nextjs
    if (typeof window !== 'undefined') {
        const [listaMusica, setListaMusica] = useState(localStorage.getItem('listaMusicasContextV2') == 'undefined' ? {} : JSON.parse(localStorage.getItem('listaMusicasContextV2')));

        return (
            <ListaMusicasContext.Provider value={[listaMusica, setListaMusica]}>
                {props.children}
            </ListaMusicasContext.Provider>
        );
    } else {
        return null;
    }
}

// Funções para salvar em localStorage;
export const ListaMusicasStorage = {
    set(data) {
        // console.log(data);
        let parsedData = JSON.stringify(data);
        localStorage.setItem('listaMusicasContextV2', parsedData);
    },

    get() {
        let data = localStorage.getItem('listaMusicasContextV2');

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        // console.log(dataJson);
        return dataJson;
    },

    delete() {
        localStorage.removeItem('listaMusicasContextV2');
    }
}