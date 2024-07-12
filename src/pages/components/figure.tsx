import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Triangle, type TriangleConf } from './triangle';
import React from 'react';

interface TriangleProps extends Pick<TriangleConf, 'onHover'> {
    data: TriangleConf[];
}

export const Figure: React.FC<TriangleProps> = ({ data, onHover }) => {
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
                position={[150, 30, 80]}
                fov={300}
                zoom={1}
            />
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
            />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <axesHelper args={[10]} />
            {data.map((conf) => (
                <Triangle key={conf.color} {...conf} onHover={onHover} />
            ))}
        </Canvas>
    );
};
