// src/CanvasComponent.js
import React, { useRef, useEffect } from 'react';



function drawCircle(x, y, context) {
    context.beginPath();
    context.arc(x, y, 50, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
}


const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            // Set canvas dimensions
            canvas.width = window.innerWidth - 100;
            canvas.height = window.innerHeight - 100;

            if (context) {
                // Draw something on the canvas (example: a rectangle)
                drawCircle(100, 100, context);
            }
        }
    }, []);
    

    window.addEventListener('mousedown', (e) => {
        
    });


    return (<canvas ref={canvasRef} >
        </canvas>
        );
};

export default Canvas;
