import { resolveCollision } from '../utils/collisionUtils';

export const friction = 0.999991;

export const updateBallPosition = (ball, canvasWidth, canvasHeight, friction) => {
    ball.updatePosition(canvasWidth, canvasHeight);
    if (ball.color === 'green') {
        ball.vx *= friction;
        ball.vy *= friction;
    }
};

export const handleCollisions = (ball, index, balls, canvasRef) => {
    for (let i = index + 1; i < balls.length; i++) {
        resolveCollision(canvasRef, ball, balls[i]);
    }
};