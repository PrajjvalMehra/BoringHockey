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
        if (this.color === 'red' || this.color === 'blue') return;
        // if the ball is not red or blue, it is the puck. And if it is the puck. it should slow down over time and eventually stop. 
        // if (this.color === 'green') {
        //     this.vx *= 0.99;
        //     this.vy *= 0.99;

        // }
        // console.log(this.color, this.vx, this.vy);

        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off the walls
        if (this.x - this.radius < 0 || this.x + this.radius > canvasWidth) {
            this.vx *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > canvasHeight) {
            this.vy *= -1;
        }
    }
}

export default Ball;