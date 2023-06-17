// board
const blockSize = 25;
const rows = 20;
const colums = 20;
let context;
let board;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velocityX = 0;
let velocityY = 0;

const snakeBody = [];

let snakeSpeed = 1;

//  food
let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = blockSize * rows;
  board.width = blockSize * colums;
  context = board.getContext("2d");

  plaseFood();

  document.addEventListener("keydown", changeDirection);

  const speed1 = setInterval(update, 150);
  //   setInterval(() => {
  //     if (snakeBody.length === 2) {
  //       clearInterval(speed1);
  //       const speed2 = setInterval(update, 300);
  //     }
  //   }, 500);
};

function update() {
  if (gameOver) {
    return;
  }

  console.log(snakeSpeed);
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    plaseFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if (
    snakeX < 0 ||
    snakeX > colums * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("GAME OVER!!!");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver = true;
      alert("GAME OVER!!!");
    }
  }
}

function changeDirection(e) {
  if (e.code === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  if (e.code === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  if (e.code === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  if (e.code === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
}

function plaseFood() {
  foodX = Math.floor(Math.random() * colums) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}
