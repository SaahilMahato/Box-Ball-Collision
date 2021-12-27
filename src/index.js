const canvas = document.getElementById('box');
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;
canvas.style.border = 'solid 2px';

const ctx = canvas.getContext('2d');

const BALL_COUNT = 100;
const BALLS = [];

const color_array = ['#FE4A49', '#2AB7CA', '#FED766', '#011F4B', '#03396C', '#DEC3C3', '#4A4E4D'];
const possible_directions = [-1, 1];
let x, y, radius, dx, dy, color;

for (let i=0; i<BALL_COUNT; i++) {
    radius = getRandomIntInclusive(5, 15);
    x = getRandomIntInclusive(0+radius, canvas.width-radius);
    y = getRandomIntInclusive(0+radius, canvas.height-radius);
    color = color_array[getRandomIntInclusive(0, color_array.length-1)];
    dx = possible_directions[getRandomIntInclusive(0, possible_directions.length - 1)];
    dy = possible_directions[getRandomIntInclusive(0, possible_directions.length - 1)];
    
    BALLS.push(new Ball(x, y, radius, dx, dy, color));
    BALLS[i].draw(ctx);
}



