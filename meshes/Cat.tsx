import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationClip, AnimationMixer, Object3D } from "three";

export default function Cat() {
    const group: React.MutableRefObject<{ rotation: { x: number; y: number } } | undefined> = useRef();
    const actions: React.MutableRefObject<{ idle: { play: () => void } } | undefined> = useRef();

    const [ model, setModel ] = useState<Object3D | null>(null)
    const [ animation, setAnimation ] = useState<AnimationClip[] | null>(null)

    const [ mixer, ] = useState<AnimationMixer>(() => new AnimationMixer(new Object3D()));


    useEffect(() => {
        const loader = new GLTFLoader()
        loader.load("/sketchfab/kitten-non-commercial/source/Kitten.glb", async (gltf) => {
            const nodes = await gltf.parser.getDependencies("node");
            const animations = await gltf.parser.getDependencies("animation")

            setModel(nodes[73])
            setAnimation(animations)
        })

    }, [])

    useEffect(() => {
        if (animation && typeof group.current != "undefined") {
            actions.current = {
                idle: mixer.clipAction(animation[0], group.current as Object3D),
            };
            actions.current.idle.play();
            return () => animation.forEach((clip) => mixer.uncacheClip(clip));
        }
    }, [animation, mixer]);

    /* Animation update */
    useFrame((_, delta) => mixer.update(delta));
    /* Rotation */
    useFrame(() => {
        if (typeof group.current != "undefined")
            return (group.current.rotation.y += 0.01);
    });

    return (
        <>
            {model && (
                <group ref={group} position={[0, -150, 0]} dispose={null}>
                    <primitive ref={group} name="Object_0" object={model} />
                </group>
            )}
        </>
    )
}