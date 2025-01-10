/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react';
import GameContext from '../../context/GameContext';
import Ball from '../Ball';
function GameLoop({ canvasRef, balls, setBalls }) {
    const { socket } = useContext(GameContext);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const friction = 0.999991; // Friction coefficient to slow down the green ball gradually

        const resolveCollision = (ball1, ball2) => {
            const dx = ball1.x - ball2.x;
            const dy = ball1.y - ball2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = ball1.radius + ball2.radius;

            if (distance < minDistance) {
                const angle = Math.atan2(dy, dx);
                const overlap = minDistance - distance;

                if (!((ball1.color === 'red' && ball2.color === 'blue') || (ball1.color === 'blue' && ball2.color === 'red'))) {
                    ball1.x += Math.cos(angle) * overlap / 2;
                    ball1.y += Math.sin(angle) * overlap / 2;
                    ball2.x -= Math.cos(angle) * overlap / 2;
                    ball2.y -= Math.sin(angle) * overlap / 2;

                    [ball1, ball2].forEach(ball => {
                        if (ball.x - ball.radius < 0) ball.x = ball.radius;
                        if (ball.x + ball.radius > canvasRef.current.width) ball.x = canvasRef.current.width - ball.radius;
                        if (ball.y - ball.radius < 0) ball.y = ball.radius;
                        if (ball.y + ball.radius > canvasRef.current.height) ball.y = ball.radius;
                    });
                }

                if ((ball1.color === 'green' && (ball2.color === 'red' || ball2.color === 'blue')) ||
                    (ball2.color === 'green' && (ball1.color === 'red' || ball1.color === 'blue'))) {
                    const greenBall = ball1.color === 'green' ? ball1 : ball2;

                    const velocityBoost = -0.004; // Small fixed velocity boost
                    greenBall.vx += Math.cos(angle) * velocityBoost;
                    greenBall.vy += Math.sin(angle) * velocityBoost;
                }

                [ball1, ball2].forEach(ball => {
                    if ((ball.color === 'red' || ball.color === 'blue') && ball.vx === 0 && ball.vy === 0) {
                        ball.vx = 0;
                        ball.vy = 0;
                    }
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            balls.forEach((ball, index) => {
                ball.updatePosition(ctx.canvas.width, ctx.canvas.height);

                if (ball.color === 'green') {
                    ball.vx *= friction;
                    ball.vy *= friction;
                }

                for (let i = index + 1; i < balls.length; i++) {
                    resolveCollision(ball, balls[i]);
                }

                ball.drawBall(ctx);
            });

            requestAnimationFrame(draw);
        };

        const sendBallPositions = () => {
            if (socket) {
                const ballPositions = balls.map(ball => ({
                    x: ball.x,
                    y: ball.y,
                    vx: ball.vx,
                    vy: ball.vy,
                    color: ball.color
                }));
                socket.emit('updateBallPositions', ballPositions);
            }
        };

        const intervalId = setInterval(sendBallPositions, 2000); // Emit every 100ms
        draw();
        if (socket) {
            socket.on('broadcastBallPositions', (newBallPositions) => {
                console.log("POS")
                const newBalls = newBallPositions.map(ballData => new Ball(ballData.x, ballData.y, ballData.radius, ballData.color));
                newBalls.forEach((ball, index) => {
                    ball.vx = newBallPositions[index].vx;
                    ball.vy = newBallPositions[index].vy;
                });
                setBalls(newBalls);
            });
        }


        return () => {
            cancelAnimationFrame(draw);
            clearInterval(intervalId);
            if (socket) {
                socket.off('broadcastBallPositions');
                // socket.disconnect();
            }
        };
    }, [canvasRef, balls, socket, setBalls]);

    return null;
}

export default GameLoop;
