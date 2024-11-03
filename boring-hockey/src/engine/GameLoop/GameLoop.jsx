/* eslint-disable react/prop-types */
import { useEffect } from 'react';

function GameLoop({ canvasRef, balls }) {


    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            balls.forEach(ball => {
                ball.updatePosition(ctx.canvas.width, ctx.canvas.height);
                ball.drawBall(ctx);
            });

            requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(draw);
    }, [canvasRef, balls]);

    return null;
}

export default GameLoop;