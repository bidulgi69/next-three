import React from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { palette } from "../utils";

interface BackgroundProps {
    color: number,
}

export default function Background({ color }: BackgroundProps) {
    /**
     * gl : WebGLRenderer
     * scene : THREE.Scene
     */
    const black = new THREE.Color(palette["black"])
    const { gl, scene, clock } = useThree()
    gl.autoClear = false

    let colors = {
        color: black,
        previousTweenColor: black,
        nextTweenColor: black,
        alphaUnit: 0.1,
    }

    const tweenColors = (color: THREE.Color) => {
        colors = {
            ...colors,
            previousTweenColor: colors.color,
            nextTweenColor: color,
            alphaUnit: 0
        }
    }

    React.useEffect(() => {
        tweenColors(new THREE.Color(color))
    }, [ color ])

    useFrame(() => {
        if (color == 0x000 || !colors.previousTweenColor.equals(colors.nextTweenColor)) {
            colors.alphaUnit = +(colors.alphaUnit + 0.01).toFixed(2)
            colors.color = colors.color.lerpColors(colors.previousTweenColor, colors.nextTweenColor, colors.alphaUnit)
            scene.background = colors.color
        }
    })

    return null
}