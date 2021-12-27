/**
 * @param {number} x - the x-coordinate of the ball
 * @param {number} y - the y-coordinate of the ball
 * @param {number} radius - the radius of the ball
 * @param {number} dx - the x-direction of the ball
 * @param {number} dy - the y-direction of the ball
 * @param {string} color - color of the ball
 * @param {number} speed - the speed of the ball
 */

class Ball {
    constructor (x, y, radius, dx, dy, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.vx = dx * this.speed;
        this.vy = dy * this.speed;
        this.mass = this.radius; // suppose mass is equal to radius. looks realistic
        this.restitution = 0.99; // higher value = high energy retain after collision
    }

    draw = (ctx) => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move = () => {
        this.x += this.vx;
        this.y += this.vy;
    }

    resolveBoxCollision = (ctx) => {
        /*
            abs() is used to correctly change direction based on the border it is close to
            velocity is multiplied by restitution to make the ball lose energy
            position is set to radius to prevent border crossing
        */

        // for x coordinate
        if (this.x < this.radius) {
            this.vx = Math.abs(this.vx) * this.restitution;
            this.x = this.radius;
        }
        else if (this.x > ctx.canvas.width - this.radius){
            this.vx = -Math.abs(this.vx) * this.restitution;
            this.x = ctx.canvas.width - this.radius;
        }


        // for y coordinate
        if (this.y < this.radius) {
            this.vy = Math.abs(this.vy) * this.restitution;
            this.y = this.radius;
        }
        else if (this.y > ctx.canvas.height - this.radius){
            this.vy = -Math.abs(this.vy) * this.restitution;
            this.y = ctx.canvas.height - this.radius;
        }
    }

    checkBallCollision = (otherBall) => {
        /*
            sqrt() was not used because it is a costly operation
            instead the radius is squared and compared
        */

        let xDist = this.x - otherBall.x;
        let yDist = this.y - otherBall.y;
        let distanceSquared = xDist * xDist + yDist * yDist;
        let radiusSquared = (this.radius + otherBall.radius) * (this.radius + otherBall.radius);
        return distanceSquared <= radiusSquared;
    }

    resolveCollision = (otherBall) => {
        // use vector physics to calculate velocity. 

        let vCollision = {x: otherBall.x - this.x, y: otherBall.y - this.y};
        let distance = Math.sqrt((otherBall.x - this.x)*(otherBall.x - this.x) + (otherBall.y - this.y)*(otherBall.y - this.y));
        let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
        let vRelativeVelocity = {x: this.vx - otherBall.vx, y: this.vy - otherBall.vy};
        let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
        if (speed < 0) return;
        let impulse = 2 * speed / (this.mass + otherBall.mass);
        this.vx -= ((impulse * otherBall.mass * vCollisionNorm.x) * this.restitution);
        this.vy -= ((impulse * otherBall.mass * vCollisionNorm.y) * this.restitution);
        otherBall.vx += ((impulse * this.mass * vCollisionNorm.x) * this.restitution);
        otherBall.vy += ((impulse * this.mass * vCollisionNorm.y) * this.restitution);
    }
}
