import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Styles from '../../styles/barra.player.module.css';
import { ListaMusicasContext, ListaMusicasStorage } from '../../utils/context/listaMusicasContext';
import { MusicaContext, MusicaStorage } from '../../utils/context/musicaContext';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import AvisoFuncaoNaoDesenvolvida from '../../utils/outros/avisoFuncaoNaoDesenvolvida';
import NumeroAleatorio from '../../utils/outros/numeroAleatorio';
import Aleatorio from '../svg/barra.player/aleatorio';
import BotaoAvancar from '../svg/barra.player/botaoAvancar';
import BotaoPlay from '../svg/barra.player/botaoPlay';
import BotaoStop from '../svg/barra.player/botaoStop';
import BotaoVoltar from '../svg/barra.player/botaoVoltar';
import Dispositivo from '../svg/barra.player/dispositivo';
import Fila from '../svg/barra.player/fila';
import FullScreen from '../svg/barra.player/fullscreen';
import Loop from '../svg/barra.player/loop';
import Microfone from '../svg/barra.player/microfone';
import Toggle from '../svg/barra.player/toggle';
import Volume1 from '../svg/barra.player/volume1';
import Volume2 from '../svg/barra.player/volume2';
import Volume3 from '../svg/barra.player/volume3';
import Volume4 from '../svg/barra.player/volume4';
import Coracao from './coracao';
import ProgressBarPlayer from './progressBar.player';
import ProgressBarVolume from './progressBar.volume';

export default function BarraPlayer() {
    const asPath = useRouter();
    const [url, setUrl] = useState('');
    useEffect(() => {
        // console.log(asPath.pathname);
        setUrl(asPath.pathname);
    }, [asPath]);

    const [isMusicaCurtida, setIsMusicaCurtida] = useState(false);
    function handleCoracao() {
        setIsMusicaCurtida(!isMusicaCurtida);
    }

    const [volume, setVolume] = useState(50);
    function getVolume(v) {
        setVolume(Math.floor(v));
    }

    function handleVolume() {
        if (volume > 0) {
            setVolume(0);
        } else {
            setVolume(50);
        }
    }

    function handleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const [isPlaying, setIsPlaying] = useState(false);
    function handleIsPlaying() {
        if (!musicaContext?.musicaId) {
            Aviso.custom('Nenhuma música foi selecionada', 5000);
            return false;
        }

        setIsPlaying(!isPlaying);
    }

    // Quando uma música é selecionada no MusicaContext;
    const [musicaContext, setMusicaContext] = useContext(MusicaContext); // Context da música;
    useEffect(() => {
        // console.log(musicaContext);
        // console.log(musicaContext.musicaId);
    }, [musicaContext]);

    // Importar músicas dinamicamente: https://stackoverflow.com/questions/64317730/how-to-dynamically-import-sound-files-in-react;
    const [arquivoMusica, setArquivoMusica] = useState();
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    useEffect(() => {
        // Lógica para não dar play automaticamente ao carregar página;
        if (!isFirstLoad) {
            setIsPlaying(true);
        } else {
            setIsFirstLoad(false);
        }

        async function importDinamico() {
            // Importar música dinamicamente;
            NProgress.start();

            const url = `${CONSTANTS_UPLOAD.API_URL_GET_MUSIC}/${musicaContext.musicaId}.mp3`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'audio/mpeg',
                },
            })
                .then((response) => response.blob())
                .then((blob) => {
                    // Criar blob;
                    const arquivoBlob = window.URL.createObjectURL(
                        new Blob([blob], {
                            type: 'audio/mpeg'
                        }),
                    );

                    // console.log(arquivoBlob);
                    setArquivoMusica(arquivoBlob);
                    console.log(`Música "${musicaContext.nome}" (${musicaContext.musicaId}) importada`);

                    // Quando a música for importada, é necessário removê-la da lista/fila;
                    const indexMusicaTocando = listaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
                    listaMusicasContext?.splice(indexMusicaTocando, 1);
                    ListaMusicasStorage.set(listaMusicasContext);
                    setListaMusicasContext(listaMusicasContext);
                    NProgress.done();
                });
        }

        if (musicaContext?.musicaId > 0) {
            importDinamico();
        }
    }, [musicaContext?.musicaId]);

    // Import dinâmico: capa da banda;
    let ImagemBanda = '';
    try {
        const foto = musicaContext.musicasBandas[0].bandas.foto;
        ImagemBanda = `${CONSTANTS_UPLOAD.API_URL_GET_CAPA}/${foto}`;
        // console.log(ImagemBanda);
    } catch (err) {
        console.log(err);
    }

    const [isModoAleatorio, setIsModoAleatorio] = useState(false);
    function handleModoAleatorio() {
        setIsModoAleatorio(!isModoAleatorio);
    }

    const [isModoLoop, setIsModoLoop] = useState(false);
    function handleModoLoop() {
        setIsModoLoop(!isModoLoop);
    }

    const [listaMusicasContext, setListaMusicasContext] = useContext(ListaMusicasContext); // Context da lista de músicas;
    const [isPodeAvancar, setIsPodeAvancar] = useState(true);
    function handleAvancar() {
        // console.log(listaMusicasContext);

        if (!isPodeAvancar) {
            console.log('Não é possível avançar a música agora, aguarde um momento');
            return false;
        }

        if (listaMusicasContext?.length > 0) {
            // console.log(musicaContext.musicaId);
            let proximaMusica;

            // Caso o isModoAleatorio NÃO seja true, pegue o próximo, normalmente;
            if (!isModoAleatorio) {
                const index = listaMusicasContext?.findIndex(m => m.musicaId === musicaContext?.musicaId);
                proximaMusica = listaMusicasContext[index + 1]; // Avançar;
            }

            // Caso o isModoAleatorio seja true, o Avançar não pode ser simplesmente "+1";
            if (isModoAleatorio) {
                const listaLenght = listaMusicasContext?.length;
                const random = NumeroAleatorio(0, listaLenght - 1);
                // console.log(random);
                proximaMusica = listaMusicasContext[random];
            }

            // Caso "proximaMusica" esteja vazia, pegue a primeira da lista novamente;
            if (!proximaMusica) {
                // console.log('Não existe index + 1... voltar para o 0');
                proximaMusica = listaMusicasContext[0];
            }

            // console.log(proximaMusica);

            // Salvar no Context e no localStorage;
            MusicaStorage.set(proximaMusica);
            setMusicaContext(proximaMusica);

            // Não permitir avançar até que passe o x segundos;
            setIsPodeAvancar(false);
        }
    }

    useEffect(() => {
        // Aguardar x segundos para poder avançar novamente, para evitar bugs;
        if (!isPodeAvancar) {
            setTimeout(function () {
                setIsPodeAvancar(true);
            }, 1000);
        }
    }, [isPodeAvancar]);

    const [historicoListaMusicasContext, setHistoricoListaMusicasContext] = useState();
    useEffect(() => {
        // console.log('Histórico inicial copiado');
        setHistoricoListaMusicasContext({ ...listaMusicasContext });
    }, [listaMusicasContext]);

    function handleVoltar() {
        // A FUNÇÃO handleVoltar ESTÁ MEIO BUGADA;
        // console.log(historicoListaMusicasContext);
        // console.log(musicaContext.musicaId);

        if (!isPodeAvancar) {
            console.log('Não pode voltar a música agora, aguarde um momento');
            return false;
        }

        // Converter o objeto para array de objetos;
        const arrayHistorico = Object.entries(historicoListaMusicasContext).map(e => e[1]);

        if (arrayHistorico?.length > 0) {
            const index = arrayHistorico?.findIndex(m => m.musicaId == musicaContext?.musicaId);
            let proximaMusica = arrayHistorico[index - 1]; // Voltar;

            // console.log(proximaMusica);

            if (proximaMusica) {
                // Salvar no Context e no localStorage;
                MusicaStorage.set(proximaMusica);
                setMusicaContext(proximaMusica);

                // Não permitir voltar até que passe o x segundos;
                setIsPodeAvancar(false);
            } else {
                console.log('Sem música para voltar!');
            }
        }
    }

    function handleToggle() {
        AvisoFuncaoNaoDesenvolvida();
    }

    function handleMicrofone() {
        AvisoFuncaoNaoDesenvolvida();
    }

    function handleDispositivo() {
        AvisoFuncaoNaoDesenvolvida();
    }

    return (
        <section className={Styles.barraPlayer}>
            {/* =-=-=-=-=-=-=-=-=-=-=-= Primeira div, esquerda =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divInfo}>
                {musicaContext?.musicaId > 0 && (
                    <Fragment>
                        <div>
                            <div>
                                <Image src={ImagemBanda} width={56} height={56} alt='' />
                            </div>

                            <div className={Styles.infoMusica}>
                                <span className={Styles.infoTitulo} title={musicaContext.nome}>
                                    {musicaContext.nome}
                                </span>

                                <span className={Styles.infoDescricao} title={(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}>
                                    {(musicaContext?.musicasBandas ? musicaContext?.musicasBandas[0]?.bandas.nome : '')}
                                </span>
                            </div>
                        </div>

                        <span className={`${Styles.spanIcone} ${Styles.iconeCoracao}`} onClick={() => handleCoracao()} title='Curtir/descurtir música'>
                            <Coracao isMusicaCurtida={isMusicaCurtida} />
                        </span>

                        <span className={Styles.spanIcone} onClick={() => handleToggle()} title='Ativar/desativar modo picture-in-picture'>
                            <Toggle />
                        </span>
                    </Fragment>
                )}
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Segunda div, meio =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divPlayer}>
                <div className={Styles.divPlayerIcones}>
                    <span className={Styles.spanIcone} onClick={() => handleModoAleatorio()} title='Ativar/desativar modo aleatório'>
                        <Aleatorio cor={(isModoAleatorio ? 'var(--verde)' : '')} />
                    </span>

                    <span className={Styles.spanIcone} onClick={() => handleVoltar()} title='Voltar uma música'>
                        <BotaoVoltar />
                    </span>

                    <span className={Styles.btnPlay} onClick={() => handleIsPlaying()} >
                        {isPlaying ? (
                            <BotaoStop />
                        ) : (
                            <BotaoPlay />
                        )}
                    </span>

                    <span className={Styles.spanIcone} onClick={() => handleAvancar()} title='Avançar uma música'>
                        <BotaoAvancar />
                    </span>

                    <span className={Styles.spanIcone} onClick={() => handleModoLoop()} title='Ativar/desativar modo loop'>
                        <Loop cor={(isModoLoop ? 'var(--verde)' : '')} />
                    </span>
                </div>

                <div className={Styles.divPlayerInner}>
                    <ProgressBarPlayer
                        isPlaying={isPlaying}
                        volume={volume}
                        arquivoMusica={arquivoMusica}
                        musicaContext={musicaContext}
                        handleAvancar={handleAvancar}
                        isModoLoop={isModoLoop}
                        isPodeAvancar={isPodeAvancar}
                    />
                </div>
            </div>

            {/* =-=-=-=-=-=-=-=-=-=-=-= Terceira div, direita =-=-=-=-=-=-=-=-=-=-=-= */}
            <div className={Styles.divOpcoes}>
                <span className={Styles.spanIcone} onClick={() => handleMicrofone()} title='Visualizar letra'>
                    <Microfone />
                </span>

                <span className={Styles.spanIcone} title='Visualizar fila'>
                    <Link href={'/fila'}>
                        <a>
                            <Fila cor={(url === '/fila' ? 'var(--verde)' : '')} />
                        </a>
                    </Link>
                </span>

                <span className={Styles.spanIcone} onClick={() => handleDispositivo()} title='Transmitir para outro dispositivo'>
                    <Dispositivo />
                </span>

                <span className={Styles.spanIcone} onClick={() => handleVolume()}>
                    {
                        volume >= 65 ? (
                            <Volume4 />
                        ) : volume >= 30 && volume < 65 ? (
                            <Volume3 />
                        ) : volume >= 1 && volume < 30 ? (
                            <Volume2 />
                        ) : (
                            <Volume1 />
                        )
                    }
                </span>

                <div className={Styles.divVolume} title={`Volume ${volume}`}>
                    <ProgressBarVolume getVolume={getVolume} volume={volume} />
                </div>

                <span className={Styles.spanIcone} onClick={() => handleFullScreen()}>
                    <FullScreen />
                </span>
            </div>
        </section>
    )
}

