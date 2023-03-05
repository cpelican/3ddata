import {
    MeshBasicMaterialProps,
    ThreeElements,
    useFrame,
} from '@react-three/fiber';
import React, { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { BufferGeometry, DoubleSide, Vector3 } from 'three';

type TriangleProps = {
    angleRotationX?: number;
    sideAB?: number;
    z: number;
    rotateX: number;
} & ThreeElements['mesh'] &
    Pick<MeshBasicMaterialProps, 'color'>;

export const Triangle = ({
    angleRotationX = 0.005,
    sideAB = 10,
    color,
    z,
    rotateX,
    ...props
}: TriangleProps) => {
    const ref = useRef<THREE.Mesh>(null!);
    const triangleRef = React.useRef<BufferGeometry>(null!);
    useFrame((_state, delta) => {
        // triangleRef.current.rotateX(angleRotationX);
    });

    useLayoutEffect(() => {
        if (triangleRef.current) {
            const yA = sideAB / 2,
                yB = -yA;
            triangleRef.current.setFromPoints([
                new Vector3(z, 0, 0),
                new Vector3(z, 31, yA),
                new Vector3(z, 31, yB),
            ]);
            console.log(rotateX * Math.sin(rotateX));
        }
    }, []);
    return (
        <mesh ref={ref} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} {...props}>
            <bufferGeometry attach="geometry" ref={triangleRef} />
            <meshBasicMaterial side={DoubleSide} color={color} />
        </mesh>
    );
};
Triangle.displayName = 'Triangle';
