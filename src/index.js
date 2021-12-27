// setup canvas
const canvas = document.getElementById('box');
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;
canvas.style.border = 'solid 2px';

// get context
const ctx = canvas.getContext('2d');

// user controlled parameters 
const ball_count = 1000;
const min_radius = 5;
const max_radius = 10;
const min_speed = 1;
const max_speed = 3;

// variables needed to create balls
const balls = [];
const possible_directions = [-1, 1];
let x, y, dx, dy, color, radius, speed;

// create the balls
for (let i=0; i<ball_count; i++) {
    radius = getRandomIntInclusive(min_radius, max_radius);
    x = getRandomIntInclusive(0+radius, canvas.width-radius);
    y = getRandomIntInclusive(0+radius, canvas.height-radius);
    color = getRandomColor();
    dx = possible_directions[getRandomIntInclusive(0, possible_directions.length - 1)];
    dy = possible_directions[getRandomIntInclusive(0, possible_directions.length - 1)];
    speed = getRandomIntInclusive(min_speed, max_speed);

    balls.push(new Ball(x, y, radius, dx, dy, color, speed));
}

// game loop
const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i<balls.length; i++) {
        balls[i].draw(ctx);
        for (let j=i+1; j<balls.length; j++) {
            if (balls[i].checkBallCollision(balls[j])) {
                balls[i].resolveCollision(balls[j]);
                balls[i].move();
                balls[j].move();
            }
        }
        balls[i].resolveBoxCollision(ctx);
        balls[i].move();
    }
    requestAnimationFrame(gameLoop);
}

gameLoop(); // call game loop
