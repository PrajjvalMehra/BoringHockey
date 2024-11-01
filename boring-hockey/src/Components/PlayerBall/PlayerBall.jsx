import { useEffect } from 'react';
import Ball from '../../engine/Ball';

function PlayerBall(props) {
    useEffect(() => {
        if (!props.canvasRef.current) return;
        const ctx = props.canvasRef.current.getContext('2d');
        if (!ctx) return;

        const Ball1 = new Ball(100, 100, 30, 'red');

        const draw = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
            Ball1.drawBall(ctx);
            requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(draw); // Cleanup on unmount
    }, [props.canvasRef]);

    return (
        <></>
    );
}

export default PlayerBall;