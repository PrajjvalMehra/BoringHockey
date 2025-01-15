import { resolveCollision } from '../utils/collisionUtils';
import { sendBallPositions } from '../../network/gameNetworkUtils';

export const friction = 0.999991;

export const updateBallPosition = (ball, canvasWidth, canvasHeight, friction) => {
    ball.updatePosition(canvasWidth, canvasHeight);
    if (ball.color === 'green') {
        ball.vx *= friction;
        ball.vy *= friction;
    }
};

export const handleCollisions = (ball, index, balls, canvasRef, socket, debouncedSendBallPositions) => {
    let collisionOccurred = false;
    for (let i = index + 1; i < balls.length; i++) {
        const collision = resolveCollision(canvasRef, ball, balls[i]);
        if (collision) {
            collisionOccurred = true;
        }
    }
    if (collisionOccurred) {
        debouncedSendBallPositions(socket, balls);
    }
};