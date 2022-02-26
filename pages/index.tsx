import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import { Lights, Cat } from "../meshes";
import { Loading } from "../components";

function Main() {
    return (
        <>
            <Suspense fallback={<Loading message={"Loading..."} />}>
                <Canvas camera={{ position: [.5, .5, .5]}}>
                    <TrackballControls />
                    <Lights />
                    <Cat />
                </Canvas>
            </Suspense>
        </>
    )
}

export default Main