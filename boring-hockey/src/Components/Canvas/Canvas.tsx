// src/CanvasComponent.js
import React, { useRef, useEffect } from 'react';
import PlayerBall from '../PlayerBall/PlayerBall.jsx';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;

        if (canvas && container) {
            const updateCanvasDimensions = () => {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                canvas.width = containerWidth;
                canvas.height = containerHeight;
            };

            // Initial dimensions update
            updateCanvasDimensions();

            // Update dimensions on window resize
            window.addEventListener('resize', updateCanvasDimensions);

            // Cleanup event listener on component unmount
            return () => {
                window.removeEventListener('resize', updateCanvasDimensions);
            };
        }
    }, []);

    return (
        <div className="canvas-root">
            <div className="canvas-container" ref={containerRef}>
                <canvas ref={canvasRef} />
                <PlayerBall canvasRef={canvasRef} />
            </div>
        </div>
    );
};

export default Canvas;
