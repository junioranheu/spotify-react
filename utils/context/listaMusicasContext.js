import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const ListaMusicasContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const ListaMusicasProvider = props => {
    // https://stackoverflow.com/questions/68189273/referenceerror-localstorage-is-not-defined-using-local-storage-in-nextjs
    if (typeof window !== 'undefined') {
        const [listaMusica, setListaMusica] = useState(localStorage.getItem('listaMusicasContext') ? JSON.parse(localStorage.getItem('listaMusicasContext')) : {});

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
        localStorage.setItem('listaMusicasContext', parsedData);
    },

    get() {
        let data = localStorage.getItem('listaMusicasContext');

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        // console.log(dataJson);
        return dataJson;
    },

    delete() {
        localStorage.removeItem('listaMusicasContext');
    }
}