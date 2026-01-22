let board = document.querySelector(".board");
let blockHeight = 50;
let blockWidth = 50;
let cols = Math.floor(board.clientWidth / blockWidth);
let rows = Math.floor(board.clientHeight / blockHeight);
const blocks = [];
let direction = "right";
let IntervalId = null;
let timerId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
let snake = [
  { x: 1, y: 4 },
  { x: 1, y: 5 },
  { x: 1, y: 6 },
];
const st_btn = document.querySelector(".start");
const modal = document.querySelector(".modal");
const start_game = document.querySelector(".start-game");
const reset_btn = document.querySelector(".reset-btn");
const game_over = document.querySelector(".game-over");
let high_score_element = document.querySelector("#High_Score");
let score_element = document.querySelector("#Score");
let time_element = document.querySelector("#Time");
let high_score = localStorage.getItem("high_score") || 0;
high_score_element.innerText = high_score;
let score = 0;
let time = `00:00`;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row}-${col}`] = block;
  }
}

//Core Logic Of Snake-Game

function rendor() {
  let head = null;
  blocks[`${food.x}-${food.y}`].classList.add("fillfood");
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
    snake.forEach((segment) => {
      blocks[`${segment.x}-${segment.y}`].classList.remove("fillblock");
    });
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
    snake.forEach((segment) => {
      blocks[`${segment.x}-${segment.y}`].classList.remove("fillblock");
    });
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
    snake.forEach((segment) => {
      blocks[`${segment.x}-${segment.y}`].classList.remove("fillblock");
    });
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
    snake.forEach((segment) => {
      blocks[`${segment.x}-${segment.y}`].classList.remove("fillblock");
    });
  }
  if (head.x < 0 || head.y < 0 || head.x >= rows || head.y >= cols) {
    clearInterval(IntervalId);
    modal.style.display = "flex";
    start_game.style.display = "none";
    game_over.style.display = "flex";
  }
  if (food.x == head.x && food.y == head.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("fillfood");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x}-${food.y}`].classList.add("fillfood");
    snake.push(head);
    score = score + 10;
    console.log(score);
    score_element.innerText = score;
    if (high_score < score) {
      high_score = score;
      localStorage.setItem("high_score", high_score.toString());
    }
  }
  snake.unshift(head);
  snake.pop();
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fillblock");
  });
}

//Snake Movment 

addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    direction = "up";
  } else if (event.key === "ArrowDown") {
    direction = "down";
  } else if (event.key === "ArrowLeft") {
    direction = "left";
  } else if (event.key === "ArrowRight") {
    direction = "right";
  }
});

//Start Button Function

st_btn.addEventListener("click", () => {
  IntervalId = setInterval(() => {
    modal.style.display = "none";
    rendor();
  }, 300);
  timerId = setInterval(() => {
    let [min, sec] = time.split(":").map(Number);
    if (sec == 59) {
      min = min + 1;
      sec = 0;
    } else {
      sec += 1;
    }
    time = `${min}:${sec}`;
    time_element.innerText = time;
  }, 1000);
});

//Reset Button Functioning

reset_btn.addEventListener("click", () => {
  modal.style.display = "none";
  blocks[`${food.x}-${food.y}`].classList.remove("fillfood");
  direction = "right";
  snake = [
    { x: 1, y: 4 },
    { x: 1, y: 5 },
    { x: 1, y: 6 },
  ];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };
  score = 0;
  score_element.innerText = score;
  high_score_element.innerText = high_score;
  time = `00:00`;
  time_element.innerText = time;
  IntervalId = setInterval(() => {
    rendor();
  }, 300);
});