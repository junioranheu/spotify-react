import React, { useContext, useEffect } from 'react';
import { Aviso } from '../components/outros/aviso';
import Styles from '../styles/index.module.css';
import { ListaMusicasContext, ListaMusicasStorage } from '../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../utils/context/musicaContext';
import EmojiAleatorio from '../utils/outros/emojiAleatorio';

export default function Index({ musicas }) {
    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;

    useEffect(() => {
        // Título da página;
        document.title = 'Spotify — React.js — junioranheu';

        // Aviso;
        if (process.env.NODE_ENV === 'production') {
            const msg =
                `Olá! ${EmojiAleatorio()}<br/><br/> 
            Esse projeto foi replicado, sem fins lucrativos, a fim de estudo apenas, utilizando React.js e Next.js, a partir de um projeto real, de uma empresa real.<br/><br/> 
            Feito por @junioranheu.<br/><br/> 
            Todos os direitos reservados à @spotify.`;
            Aviso.custom(msg, 20000);
        }

        // Salvar no Context e no localStorage;
        // Guardar provisoriamente a lista de músicas em ListaMusicasContext;
        // console.log(musicas);
        ListaMusicasStorage.set(musicas);
        setListaMusicasContext(musicas);
    }, [musicas, setListaMusicasContext]);

    function handleClick(e) {
        const id = e.target.id;
        // console.log(id);

        const musicaJson = listaMusicasContext.filter(x => x.musicaId === parseInt(id));
        const musica = musicaJson[0];
        // console.log(musica);

        // Salvar no Context e no localStorage;
        MusicaStorage.set(musica);
        setMusicaContext(musica);
    }

    return (
        <section className={Styles.container}>
            <h1>Página inicial</h1>

            <ul>
                {musicas.map((m) => (
                    <li key={m.musicaId} id={m.musicaId} onClick={(e) => handleClick(e)} className={Styles.aea}>
                        {m.nome} - {m.musicasBandas[0].bandas.nome}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export async function getStaticProps() {
    // const res = await fetch('https://spotifyapi.azurewebsites.net/api/Musicas/todos')
    // const musicas = await res.json();

    // Mocado;
    const musicas = [
        {
            "musicaId": 8,
            "nome": "505",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 9,
                    "musicaId": 8,
                    "bandaId": 3,
                    "bandas": {
                        "bandaId": 3,
                        "nome": "Arctic Monkeys",
                        "sobre": "",
                        "foto": "3.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 7,
                                "bandaId": 3,
                                "artistaId": 7,
                                "artistas": {
                                    "artistaId": 7,
                                    "nome": "Alex Turner",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 8,
                                "bandaId": 3,
                                "artistaId": 8,
                                "artistas": {
                                    "artistaId": 8,
                                    "nome": "Matt Helders",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        },
        {
            "musicaId": 1,
            "nome": "Bohemian Rhapsody",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 1,
                    "musicaId": 1,
                    "bandaId": 1,
                    "bandas": {
                        "bandaId": 1,
                        "nome": "Queen",
                        "sobre": "",
                        "foto": "1.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 1,
                                "bandaId": 1,
                                "artistaId": 1,
                                "artistas": {
                                    "artistaId": 1,
                                    "nome": "Freddie Mercury",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 2,
                                "bandaId": 1,
                                "artistaId": 2,
                                "artistas": {
                                    "artistaId": 2,
                                    "nome": "Brian May",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 3,
                                "bandaId": 1,
                                "artistaId": 3,
                                "artistas": {
                                    "artistaId": 3,
                                    "nome": "John Deacon",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 4,
                                "bandaId": 1,
                                "artistaId": 4,
                                "artistas": {
                                    "artistaId": 4,
                                    "nome": "Mike Grose",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        },
        {
            "musicaId": 4,
            "nome": "E aí, gordo",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 4,
                    "musicaId": 4,
                    "bandaId": 15,
                    "bandas": {
                        "bandaId": 15,
                        "nome": "Chaleco's Group",
                        "sobre": "",
                        "foto": "15.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 29,
                                "bandaId": 15,
                                "artistaId": 26,
                                "artistas": {
                                    "artistaId": 26,
                                    "nome": "Chaleco Israel",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 30,
                                "bandaId": 15,
                                "artistaId": 27,
                                "artistas": {
                                    "artistaId": 27,
                                    "nome": "Junior",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                },
                {
                    "musicaBandaId": 5,
                    "musicaId": 4,
                    "bandaId": 13,
                    "bandas": {
                        "bandaId": 13,
                        "nome": "Billie Eilish",
                        "sobre": "",
                        "foto": "13.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 27,
                                "bandaId": 13,
                                "artistaId": 25,
                                "artistas": {
                                    "artistaId": 25,
                                    "nome": "Billie Eilish",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        },
        {
            "musicaId": 7,
            "nome": "Fluorescent Adolescent",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 8,
                    "musicaId": 7,
                    "bandaId": 3,
                    "bandas": {
                        "bandaId": 3,
                        "nome": "Arctic Monkeys",
                        "sobre": "",
                        "foto": "3.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 7,
                                "bandaId": 3,
                                "artistaId": 7,
                                "artistas": {
                                    "artistaId": 7,
                                    "nome": "Alex Turner",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 8,
                                "bandaId": 3,
                                "artistaId": 8,
                                "artistas": {
                                    "artistaId": 8,
                                    "nome": "Matt Helders",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        },
        {
            "musicaId": 3,
            "nome": "Happier than ever",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 3,
                    "musicaId": 3,
                    "bandaId": 13,
                    "bandas": {
                        "bandaId": 13,
                        "nome": "Billie Eilish",
                        "sobre": "",
                        "foto": "13.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 27,
                                "bandaId": 13,
                                "artistaId": 25,
                                "artistas": {
                                    "artistaId": 25,
                                    "nome": "Billie Eilish",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        },
        {
            "musicaId": 5,
            "nome": "Is This It",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 6,
                    "musicaId": 5,
                    "bandaId": 6,
                    "bandas": {
                        "bandaId": 6,
                        "nome": "The Strokes",
                        "sobre": "",
                        "foto": "6.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 11,
                                "bandaId": 6,
                                "artistaId": 11,
                                "artistas": {
                                    "artistaId": 11,
                                    "nome": "Julian Casablancas",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 12,
                                "bandaId": 6,
                                "artistaId": 12,
                                "artistas": {
                                    "artistaId": 12,
                                    "nome": "Albert Hammond Jr",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 13,
                                "bandaId": 6,
                                "artistaId": 13,
                                "artistas": {
                                    "artistaId": 13,
                                    "nome": "Fabrizio Moretti",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 14,
                                "bandaId": 6,
                                "artistaId": 14,
                                "artistas": {
                                    "artistaId": 14,
                                    "nome": "Nikolai Fraiture",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        },
        {
            "musicaId": 2,
            "nome": "Live forever",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 2,
                    "musicaId": 2,
                    "bandaId": 2,
                    "bandas": {
                        "bandaId": 2,
                        "nome": "Oasis",
                        "sobre": "",
                        "foto": "2.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 5,
                                "bandaId": 2,
                                "artistaId": 5,
                                "artistas": {
                                    "artistaId": 5,
                                    "nome": "Liam Gallagher",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 6,
                                "bandaId": 2,
                                "artistaId": 6,
                                "artistas": {
                                    "artistaId": 6,
                                    "nome": "Noel Gallagher",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        },
        {
            "musicaId": 6,
            "nome": "Soma",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 7,
                    "musicaId": 6,
                    "bandaId": 6,
                    "bandas": {
                        "bandaId": 6,
                        "nome": "The Strokes",
                        "sobre": "",
                        "foto": "6.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 11,
                                "bandaId": 6,
                                "artistaId": 11,
                                "artistas": {
                                    "artistaId": 11,
                                    "nome": "Julian Casablancas",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 12,
                                "bandaId": 6,
                                "artistaId": 12,
                                "artistas": {
                                    "artistaId": 12,
                                    "nome": "Albert Hammond Jr",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 13,
                                "bandaId": 6,
                                "artistaId": 13,
                                "artistas": {
                                    "artistaId": 13,
                                    "nome": "Fabrizio Moretti",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            },
                            {
                                "bandaArtistaId": 14,
                                "bandaId": 6,
                                "artistaId": 14,
                                "artistas": {
                                    "artistaId": 14,
                                    "nome": "Nikolai Fraiture",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        },
        {
            "musicaId": 9,
            "nome": "There she goes",
            "ouvintes": 0,
            "dataLancamento": "2022-04-03T01:45:48.731353",
            "isAtivo": 1,
            "dataRegistro": "2022-04-03T01:45:48.731353",
            "musicasBandas": [
                {
                    "musicaBandaId": 10,
                    "musicaId": 9,
                    "bandaId": 16,
                    "bandas": {
                        "bandaId": 16,
                        "nome": "The La's",
                        "sobre": "",
                        "foto": "16.webp",
                        "seguidores": 0,
                        "isAtivo": 1,
                        "dataRegistro": "2022-04-03T01:45:48.731353",
                        "musicasBandas": [],
                        "bandasArtistas": [
                            {
                                "bandaArtistaId": 31,
                                "bandaId": 16,
                                "artistaId": 28,
                                "artistas": {
                                    "artistaId": 28,
                                    "nome": "Lee Mavers",
                                    "foto": "",
                                    "isAtivo": 1,
                                    "dataRegistro": "2022-04-03T01:45:48.731353",
                                    "bandaArtistas": []
                                },
                                "isAtivo": 1,
                                "dataRegistro": "2022-04-03T01:45:48.731353"
                            }
                        ]
                    },
                    "isAtivo": 1,
                    "dataRegistro": "2022-04-03T01:45:48.731353"
                }
            ],
            "albunsMusicas": null
        }
    ]

    return {
        props: {
            musicas,
        },
    }
}