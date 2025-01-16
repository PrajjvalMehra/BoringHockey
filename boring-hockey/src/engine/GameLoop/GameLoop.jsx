/* eslint-disable react/prop-types */
import { useContext, useEffect, useCallback } from 'react';
import GameContext from '../../context/GameContext';
import { updateBallPosition, handleCollisions, friction } from '../utils/gameLoopUtils';
import { handleSocketUpdates, sendBallPositions } from '../../network/gameNetworkUtils';
import { debounce } from '../../network/utils';

function GameLoop({ canvasRef, balls, setBalls }) {
    const { socket } = useContext(GameContext);

    // Create a debounced version of sendBallPositions
    const debouncedSendBallPositions = useCallback(debounce(sendBallPositions, 100), []);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            balls.forEach((ball, index) => {
                updateBallPosition(ball, ctx.canvas.width, ctx.canvas.height, friction);
                handleCollisions(ball, index, balls, canvasRef, socket, debouncedSendBallPositions);
                ball.drawBall(ctx);
            });
            debouncedSendBallPositions(socket, balls); // Emit ball positions at regular intervals
            requestAnimationFrame(draw);
        };

        draw();

        if (socket) {
            socket.on('broadcastBallPositions', (newBallPositions) => handleSocketUpdates(newBallPositions, setBalls));
        }

        return () => {
            cancelAnimationFrame(draw);
            if (socket) {
                socket.off('broadcastBallPositions', (newBallPositions) => handleSocketUpdates(newBallPositions, setBalls));
            }
        };
    }, [canvasRef, balls, socket, setBalls, debouncedSendBallPositions]);

    return null;
}

export default GameLoop;