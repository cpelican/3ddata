import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Triangle } from './triangle';
import React from 'react';
const b = 30;
const trianglesAbs = [
    { ab: b, color: 'blue', rotateX: 0 },
    { ab: b, color: 'orange', rotateX: b },
];
export const AppBody = () => {
    const { innerWidth = 0, innerHeight = 0 } = window;
    return (
        <Canvas
            style={{
                width: innerWidth + 'px',
                height: innerHeight + 'px',
            }}
        >
            <PerspectiveCamera
                makeDefault
                position={[100, 0.9, 1.8]}
                fov={60}
                zoom={10}
            />
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
            />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <axesHelper args={[10]} />
            {trianglesAbs.map((conf, i) => (
                <Triangle
                    key={conf.color}
                    color={conf.color}
                    sideAB={conf.ab}
                    z={i}
                    rotateX={conf.rotateX}
                />
            ))}
        </Canvas>
    );
};
