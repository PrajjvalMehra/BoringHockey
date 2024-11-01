/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Ball from '../../engine/Ball';
import GameLoop from '../GameLoop/GameLoop';

function PlayerBall(props) {
    const [balls, setBalls] = useState([
        new Ball(230, 50, 30, 'red'), // Near the top goal post
        new Ball(230, 650, 30, 'blue') // Near the bottom goal post
    ]);
    const [draggingBall, setDraggingBall] = useState(null);

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
                    setDraggingBall(index);
                }
            });
        };

        const handleMouseMove = (e) => {
            if (draggingBall !== null) {
                const rect = canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                setBalls((prevBalls) => {
                    const newBalls = [...prevBalls];
                    const ball = newBalls[draggingBall];
                    ball.ax = (mouseX - ball.x) * 0.005; // Reduced multiplier for smoother acceleration
                    ball.ay = (mouseY - ball.y) * 0.005; // Reduced multiplier for smoother acceleration
                    return newBalls;
                });
            }
        };

        const handleMouseUp = () => {
            setDraggingBall(null);
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [balls, draggingBall, props.canvasRef]);

    useEffect(() => {
        const updateBalls = () => {
            setBalls((prevBalls) => {
                return prevBalls.map((ball) => {
                    ball.vx += ball.ax;
                    ball.vy += ball.ay;

                    // Apply friction to velocity
                    ball.vx *= 0.98; // Friction factor for x velocity
                    ball.vy *= 0.98; // Friction factor for y velocity

                    ball.x += ball.vx;
                    ball.y += ball.vy;

                    // Boundary checks
                    if (ball.x - ball.radius < 0) {
                        ball.x = ball.radius;
                        ball.vx = -ball.vx;
                    } else if (ball.x + ball.radius > 500) {
                        ball.x = 500 - ball.radius;
                        ball.vx = -ball.vx;
                    }

                    if (ball.y - ball.radius < 0) {
                        ball.y = ball.radius;
                        ball.vy = -ball.vy;
                    } else if (ball.y + ball.radius > 700) {
                        ball.y = 700 - ball.radius;
                        ball.vy = -ball.vy;
                    }

                    // Reset acceleration
                    ball.ax = 0;
                    ball.ay = 0;

                    return ball;
                });
            });
        };

        const interval = setInterval(updateBalls, 16); // Approximately 60 FPS
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <GameLoop canvasRef={props.canvasRef} balls={balls} />
        </>
    );
}

export default PlayerBall;