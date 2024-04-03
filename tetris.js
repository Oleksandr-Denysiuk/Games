const I = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
];

const J = [
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
];

const L = [
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
];

const O = [
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
];

const S = [
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 1],
  ],
  [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const T = [
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
];

const Z = [
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 0],
    [1, 0, 0],
  ],
];

const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = (COLUMN = 10);
const SQ = (squareSize = 20);
const VACANT = "WHITE"; // color of empty square

// draw a square

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(SQ * x, SQ * y, SQ, SQ);

  ctx.strokeStyle = "BLACK";
  ctx.strokeRect(SQ * x, SQ * y, SQ, SQ);
}

// create the board
let board = [];
for (r = 0; r < ROW; r++) {
  board[r] = [];
  for (c = 0; c < COL; c++) {
    board[r][c] = VACANT;
  }
}

// draw the board
function drawBoard() {
  for (r = 0; r < ROW; r++) {
    for (c = 0; c < COL; c++) {
      drawSquare(c, r, board[r][c]);
    }
  }
}

drawBoard();

// the pieces and their colors
const PIECES = [
  [Z, "red"],
  [S, "green"],
  [T, "yellow"],
  [O, "blue"],
  [L, "purple"],
  [I, "cyan"],
  [J, "orange"],
];

// initiate a piece

let p = new Piece(PIECES[0][0], PIECES[0][1]);

// the object Piece

function Piece(tetromino, color) {
  this.tetromino = tetromino;
  this.color = color;

  this.tetrominoN = 0; // we start from first patern
  this.activeTetromino = this.tetromino[this.tetrominoN];

  // we need to controle the pieces
  this.x = 4;
  this.y = -2;
}

// fill function
Piece.prototype.fill = function (color) {
  for (r = 0; r < this.activeTetromino.length; r++) {
    for (c = 0; c < this.activeTetromino.length; c++) {
      // draw only occupied squares
      if (this.activeTetromino[r][c]) {
        drawSquare(this.x + c, this.y + r, color);
      }
    }
  }
};

// draw piece to the board
Piece.prototype.draw = function () {
  this.fill(this.color);
};

// undraw function
Piece.prototype.undraw = function () {
  this.fill(VACANT);
};

// move down the piece
Piece.prototype.moveDown = function () {
  if (!this.collision(0, 1, this.activeTetromino)) {
    this.undraw();
    this.y++;
    this.draw();
  } else {
    //   we lock the piece and generate a new one
  }
};

// move right the piece
Piece.prototype.moveRight = function () {
  if (!this.collision(1, 0, this.activeTetromino)) {
    this.undraw();
    this.x++;
    this.draw();
  } else {
  }
};

// move left the piece
Piece.prototype.moveLeft = function () {
  if (!this.collision(-1, 0, this.activeTetromino)) {
    this.undraw();
    this.x--;
    this.draw();
  } else {
  }
};

// rotate the piece
Piece.prototype.rotate = function () {
  let nextPattern =
    this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
  if (!this.collision(0, 0, nextPattern)) {
    this.undraw();
    this.tetrominoN = this.undraw();
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
  } else {
  }
};

// collision function
Piece.prototype.collision = function (x, y, piece) {
  for (r = 0; r < piece.length; r++) {
    for (c = 0; c < piece.length; c++) {
      // if the square is empty, we skip it
      if (!piece[r][c]) {
        continue;
      }
      // coordinates of the piece after movement
      let newX = this.x + c + x;
      let newY = this.y + r + y;

      // conditions

      if (newX < 0 || newX >= COL || newY >= ROW) {
        return true;
      }
      // skip newY < 0; board[-1] will crush our game
      if (newY < 0) {
        continue;
      }
      //check if there is a locked piece already is place
      if (board[newX][newY] != VACANT) {
        return true;
      }
    }
  }
  return false;
};

// controle the piece
document.addEventListener("keydown", CONTROLE);
function CONTROLE(event) {
  if (event.keyCode == 37) {
    p.moveLeft();
    dropStart = Date.now();
  } else if (event.keyCode == 38) {
    p.rotate();
    dropStart = Date.now();
  } else if (event.keyCode == 39) {
    p.moveRight();
    dropStart = Date.now();
  } else if (event.keyCode == 40) {
    p.moveDown();
    dropStart = Date.now();
  }
}
// drop the piece every 1s
let dropStart = Date.now();
function drop() {
  let now = Date.now();
  let delta = now - dropStart;
  if (delta > 1000) {
    p.moveDown();
    dropStart = Date.now();
  }
  requestAnimationFrame(drop);
}
drop();
