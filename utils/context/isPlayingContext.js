import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const IsPlayingContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const IsPlayingProvider = props => {
    // https://stackoverflow.com/questions/68189273/referenceerror-localstorage-is-not-defined-using-local-storage-in-nextjs
    if (typeof window !== 'undefined') {
        const [isPlayingContext, setIsPlayingContext] = useState(false);

        return (
            <IsPlayingContext.Provider value={[isPlayingContext, setIsPlayingContext]}>
                {props.children}
            </IsPlayingContext.Provider>
        );
    } else {
        return null;
    }
}
