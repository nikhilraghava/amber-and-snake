var snake;
var scl = 20;
var food;
var myFont;

function preload() {
    myFont = loadFont('res/RobotoMono-Thin.ttf');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    snake = new Snake();
    frameRate(8);
    pickLocation();
}

function pickLocation() {
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw() {
    background('#607d8b');

    if (snake.eat(food)) {
        pickLocation();
    }

    if (snake.death()) {
        fill(255);
        stroke(255);
        textFont(myFont);
        textSize(24);
        text('Game over! Move to continue...', width - 500, 54);
    }

    snake.move();
    snake.show();

    fill('#FFC107');
    noStroke()
    rect(food.x, food.y, scl, scl);

    fill(255);
    stroke(255);
    textFont(myFont);
    textSize(28);
    text(snake.total, 40, 64);
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        if (snake.yspeed + -1 != 0)
            snake.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        if (snake.yspeed + 1 != 0)
            snake.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        if (snake.xspeed + 1 != 0)
            snake.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        if (snake.xspeed + -1 != 0)
            snake.dir(-1, 0);
    }
}
