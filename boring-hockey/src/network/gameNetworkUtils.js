import Ball from '../engine/Ball';

export const sendBallPositions = (socket, balls) => {
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

export const handleSocketUpdates = (newBallPositions, setBalls) => {
    const newBalls = newBallPositions.map(ballData => new Ball(ballData.x, ballData.y, ballData.radius, ballData.color));
    newBalls.forEach((ball, index) => {
        ball.vx = newBallPositions[index].vx;
        ball.vy = newBallPositions[index].vy;
    });
    setBalls(newBalls);
};