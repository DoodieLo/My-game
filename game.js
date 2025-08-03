
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gravity = 0.5;
let keys = {};

const player = {
  x: 50,
  y: 0,
  width: 30,
  height: 30,
  velX: 0,
  velY: 0,
  speed: 3,
  jumpForce: -10,
  grounded: false
};

const platforms = [
  { x: 0, y: 370, width: 800, height: 30 },
  { x: 150, y: 300, width: 100, height: 10 },
  { x: 300, y: 240, width: 100, height: 10 },
  { x: 450, y: 180, width: 100, height: 10 }
];

document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

function update() {
  player.velY += gravity;
  player.grounded = false;

  if (keys["ArrowLeft"]) player.velX = -player.speed;
  if (keys["ArrowRight"]) player.velX = player.speed;
  if (!keys["ArrowLeft"] && !keys["ArrowRight"]) player.velX = 0;

  if (keys["Space"] && player.grounded) {
    player.velY = player.jumpForce;
    player.grounded = false;
  }

  player.x += player.velX;
  player.y += player.velY;

  for (let plat of platforms) {
    if (player.x < plat.x + plat.width &&
        player.x + player.width > plat.x &&
        player.y < plat.y + plat.height &&
        player.y + player.height > plat.y) {
      player.y = plat.y - player.height;
      player.velY = 0;
      player.grounded = true;
    }
  }

  if (player.y > canvas.height) {
    player.x = 50;
    player.y = 0;
    player.velY = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw player
  ctx.fillStyle = "#ff4136";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // draw platforms
  ctx.fillStyle = "#654321";
  for (let plat of platforms) {
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
