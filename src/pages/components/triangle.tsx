import { MeshBasicMaterialProps, ThreeElements } from '@react-three/fiber';
import React, { useLayoutEffect } from 'react';
import { BufferGeometry, DoubleSide, Vector3 } from 'three';
import { TriangleConf } from './app-body';

type TriangleProps = TriangleConf &
    ThreeElements['mesh'] &
    Pick<MeshBasicMaterialProps, 'color'>;

export const Triangle = ({ color, rotateX, ...props }: TriangleProps) => {
    const triangleRef = React.useRef<BufferGeometry>(null!);

    useLayoutEffect(() => {
        if (triangleRef.current) {
            triangleRef.current.setFromPoints([
                new Vector3(...props.A),
                new Vector3(...props.B),
                new Vector3(...props.C),
            ]);
        }
    }, [props.A, props.B, props.C]);
    return (
        <mesh scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
            <bufferGeometry attach="geometry" ref={triangleRef} />
            <meshBasicMaterial side={DoubleSide} color={color} />
        </mesh>
    );
};
Triangle.displayName = 'Triangle';
