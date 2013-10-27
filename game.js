function gamerun() {
  init();
}

function step(){
  update();
  draw();
}

function update() {
  movepopcorn();
  if (!checkDeath()) {
    movemoviegoers();
    checkDeath();
  }
}

function checkDeath() {
  if (collision()) {
    die();
    alert("you are dead!\n\nyour life as a popcorn lasted " + lastTime/1000 + " seconds");
    return true;
  }
  return false;
}

function draw() {
  screenclear();
  drawpopcorn();
  drawmoviegoers();
}