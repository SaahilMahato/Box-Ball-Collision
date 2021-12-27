// setup canvas
const canvas = document.getElementById('box');
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;
canvas.style.border = 'solid 2px';

// get context
const ctx = canvas.getContext('2d');

// user controlled parameters 
const ballCount = 1000;
const minRadius = 5;
const maxRadius = 10;
const minSpeed = 1;
const maxSpeed = 3;

// variables needed to create balls
const balls = [];
const possibleDirections = [-1, 1];
let x, y, dx, dy, color, radius, speed;

// create the balls
for (let i=0; i<ballCount; i++) {
    radius = getRandomIntInclusive(minRadius, maxRadius);
    x = getRandomIntInclusive(0+radius, canvas.width-radius);
    y = getRandomIntInclusive(0+radius, canvas.height-radius);
    color = getRandomColor();
    dx = possibleDirections[getRandomIntInclusive(0, possibleDirections.length - 1)];
    dy = possibleDirections[getRandomIntInclusive(0, possibleDirections.length - 1)];
    speed = getRandomIntInclusive(minSpeed, maxSpeed);
    balls.push(new Ball(x, y, radius, dx, dy, color, speed, ctx));
}

// game loop
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<balls.length; i++) {
        balls[i].move();
        balls[i].draw();
        for (let j=i+1; j<balls.length; j++) {
            if (balls[i].checkBallCollision(balls[j])) {
                balls[i].resolveBallCollision(balls[j]);
            }
        }
        balls[i].resolveBoxCollision();
    }
    requestAnimationFrame(gameLoop);
}

gameLoop(); // call game loop
