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
    alert("you are dead. seconds: " + lastTime/1000);
    return true;
  }
  return false;
}

function draw() {
  screenclear();
  drawpopcorn();
  drawmoviegoers();
}