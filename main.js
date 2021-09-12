const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// unit 생성
let dino = {
  x: 10,
  y: 200, 
  width: 50, 
  height: 50,
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height)
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
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }
}

let timer = 0;
let obstacles = [];

function actionByFrame() {
  timer++;
  requestAnimationFrame(actionByFrame)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (timer % 60 === 0) {
    const cactus = new Cactus();
    obstacles.push(cactus);
  }
  obstacles.forEach((obstacle) => {
    obstacle.x--;
    obstacle.draw();
  })

  dino.draw();
}
actionByFrame();