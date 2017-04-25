var cols = 72;// number of collumns (left/right), 72 is optimal (fullscreen)
var rows = 39;// number of rows (up/down), 39 is optimal (fullscreen)
var cellSize = 20;//size of displayed cells, in pixels
var frames = 20;
var preset = -1;//which preset to choose from presetLevels

var board1 = [];// array of cell states in rows and collumns (1 = alive, 0 = dead): ex : board1 [[0,0],[0,0],[0,0]]
var board2 = [];
var survives = [2,3]// any cell with less than this number eighbors dies (by underpopulation)
var topCap = 3;// any cell with more than this number of neighbors dies (by overpopulation)
var perfectCap = [3];// any cell with this number of neighbors is born
var activeBoard = board1;
var generation = 0;
var framesSlider;
var Rulestring;
//arrays of arrays of arrays (arrays of boardStates, values of the first array are columns/rows)
//ex: presetLevels = [[[col,rows][boardState]],[[col,rows][boardState]]]

var run = -1;//weather the canvas is in run mode (constantly updating, 1) or not (updated on keypress, -1)

function roundToCellSize(value) {
  return value - (value % cellSize);
}

function restart (){
  run = -1;
  generation = -1;
  if(preset!=-1){
    cols = presetLevels[preset][0][0];
    rows = presetLevels[preset][0][1];
    board1[0] = presetLevels[preset][1];
  }
  board1.splice(0,board1.length);
  board2.splice(0,board2.length);

  if(preset == -1){
    for(j = 0; j < rows; j ++){
    board1.push([]);
    board2.push([]);
    //console.log(board1);
      for(i = 0;i < cols; i ++){
      board1[j].push(0);
      board2[j].push(0);
    }
    }
  }
  showBoard(board1);

}

function showBoard (boardNumber){
  for(j = 0; j < rows; j ++){
    for (i = 0; i < cols; i++){
      if(boardNumber[j][i] == 0){
        fill(255);
      } else {
        fill(0);
      }
      rect(i*cellSize,j*cellSize,cellSize,cellSize);
    }
  }
}

function boardUpdate(boardNum,boardNum2){
  for(j = 0; j < rows; j ++){
    for (i = 0; i < cols; i++){
      if(perfectCap.indexOf(checkNeighbors(i,j,boardNum)) != -1){
        boardNum2[j][i] = 1;
      } else if(survives.indexOf(checkNeighbors(i,j,boardNum)) != -1){
        boardNum2[j][i] = boardNum[j][i];
      } else {
        boardNum2[j][i] = 0;
      }
    }
  }
  generation ++;
}

function checkNeighbors (col,row,boardNum) {
  var neighbors = 0;// the number of neighbors alive
  if (col > 0 && row > 0 && col < cols-1 && row < rows-1){
    //bottom center
    if(boardNum[row + 1][col] == 1){
      neighbors ++;
    }
    //bottom right
    if(boardNum[row + 1][col + 1] == 1){
      neighbors ++;
    }
    //bottom left
    if(boardNum[row + 1][col - 1] == 1){
      neighbors ++;
    }
    //top center
    if(boardNum[row - 1][col] == 1){
      neighbors ++;
    }
    //top right
    if(boardNum[row - 1][col + 1] == 1){
      neighbors ++;
    }
    //top left
    if(boardNum[row - 1][col - 1] == 1){
      neighbors ++;
    }
    //right
    if(boardNum[row][col + 1] == 1){
      neighbors ++;
    }
    //left
    if(boardNum[row][col - 1] == 1){
      neighbors ++;
    }

    return neighbors;
  }
}

function setup (){
  Rulestring = 'B' + perfectCap.join('') + '/S' + survives.join('');
  restart();
  console.log(JSON.stringify(board1));
  console.log(cols,rows);
  framesSlider = createSlider(3,40,frames);
  framesSlider.position(roundToCellSize(0.875*cols*cellSize),rows*cellSize + cellSize*0.75);
  createCanvas(cols*cellSize,rows*cellSize + cellSize*2);
  if (preset == -1){
    for(j = 0; j < rows; j ++){
      board1.push([]);
      board2.push([]);
      //console.log(board1);
      for(i = 0;i < cols; i ++){
        board1[j].push(0);
        board2[j].push(0);
      }
    }
  }
  showBoard(board1);
}

function draw (){
  background(255);
  frameRate(framesSlider.value());

  if(mouseIsPressed && mouseX < cols*cellSize && mouseX > 0 && mouseY < rows*cellSize && mouseY > 0){
    if(mouseButton == LEFT){
      activeBoard[roundToCellSize(mouseY)/cellSize][roundToCellSize(mouseX)/cellSize] = 1;
    }
    if(mouseButton == RIGHT){
      activeBoard[roundToCellSize(mouseY)/cellSize][roundToCellSize(mouseX)/cellSize] = 0;
    }
  }
  showBoard(activeBoard);
  // if k is pressed, Toggle between run and stop
  if(run == 1){
    if(activeBoard == board1){
      boardUpdate(board1,board2);
      activeBoard = board2;
    } else {
      boardUpdate(board2,board1);
      activeBoard = board1;
    }
  }
  fill(0);
  textSize(cellSize);
  text('Generation: ' + generation, roundToCellSize(cellSize), rows*cellSize + cellSize*1.5 );
  text('Frames: ' + framesSlider.value(), roundToCellSize(cellSize*cols*0.800), rows*cellSize + cellSize*1.5)
  text('Rulestring: ' + Rulestring,roundToCellSize(cellSize * cols * 0.5),rows*cellSize + cellSize*1.5);

}

function keyTyped(){

  if(activeBoard == board1){
    boardUpdate(board1,board2);
    activeBoard = board2;
  } else {
    boardUpdate(board2,board1);
    activeBoard = board1;
  }

}

function keyPressed() {
  // if k is pressed, Toggle between run and stop
  if(keyCode == 75){
    run = -run;
  }
  // 'R' to reset
  if(keyCode == 82){
    restart();
  }
  // 'L' to print out boardState
  if(keyCode == 76){
    var readOut = [[cols,rows],activeBoard];
    console.log(JSON.stringify(readOut));
  }

}
