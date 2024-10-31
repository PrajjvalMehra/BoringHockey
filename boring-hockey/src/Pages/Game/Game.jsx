/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';
import './Game.css';
import DraggableCircle from '../../Components/DraggableCircle/DraggableCircle';



function Game() {
  return (
    <div className="canvas-root">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 35, 0], near: 0.1, far: 1000 }}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 2, 0]} color="black" />
          <DraggableCircle />
        </Canvas>
      </div>
    </div>
  );
}

export default Game;
