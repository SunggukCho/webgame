const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const dinoImg = new Image();
const cactusImg = new Image();
dinoImg.src = './dino.png';
cactusImg.src = './cactus.png';

// unit 생성
let dino = {
  x: 10,
  y: 200, 
  width: 50, 
  height: 50,
  draw(){
    ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(dinoImg, this.x, this.y)
  }
} 
dino.draw();

// 장애물 생성 (class)
class Cactus {
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(cactusImg, this.x, this.y)
  }
}

let timer = 0;
let obstacles = [];
let jump = false; // jump 명령어 check
let jumpTimer = 0;
let animation;


document.addEventListener('keydown', (e) => {
  if (e.code === 'Space'){
    jump = true;
  }
})
function actionByFrame() {
  timer++;
  animation = requestAnimationFrame(actionByFrame)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (timer % 120 === 0) {
    // 장애물 생성
    const cactus = new Cactus();
    obstacles.push(cactus);
  }
  obstacles.forEach((obstacle, idx, arr) => {
    // x좌표가 0미만이면 제거
    if (obstacle.x <= 0) {
      arr.splice(idx, 1)
    }
    // 충돌체크
    obstacle.x--;
    checkCollision(dino, obstacle);
    obstacle.draw();
    
  })

  // jump기능
  if (jump === true) {
    // 점프중...
    dino.y --;
    jumpTimer++;
  }
  if (jump === false) {
    if (dino.y < 200) {
      dino.y++;
    }
    jumpTimer = 0;
  }
  if (jumpTimer > 60) {
    // jump 멈추기
    jump = false;
  }
  dino.draw();
}
actionByFrame();

// 충돌확인 함수
function checkCollision(dino, cactus) {
  let xDiff = cactus.x - (dino.x + dino.width);
  let yDiff = cactus.y - (dino.y + dino.height);
  if (xDiff < 0 && yDiff < 0) {
    // 충돌! - canvas clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation) // animation 멈추기
  }
}