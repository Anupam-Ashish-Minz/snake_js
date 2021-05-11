const board = document.getElementById("board");
const ctx = board.getContext("2d");
const scoreBoard = document.getElementById("score");

// if you change the block size don't forget to change the snakes initial
// cordinates
let snake = [
    {x: 200, y: 200},
    {x: 210, y: 200},
    {x: 220, y: 200},
    {x: 230, y: 200},
    {x: 240, y: 200},
];
const blockSize = 10;
// +1 ve = right, bottom
// -1 ve = left, top
let direction = {x: -1, y: 0};
let score = 0;

const restart = () => {
    snake = [
        {x: 200, y: 200},
        {x: 210, y: 200},
        {x: 220, y: 200},
        {x: 230, y: 200},
        {x: 240, y: 200},
    ];
    direction = {x: -1, y: 0};
    score = 0;
};

const clearCanvas = () => {
    ctx.clearRect(0, 0, board.width, board.height);
};

const drawBlock = (block) => {
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(block.x, block.y, blockSize, blockSize);
};

const drawSnake = () => {
    for (const block of snake) {
        drawBlock(block);
    }
};

const collision = () => {
    const head = snake[0];
    for (const [index, block] of snake.entries()) {
        if (index!==0 && block?.x === head.x && block?.y === head.y) {
            return true;
        }
    };
    return false;
};

const move = () => {
    let head = {
        x: snake[0].x + (direction.x*blockSize),
        y: snake[0].y + (direction.y*blockSize),
    }
    if (head.x < 0) { 
        head.x = board.width 
    }
    if (head.x > board.width) { 
        head.x = 0 
    }
    if (head.y < 0) { 
        head.y = board.height 
    }
    if (head.y > board.height) {
        head.y = 0 
    }
    snake.unshift(head);
    const tail = snake.pop();
    return tail;
};

const generateFood = () => {
    const randCord = {
        x: Math.floor(Math.random()*50)*10,
        y: Math.floor(Math.random()*50)*10,
    }
    //console.log(randCord.x, randCord.y);
    return randCord;
};

const drawFood = (randCord) => {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(randCord.x, randCord.y, blockSize, blockSize);
};

const changeDirection = (keyCode) => {
    if (keyCode === 37) {
        const dx = -1 + direction.x;
        direction = { x: dx===0 ? 1 : dx, y: 0 };
    } 
    else if (keyCode === 38) {
        const dy = -1 + direction.y;
        direction = { x: 0, y: dy===0 ? 1 : dy};
    } 
    else if (keyCode === 39) {
        const dx = 1 + direction.x;
        direction = { x: dx===0 ? -1 : dx, y: 0 };
    } 
    else if (keyCode === 40) {
        const dy = 1 + direction.y;
        direction = { x: 0, y: dy === 0 ? -1 : dy};
    }
};

const growSnake = (tail) => {
    snake.push(tail);
};

const eatFood = (foodCord) => {
    if (foodCord.x === snake[0].x && foodCord.y === snake[0].y) {
        growSnake();
        score += 10;
        return null;
    }
    return foodCord;
};

const main = () => {
    document.addEventListener("keydown", (event) => {
        changeDirection(event.keyCode);
    });
    let foodCord = generateFood();
    setInterval(() => {
        clearCanvas();
        const tail = move();
        drawSnake();
        if (!foodCord) {
            foodCord = generateFood();
            growSnake(tail);
        }
        drawFood(foodCord);
        foodCord = eatFood(foodCord);
        if (collision()) {
            console.log("omae wa mou shindeiru");
            restart();
        }
        scoreBoard.innerText = score;
    }, 100);
}

main();
