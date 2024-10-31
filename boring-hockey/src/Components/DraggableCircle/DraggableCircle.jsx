/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';

function DraggableCircle() {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState([0, 0, 0]);
    const meshRef = useRef();

    const handlePointerDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    const handlePointerCancel = () => {
        setIsDragging(false); // Handles cases when the touch event is interrupted
    };

    const handlePointerMove = (e) => {
        if (isDragging) {
            e.stopPropagation();
            const [x, z] = [e.point.x, e.point.z];
            setPosition([x, 0, z]);
        }
    };

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.position.set(...position);
        }
    });

    return (
        <group>
            <mesh
                position={position}
                rotation={[-Math.PI / 2, 0, 0]} // Rotate the circle to face upward (XZ plane)
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerMove={handlePointerMove}
                onPointerCancel={handlePointerCancel}
            >
                <planeGeometry args={[500, 3]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>
            <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[2, 32]} />
                <meshPhongMaterial color="skyblue" />
            </mesh>
        </group>
    );
}
export default DraggableCircle