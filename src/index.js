const canvas = document.getElementById('box');
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;
canvas.style.border = 'solid 2px';

const ctx = canvas.getContext('2d');

const ball_count = 100;
const balls = [];

const color_array = ['#FE4A49', '#2AB7CA', '#FED766', '#011F4B', '#03396C', '#DEC3C3', '#4A4E4D'];
const possible_directions = [-1, 1];
let x, y, radius, dx, dy, color, speed;

for (let i=0; i<ball_count; i++) {

    radius = getRandomIntInclusive(5, 15);
    x = getRandomIntInclusive(0+radius, canvas.width-radius);
    y = getRandomIntInclusive(0+radius, canvas.height-radius);
    color = color_array[getRandomIntInclusive(0, color_array.length-1)];
    dx = possible_directions[getRandomIntInclusive(0, possible_directions.length - 1)];
    dy = possible_directions[getRandomIntInclusive(0, possible_directions.length - 1)];
    speed = getRandomIntInclusive(1, 5);

    balls.push(new Ball(x, y, radius, dx, dy, color, speed));
}

const gameLoop = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i=0; i<balls.length; i++) {
        balls[i].draw(ctx);
        balls[i].move();
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();





