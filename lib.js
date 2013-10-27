var ctx;
var WIDTH;
var HEIGHT;

var dx = 20;
var dy = 20;
var dr = 10;

// 0: left
// 1: up
// 2: right
// 3: down
var direction;

var popcorn;

var moviegoers;

var stepInterval;
var moviegoerInterval;
var start;
var lastTime = 0;

function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();

  createpopcorn();
  moviegoers = Array();
  newmoviegoer();

  direction = 0;

  clearInterval(stepInterval);
  stepInterval = setInterval(step, 100);
  clearInterval(moviegoerInterval);
  moviegoerInterval = setInterval(newmoviegoer, 1500);
  start = new Date().getTime();
}

function onKeyDown(evt) {
  var newdir = evt.keyCode - 37;
  if (newdir >= 0 && newdir <= 4) {
    direction = newdir;
  }
}

if ($.browser.mozilla) {
    $(document).keypress(onKeyDown);
} else {
    $(document).keydown(onKeyDown);
}

function createpopcorn() {
  popcorn = Array();
  popcorn.x = WIDTH/2;
  popcorn.y = HEIGHT/2;
  popcorn.r = dr;
}

function collision() {
  // are we out of the theater?
  if (popcorn.x < 0 || popcorn.x > WIDTH - dr || popcorn.y < 0 || popcorn.y > HEIGHT - dr) {
    return true;
  }

  for (var i = 0; i < moviegoers.length; i++) {
    if (moviegoers[i].x == popcorn.x && moviegoers[i].y == popcorn.y) {
      return true;
    }
  }
  return false;
}

function newmoviegoer() {
  var wcells = WIDTH/dx;
  var hcells = HEIGHT/dy;

  var randomx = Math.floor(Math.random()*wcells);
  var randomy = Math.floor(Math.random()*hcells);
  var direction = Math.floor(Math.random()*4);

  m = Array();
  m.x = randomx * dx;
  m.y = randomy * dy;
  m.dir = direction;
  moviegoers.push(m);
}

function movemoviegoers() {
  var oldsize = moviegoers.length;
  moviegoers.forEach(function(m) {
    switch (m.dir) {
      case 0: // left
        m.x = m.x - dx;
        break;
      case 1: // up
        m.y = m.y - dx;
        break;
      case 2: // right
        m.x = m.x + dy;
        break;
      case 3: // down
        m.y = m.y + dy;
        break;
    }
  });
  moviegoers = moviegoers.filter(function(m) {
    return !(m.x < 0 || m.x > WIDTH - dx || m.y < 0 || m.y > HEIGHT - dy);
  });
  var newsize = moviegoers.length;
  for(i = 0; i < oldsize - newsize; i++)
    newmoviegoer();
}

function movepopcorn() {
  switch (direction) {
    case 0: // left
      popcorn.x = popcorn.x - 2*dr;
      break;
    case 1: // up
      popcorn.y = popcorn.y - 2*dr;
      break;
    case 2: // right
      popcorn.x = popcorn.x + 2*dr;
      break;
    case 3: // down
      popcorn.y = popcorn.y + 2*dr;
      break;
  }
}

function die() {
  clearInterval(stepInterval);
  clearInterval(moviegoerInterval);
  var finish = new Date().getTime();
  lastTime = finish - start;
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function screenclear() {
  ctx.fillStyle = "#000000";
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  rect(0,0,WIDTH,HEIGHT);
}

function drawpopcorn() {
  ctx.fillStyle = "#FFFFFF";
  circle(popcorn.x+popcorn.r, popcorn.y+popcorn.r, popcorn.r);
}

function drawmoviegoers() {
  ctx.fillStyle = "#FF0000";
  moviegoers.forEach(function(m) {
    rect(m.x, m.y, dx, dy);
  });
}