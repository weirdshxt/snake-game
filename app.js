function loaderAnime() {
  let tl = gsap.timeline();

  gsap.to("#progress", {
    left: "22%",
    duration: 6,
    delay: 0,
  });
  gsap.to(".food", {
    opacity: 0,
    delay: 4.5,
    onStart: () => {
      foodSound.play();
    },
  });

  gsap.from("#l-count", {
    opacity: 0,
    onStart: () => {
      let h5timer = document.querySelector("#l-count");
      let grow = 0;

      setInterval(() => {
        if (grow < 100) {
          h5timer.innerHTML = `${grow++}%`;
          moveSound.play();
        } else {
          h5timer.innerHTML = `${grow}%`;
        }
      }, 45);
    },
  });

  gsap.from("#l-text h1", {
    x: 650,
    duration: 2,
  });

  tl.to("#loader",{
    y: "-100%",
    duration: 1.2,
    ease: "power4.inOut",
    delay: 6,
    onComplete: () => {
      document.querySelector("#loader").style.display = "none";
    }
  })
}

loaderAnime();

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("assets/food.mp3");
const gameOverSound = new Audio("assets/gameover.mp3");
const moveSound = new Audio("assets/move.mp3");
// const gameMusic = new Audio("music.mp3");
let speed = 5;
let lastTime = 0;
let score = 0;

let snakeHead = [
  {
    x: 5,
    y: 13,
  },
];

let food = { x: 5, y: 8 };

// Game functions

function main(time) {
  window.requestAnimationFrame(main);
  if ((time - lastTime) / 1000 < 1 / speed) {
    return;
  }
  lastTime = time;
  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snakeHead.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver();
      return true;
    }
  }
  if (
    snake[0].x >= 28 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    gameOver();
    return true;
  }
}


const scoreElement = document.querySelector("#score");
function updateScore() {
  score++;
  scoreElement.innerHTML = `Score: ${score}`;
}

let highScore = localStorage.getItem("highScore") || 0;
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
  displayHighScore();
}

function displayHighScore() {
  const highScoreElement = document.querySelector('#hiscore');
  highScoreElement.innerHTML = `High Score: ${highScore}`;
}

let difficultyLevel = 1;
function increaseDifficulty() {
  if (score % 5 === 0) {
    // Increase difficulty every 5 points
    difficultyLevel++;
    speed += 2; // Increase speed
  }
}

function gameEngine() {
  
  if (isCollide(snakeHead)) {
    gameOverSound.play();
    updateHighScore();
    score = 0;
    inputDir = { x: 0, y: 0 };
    snakeHead = [{ x: 20, y: 8 }];
  }

  // eating

  if (snakeHead[0].y === food.y && snakeHead[0].x === food.x) {
    foodSound.play();
    updateScore();
    increaseDifficulty();
    snakeHead.unshift({
      x: snakeHead[0].x + inputDir.x,
      y: snakeHead[0].y + inputDir.y,
    });
    let a = 2;
    let b = 17;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // moving tail

  for (let i = snakeHead.length - 2; i >= 0; i--) {
    snakeHead[i + 1] = { ...snakeHead[i] };
  }

  snakeHead[0].x += inputDir.x;
  snakeHead[0].y += inputDir.y;

  // snake head
  board.innerHTML = "";
  snakeHead.forEach((e, idx) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (idx === 0) {
      snakeElement.classList.add("snake-head");
    } else {
      snakeElement.classList.add("snake-body");
    }
    board.appendChild(snakeElement);
  });

  // food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("snake-food");
  board.appendChild(foodElement);
}
function resetGame() {
  score = 0;
  scoreElement.innerHTML = `Score: ${score}`;
  snakeHead = [{ x: 20, y: 8 }];
  inputDir = { x: 0, y: 0 };
  // Reset food position
  food = { x: 5, y: 8 };
}
function gameOver() {
  // Stop the game by removing animation frame
  cancelAnimationFrame(main);
  
  // Play game over sound
  gameOverSound.play();
  
  // Update high score
  updateHighScore();
  
  // Show game over screen
  const gameOverScreen = document.getElementById("game-over");
  const scoreElement = document.getElementById("g-score");
  const highScoreElement = document.getElementById("g-hiscore");
  const restartButton = document.getElementById("restart-btn");
  
  // Display game over screen
  gameOverScreen.style.display = "block";
  
  // Update score displays
  scoreElement.textContent = `Score: ${score}`;
  highScoreElement.textContent = `High Score: ${highScore}`;
  
  // Restart button event listener
  restartButton.addEventListener("click", () => {
    // Hide game over screen
    gameOverScreen.style.display = "none";
    
    // Reset game state
    resetGame();
    
    // Restart the game loop
    window.requestAnimationFrame(main);
  });
}

//main logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();

  switch (e.key) {
    case "ArrowUp":
      console.log("arrowup");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("arrowdown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("arrowleft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("arrowright");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});