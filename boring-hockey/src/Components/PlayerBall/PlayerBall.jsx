/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, useCallback } from 'react';
import Ball from '../../engine/Ball';
import GameLoop from '../../engine/GameLoop/GameLoop';
import GameContext from '../../context/GameContext';
import { sendBallPositions } from '../../network/gameNetworkUtils';
import { debounce } from '../../network/utils';

function PlayerBall(props) {
    const { balls, setBalls, socket } = useContext(GameContext);
    const [activeBall, setActiveBall] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [initialCoordinates, setInitialCoordinates] = useState(null);

    // Create a debounced version of sendBallPositions
    const debouncedSendBallPositions = useCallback(debounce(sendBallPositions, 100), []);

    useEffect(() => {
        const canvas = props.canvasRef.current;
        if (!canvas) return;

        const handleMouseDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            balls.forEach((ball, index) => {
                const dx = mouseX - ball.x;
                const dy = mouseY - ball.y;
                if (dx * dx + dy * dy <= ball.radius * ball.radius) {
                    if (ball.color === 'green') return;
                    setActiveBall(index);
                    setEndTime(performance.now());
                    setInitialCoordinates({ x: ball.x, y: ball.y });
                }
            });
        };

        const handleMouseMove = (e) => {
            if (activeBall !== null) {
                const rect = canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                setBalls((prevBalls) => {
                    const newBalls = [...prevBalls];
                    const ball = newBalls[activeBall];
                    ball.x = mouseX;
                    ball.y = mouseY;
                    return newBalls;
                });

                // Send ball positions to the server using the debounced function
                debouncedSendBallPositions(socket, balls);
            }
        };

        const handleMouseUp = () => {
            setEndTime(performance.now() - endTime);
            setActiveBall(null);
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [balls, activeBall, setBalls, socket, debouncedSendBallPositions]);

    return (
        <>
            <GameLoop canvasRef={props.canvasRef} balls={balls} setBalls={setBalls} />
        </>
    );
}

export default PlayerBall;