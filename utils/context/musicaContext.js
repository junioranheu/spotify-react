import { createContext, useState } from 'react';

// Criar o contexto para usar no provider abaixo;
export const MusicaContext = createContext();

// Provider: para 'segurar' uma informação e passar para todos os componentes 'child';
export const MusicaProvider = props => {
    const [musica, setMusica] = useState({});

    return (
        <MusicaContext.Provider value={[musica, setMusica]}>
            {props.children}
        </MusicaContext.Provider>
    );
}
