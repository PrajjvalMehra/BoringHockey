export const resolveCollision = (canvasRef, ball1, ball2) => {
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