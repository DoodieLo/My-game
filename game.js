
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: canvas.width / 2, y: canvas.height / 2, size: 30, speed: 5 };
let keys = {};

// Keyboard input
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Mobile buttons
document.getElementById('up').addEventListener('touchstart', () => keys['ArrowUp'] = true);
document.getElementById('down').addEventListener('touchstart', () => keys['ArrowDown'] = true);
document.getElementById('left').addEventListener('touchstart', () => keys['ArrowLeft'] = true);
document.getElementById('right').addEventListener('touchstart', () => keys['ArrowRight'] = true);

document.getElementById('up').addEventListener('touchend', () => keys['ArrowUp'] = false);
document.getElementById('down').addEventListener('touchend', () => keys['ArrowDown'] = false);
document.getElementById('left').addEventListener('touchend', () => keys['ArrowLeft'] = false);
document.getElementById('right').addEventListener('touchend', () => keys['ArrowRight'] = false);

function drawPlayer() {
    ctx.fillStyle = 'lime';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;

    drawPlayer();
    requestAnimationFrame(update);
}

update();
