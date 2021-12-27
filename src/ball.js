/**
 * @param {number} x - the x-coordinate of the ball
 * @param {number} y - the y-coordinate of the ball
 * @param {number} radius - the radius of the ball
 * @param {number} dx - the x-direction of the ball
 * @param {number} dy - the y-direction of the ball
 */


class Ball {
    constructor (x, y, radius, dx, dy, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.dx = dx * this.speed;
        this.dy = dy * this.speed;
    }

    draw = (ctx) => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move = () => {
        this.checkBoxCollision();
        this.x += this.dx;
        this.y += this.dy;
    }

    checkBoxCollision = () => {
        if ((this.x + this.radius) > ctx.canvas.width || (this.x - this.radius) < 0) this.dx = -this.dx;
        if ((this.y + this.radius) > ctx.canvas.height || (this.y - this.radius) < 0) this.dy = -this.dy;
    }

    checkBallCollision = () => {

    }
}