import React from "react"
import * as THREE from "three"
import { Html } from "@react-three/drei";
import YouTube, { Options } from "react-youtube";

interface VideoProps {
    position: THREE.Vector3,
    rotation: THREE.Euler,
    videoId: string,
    autoplay?: boolean
}

function Video({ position, rotation, videoId, autoplay }: VideoProps) {
    const opts: Options = {
        width: '1920px',
        height: '1080px',
        playerVars: {
            autoplay: autoplay ? 1 : 0
        }
    }
    return (
        <>
            <group>
                {/* Adding "id" attribute will cause error. */}
                <Html transform position={position} rotation={rotation}>
                    <YouTube
                        videoId={videoId}
                        opts={opts}
                    />
                </Html>
            </group>
        </>
    )
}
/*

 */

export default Video