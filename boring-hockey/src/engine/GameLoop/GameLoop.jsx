/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react';
import GameContext from '../../context/GameContext';
import { updateBallPosition, handleCollisions, friction } from '../utils/gameLoopUtils';
import { sendBallPositions, handleSocketUpdates } from '../../network/gameNetworkUtils';

function GameLoop({ canvasRef, balls, setBalls }) {
    const { socket } = useContext(GameContext);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            balls.forEach((ball, index) => {
                updateBallPosition(ball, ctx.canvas.width, ctx.canvas.height, friction);
                handleCollisions(ball, index, balls, canvasRef);
                ball.drawBall(ctx);
            });
            requestAnimationFrame(draw);
        };

        const intervalId = setInterval(() => sendBallPositions(socket, balls), 2000);
        draw();

        if (socket) {
            socket.on('broadcastBallPositions', (newBallPositions) => handleSocketUpdates(newBallPositions, setBalls));
        }

        return () => {
            cancelAnimationFrame(draw);
            clearInterval(intervalId);
            if (socket) {
                socket.off('broadcastBallPositions', (newBallPositions) => handleSocketUpdates(newBallPositions, setBalls));
            }
        };
    }, [canvasRef, balls, socket, setBalls]);

    return null;
}

export default GameLoop;