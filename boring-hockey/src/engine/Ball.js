class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 0; // velocity in x direction
        this.vy = 0; // velocity in y direction
        this.ax = 0; // acceleration in x direction
        this.ay = 0; // acceleration in y direction
    }

    drawBall(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    updatePosition(canvasWidth, canvasHeight) {
        // No movement logic needed for now
    }
}

export default Ball;