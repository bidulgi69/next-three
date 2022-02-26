import React from "react"

export default function About() {
    const [ splash, setSplash ] = React.useState<boolean>(true)

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setSplash(true)
        }, 500)

        //  cleanup
        return () => clearTimeout(timeout)
    }, [ ])
    return (
        <>
            <h1>
                About
            </h1>
            <div className={"container"}>
                <div className={`about ${splash ? 'appear' : 'disappear'}`}>
                    <ul>
                        <li onClick={() => window && window.open("https://github.com/bidulgi69")}>
                            <span>https://github.com/bidulgi69</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h3>/ (Home)</h3>
                            <span onClick={() => window && window.open("https://sketchfab.com/3d-models/kitten-non-commercial-885a6d7ea3d940c082caf9ee946c8602")}>
                                Cat Mesh source
                            </span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <h3>/theater</h3>
                            <span onClick={() => window && window.open("https://youtu.be/9QzUzQBuPWw")}>Beautiful Disco - Peach Iced Tea</span>
                            <br />
                            <span onClick={() => window && window.open("https://youtu.be/QmejC5HSHRw")}>Mind Combined - Body Groove</span>
                            <br />
                            <span onClick={() => window && window.open("https://youtu.be/ormQQG2UhtQ")}>Thundercat - Dragonball Durag</span>
                            <br />
                            <span onClick={() => window && window.open("https://youtu.be/xBa3YUgQeL4")}>The Weekend - Out Of Time</span>
                        </li>
                    </ul>
                </div>
            </div>
            <style jsx>{`
                li {
                    font-size: 14pt;
                    font-family: sans-serif;
                }
                span:hover {
                    cursor: pointer;
                    font-weight: bold;
                    color: #ececec;
                    transition: all .2s ease-out;
                }
                .container {
                    width: 100%;
                    height: 70vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .about {
                    min-width: 60rem;
                    max-width: 100%;
                    min-height: 100%;
                    background: linear-gradient(90deg, rgba(124,124,128,1) 0%, rgba(37,37,37,1) 100%);
                    hidden: ${splash};
                    display: flex;
                    padding: 5pt 10pt;
                    border-radius: 14pt;
                    flex-direction: column;
                }
                .appear {
                    animation: fade-in 2s;
                    animation-fill-mode: forwards;
                }
                @keyframes fade-in {
                    0% {
                        margin-top: 100%;
                        opacity: 0;
                    }
                    100% {
                        margin-top: 0;
                        opacity: 1;
                    }
                }
            `}
            </style>
        </>
    )

}