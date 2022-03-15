import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Loading } from "../../components";
import { Background, Lights, Melodija105} from "../../meshes";
import { playlist, palette, hexToRGB } from "../../utils";

type TrackProps = {
    index: number,
    title: string,
    src: string,
    paused: boolean,
    tone: string,
}

const scrollIntoViewOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
}

const defaultGradient = 'rgba(129,123,125,1) 25%, rgba(241,230,233,1) 50%, rgba(129,123,125,1) 75%'

export default function Turntable() {
    const [ tracks, setTracks ] = React.useState<TrackProps[]>(playlist)
    const [ paused, isPaused ] = React.useState<boolean>(true)  //  animation
    const refs = playlist.map((_) => React.createRef<HTMLParagraphElement>())
    const currentTrack = React.useRef<number>(-1)
    const gradient = React.useRef<string>(defaultGradient)

    React.useEffect(() => {
        currentTrack.current = -1
    }, [])

    function Track({ index, title, src, paused, tone }: TrackProps) {
        const [ hover, isHover ] = React.useState<boolean>(false)
        const audio = React.useRef<HTMLAudioElement | null>(null)

        const findNextTrack = (audioRef: HTMLAudioElement) => {
            audioRef.addEventListener("ended", () => {
                audioRef.currentTime = 0  //  initialize
                const nextIndex: number = (index + 1) % tracks.length
                //  play next track
                tracks.forEach((track) => track.paused = track.index != nextIndex)
                setTracks([...tracks])  //  render()
            })
        }

        React.useEffect(() => { //  componentDidMount()
            const audioRef = audio.current
            if (audioRef) findNextTrack(audioRef)
            return () => audioRef?.removeEventListener("ended", () => findNextTrack(audioRef))
        }, [])

        React.useEffect(() => {
            if (audio.current) {
                if (!paused) {
                    audio.current.play()
                    refs[index].current?.scrollIntoView(scrollIntoViewOptions)
                } else {
                    audio.current.pause()
                }
            }
        }, [ paused ])

        const onControl = (index: number) => {
            if (paused) tracks.forEach((track) => track.paused = true)  //  pause other tracks
            tracks[index].paused = !paused
            currentTrack.current = !paused ? -1 : index
            const rgb: number[] = hexToRGB(tone)
            gradient.current = !paused ? defaultGradient : `rgba(${rgb.toString()},.5) 25%, rgba(${rgb.toString()}, 1) 50%, rgba(${rgb.toString()}, .5) 75%`
            setTracks([...tracks])  //  render()
            isPaused(!paused)
        }

        return (
            <div
                className="track"
                onMouseOver={() => isHover(true)}
                onMouseOut={() => isHover(false)}
                onClick={() => onControl(index)}
            >
                <p
                    ref={refs[index]}
                    className={`track-title ${!paused && 'track-active'} ${hover && 'track-hovered'}`}
                >
                    {title}
                </p>
                <audio ref={audio} src={src} />
            </div>
        )
    }

    return (
        <>
            <div className="turntable-container">
                <div className="player">
                    <div className="playlist">
                        {
                            tracks.map((track) => (
                                <Track key={`turntable-track-${track.index}`} index={track.index} title={track.title} src={track.src} paused={track.paused} tone={track.tone} />
                            ))
                        }
                    </div>
                </div>
                <div className="field">
                    <Canvas
                        camera={{ position: [-100, 300, -300] }}
                        resize={{ scroll: false, debounce: 300 }}
                    >
                        <Suspense fallback={<Loading message={"Setting turntable..."} />}>
                            <Lights />
                            <Melodija105 pause={paused} />
                            <Background color={currentTrack.current != -1 ? palette[tracks[currentTrack.current].tone] : 0x000} />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
            <style jsx>{`
                .turntable-container {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                }
                .player {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 20rem;
                    height: 70vh;
                    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, ${gradient.current}, rgba(0,0,0,1) 100%);
                    border: 0;
                }
                .playlist {
                    display: flex;
                    width: 100%;
                    height: 60vh;
                    padding-top: 30vh;
                    padding-bottom: 30vh;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    border: 0;
                    overflow-y: auto;
                }
                .field {
                    width: calc(100% - 20rem);
                    height: 100vh;
                }
            `}</style>
            <style jsx global>{`
                .track {
                    width: 100%;
                    height: 10vh;
                    cursor: pointer;
                    text-align: center;
                }
                .track-title {
                    font-family: sans-serif;
                    transition: all 0.3s ease;
                }
                .track-active {
                    color: #fff;
                    font-weight: bold;
                    font-size: 14pt;
                    animation: heartbeat 2s infinite;
                    animation-fill-mode: forwards;
                }
                .track-hovered {
                    color: #fff;
                    font-weight: bold;
                    font-size: 14pt;
                }
                @keyframes heartbeat
                {
                    0% {
                        transform: scale(1);
                    }
                    20% {
                        transform: scale(1.2);
                    }
                    40% {
                        transform: scale(1);
                    }
                    60% {
                        transform: scale(1.2);
                    }
                    80% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
            `}</style>
        </>
    )
}
