import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationClip, AnimationMixer, Object3D } from "three";

export default function Melodija105({ pause }: { pause: boolean }) {
    const group: React.MutableRefObject<Object3D | undefined> = useRef(undefined);
    const [ models, setModels ] = useState<Object3D[] | null>(null)
    const [ animations, setAnimations ] = useState<AnimationClip[] | null>(null)

    const [ mixer, ] = useState<AnimationMixer>(new AnimationMixer(new Object3D()));

    useEffect(() => {
        const loader = new GLTFLoader()
        loader.load("/sketchfab/melodija_105/scene.gltf", async (gltf) => {
            const nodes = await gltf.parser.getDependencies("node");
            const animations = await gltf.parser.getDependencies("animation")

            setModels(nodes)
            setAnimations(animations)
        })
    }, [])

    useEffect(() => {
        if (group.current && animations && !pause) {
            const animation = mixer.clipAction(animations[0], group.current);
            animation.clampWhenFinished = true;
            animation.enabled = true
            animation.play();
        }
    }, [ animations, mixer, pause ])

    useFrame((_, delta) => pause && animations ? mixer.uncacheClip(animations[0]) : mixer.update(delta));

    return (
        <>
            {models && (
                <group ref={group} position={[0, 0, 0]}>
                    {
                        models?.map((m, index) =>
                            <primitive key={`Object_${index}`} name={`Object_${index}`} object={m} />
                        )
                    }
                </group>
            )}
        </>
    )
}