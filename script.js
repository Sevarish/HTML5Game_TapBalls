const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;


let dragBall = new Point(canvas.width/2,canvas.height/2,20);
let lastPosPoint = new Point(canvas.width/2,canvas.height/2,0);
let lastPos = new Vector2d(50,0);
var speed = 0;
var ballSpawnTimer = 0;
var spawnSpeed = 180;
var changeSpawnSpeedTimer = 0;
var changeSpawnSpeedTime = 100;
var ballSpeed = 3;
let balls = [];
var lives = 3;
var score = 0;
var highscore = 0;
var anim1 = new Image(25,25);
anim1.src = "anim1.png";
var anim2 = new Image(25,25);
anim2.src = "anim2.png";
var anim3 = new Image(25,25);
anim3.src = "anim3.png";
var anim4 = new Image(25,25);
anim4.src = "anim4.png";
let animation = [anim1,anim2,anim3,anim4];
var animationTimer = 0;
var currentAnimation = 0;
function setup() {
  dragBall.pos = new Vector2d(canvas.width  / 2, canvas.height / 2);
  lastPosPoint.pos = new Vector2d(canvas.width  / 2 , canvas.height / 2)
  dragBall.drag(context);
  animate();
}

function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);
  context.fillStyle = "lightblue";
  context.fillRect(0, 0, canvas.width, canvas.height);
  dragBall.draw(context);
  animationTimer++;
  if (animationTimer > 5) {
    animationTimer = 0;
    if (currentAnimation >= animation.length - 1) {
      currentAnimation = 0;
    }
    else {
      currentAnimation++;
    }
  }
  context.drawImage(animation[currentAnimation],lastPos.dx - 25, lastPos.dy - 25)
  speed = dragBall.distanceToOtherPoint(lastPosPoint);
  lastPos.dx = dragBall.x;
  lastPos.dy = dragBall.y;
  lastPosPoint.position(lastPos);
  ballSpawnTimer++;
  changeSpawnSpeedTimer++;
  if (changeSpawnSpeedTimer > changeSpawnSpeedTime) {
    if (spawnSpeed > 1) {
    spawnSpeed -= 3;
    }
    changeSpawnSpeedTimer = 0;
  }
  if (ballSpawnTimer > spawnSpeed) {
    spawnBall();
    ballSpawnTimer = 0;
  }
  for (let i = 0; i < balls.length; i++) {
  balls[i].pos.add(balls[i].vel);
  balls[i].point.position(balls[i].pos);
  balls[i].point.draw(context);

  if (lastPos.dx + 5 < balls[i].pos.dx + 25 && lastPos.dx - 5 > balls[i].pos.dx - 25 && lastPos.dy - 5 > balls[i].pos.dy - 25 && lastPos.dy + 5 < balls[i].pos.dy + 25 && speed > 20) {
    spliceBall(i);
      score += 15;
  }
  if (balls[i].pos.dy > canvas.height && deleteOne == 1) {
    spliceBall(i);
    lives -= 1;
    if (lives < 1) {
      restartGame();
    }
  }
}
if (score > highscore) {
  highscore = score;
}
context.font = "20px Arial";
context.fillStyle = "black";
context.fillText("Score: " + score, 10, 50);
context.fillText("Lives: " + lives, 10, 100);
context.fillText("Highscore: " + highscore, canvas.width / 1.2, 50);
  }

  function spawnBall() {
    let newBall = {};
    newBall.point = new Point(0,0,20);
    newBall.pos = new Vector2d(Math.random() * canvas.width,0);
    newBall.vel = new Vector2d(0, ballSpeed);
    balls.push(newBall);
    deleteOne = 1;
  }

  function spliceBall(ballNumber) {
    balls.splice(ballNumber, 1);
  }

  function restartGame() {
    balls.splice(0);
    score = 0;
    ballSpeed = 2;
    spawnSpeed = 180;
    lives = 3;
  }

  setup();
