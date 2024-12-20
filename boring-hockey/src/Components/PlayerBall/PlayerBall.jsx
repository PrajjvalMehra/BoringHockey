/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Ball from '../../engine/Ball';
import GameLoop from '../../engine/GameLoop/GameLoop';

function PlayerBall(props) {
    const [balls, setBalls] = useState([
        new Ball(230, 50, 30, 'red'),
        new Ball(230, 650, 30, 'blue'),
        new Ball(230, 350, 20, 'green')
    ]);
    const [activeBall, setActiveBall] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [initialCoordinates, setInitialCoordinates] = useState(null);



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
    }, [balls, activeBall, setBalls, setActiveBall, setEndTime]);

    return (
        <>
            <GameLoop canvasRef={props.canvasRef} balls={balls} />
        </>
    );
}

export default PlayerBall;