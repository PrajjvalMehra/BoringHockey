// src/CanvasComponent.js
import React, { useRef, useEffect } from 'react';
import Ball from '../../engine/Ball.js';
import PlayerBall from '../PlayerBall/PlayerBall.jsx';




const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let canvas;

    useEffect(() => {
        canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            // Set canvas dimensions
            canvas.width = window.innerWidth - 100;
            canvas.height = window.innerHeight - 100;
        }
    }, []);
    return (<>
        <canvas ref={canvasRef} >

            <PlayerBall canvasRef={canvasRef}/>
        </canvas>
    </>);
};

export default Canvas;
