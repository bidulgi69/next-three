import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { Lights, Video } from "../../meshes";
import {Loading} from "../../components";

export default function Theater() {
    const leftCurtain: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null)
    const rightCurtain: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null)

    const openCurtain = () => {
        leftCurtain.current!!.style.transform = 'translateX(-110%)';
        rightCurtain.current!!.style.transform = 'translateX(110%)'
    }

    return (
        <>

            <div className="container">
                <div className="curtain__wrapper"
                     onClick={() => openCurtain()}>
                    <div
                        className={`curtain__panel left`}
                        ref={leftCurtain}
                    >
                    </div>
                    <Suspense fallback={<Loading message={"Opening Theater..."} />}>
                        <div className={"theater"}>
                            <Canvas>
                                <PointerLockControls
                                    position={[0, 0, 0]}
                                />
                                <Lights />
                                <Video
                                    position={new THREE.Vector3(0, 0, 24)}
                                    rotation={new THREE.Euler(0, 0, 0)}
                                    videoId={"QmejC5HSHRw"}
                                />
                                <Video
                                    position={new THREE.Vector3(24, 0, 0)}
                                    rotation={new THREE.Euler(0, 90 * (Math.PI / 180), 0)}
                                    videoId={"ormQQG2UhtQ"}
                                />
                                <Video
                                    position={new THREE.Vector3(-24, 0, 0)}
                                    rotation={new THREE.Euler(0, 270 * (Math.PI / 180), 0)}
                                    videoId={"xBa3YUgQeL4"}
                                />
                                <Video
                                    position={new THREE.Vector3(0, 0, -24)}
                                    rotation={new THREE.Euler(0, 180 * (Math.PI / 180), 0)}
                                    videoId={"9QzUzQBuPWw"}
                                    autoplay
                                />
                            </Canvas>
                        </div>
                    </Suspense>
                    <div
                        className={`curtain__panel right`}
                        ref={rightCurtain}
                    >
                    </div>
                </div>
                <p>
                    Press Escape(esc) to unlock and click empty space to lock controls.
                </p>
            </div>
            <style jsx>{`
                .container {
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    overflow: hidden;
                }
                .curtain__wrapper {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
                .curtain__panel {
                    width: 50%;
                    height: 719px;
                    transition: all 4.5s ease;
                    cursor: pointer;
                    float: left;
                    position: relative;
                    z-index: 2;
                }
                .left {
                    background-image: url("row-1-column-1.png");
                }
                .--lout {
                    transform: translateX(-110%);
                }
                .right {
                    background-image: url("row-1-column-2.png");
                }
                .--rout {
                    transform: translateX(110%);
                }
                .theater {
                    position: absolute;
                    z-index: 1; 
                    width: calc(100% - 50px);
                    height: 719px;
                }
                p {
                    color: #fff;
                    font-weight: bold;
                    font-size: 30pt;
                    animation: fade-in 5s;
                    animation-fill-mode: forwards;
                }
                p:hover {
                    cursor: pointer;
                }
                @keyframes fade-in {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            `}
            </style>
        </>
    )
}
