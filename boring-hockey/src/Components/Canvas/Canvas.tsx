// src/CanvasComponent.js
import React, { useRef, useEffect, useContext } from 'react';
import PlayerBall from '../PlayerBall/PlayerBall.jsx';
import GameContext from '../../context/GameContext.jsx';

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { state, setState } = useContext(GameContext);

    console.log(state);


    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;

        if (canvas && container) {
            const ctx = canvas.getContext('2d');

            const updateCanvasDimensions = () => {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                canvas.width = containerWidth;
                canvas.height = containerHeight;

                // Draw center line
                if (ctx) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // Vertical center line
                    ctx.beginPath();
                    ctx.moveTo(canvas.width / 2, 0);
                    ctx.lineTo(canvas.width / 2, canvas.height);
                    ctx.strokeStyle = 'black';
                    ctx.stroke();

                    // Horizontal center line
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height / 2);
                    ctx.lineTo(canvas.width, canvas.height / 2);
                    ctx.strokeStyle = 'black';
                    ctx.stroke();

                    // Circle in the middle
                    ctx.beginPath();
                    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
                    ctx.fillStyle = 'black';
                    ctx.fill();
                    ctx.closePath();
                }
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
                <PlayerBall canvasRef={canvasRef} />
                {/* <div className="center-line"></div> */}
                <canvas ref={canvasRef} />
                {/* <div className="center-circle"></div> */}
            </div>
        </div>
    );
};

export default Canvas;
