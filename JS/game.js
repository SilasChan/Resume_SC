let  unitLength  =  40;
let  boxColor  = '#33daff'; //blue
let boxColor2 = '#8c66ff';  //purple
const  strokeColor  = 50;
let  columns; /* To be determined by window width*/
let  rows; /* To be determined by window height */
let  currentBoard;
let  nextBoard;
let  slider;
// let slider2; 


let boardState = [
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1],
    [1,0,1,1,1,1,1],
    [1,1,1,1,1,1,1]
]

let keyCoord = {x: 0, y: 0};

console.log(boardState)

   function windowResized() {
        unitLength=canvasDiv.offsetWidth/columns;
        console.log(unitLength)
        resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetWidth/4*3);
    }
const canvasDiv=document.querySelector('#canvas')

function setup(){
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(canvasDiv.offsetWidth, canvasDiv.offsetWidth/4*3);
  canvas.parent(document.querySelector('#canvas'));
  

  /*Calculate the number of columns and rows */
  columns = floor(width/ unitLength);
  rows = floor(height / unitLength);

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
      currentBoard[i] = [];
      nextBoard[i] = []
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init();  // Set the initial values of the currentBoard and nextBoard
  
    slider = createSlider(1, 10, 1);
  //slider2 = createSlider(500, 1000);
}



/**
* Initialize/reset the board state / random 
*/
function  init() {
  for (let  i  =  0; i  <  columns; i++) {
      for (let  j  =  0; j  <  rows; j++) {
        currentBoard[i][j] =  0;
        nextBoard[i][j] =  0;
      }
  }
   

}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
          // Count all living members in the Moore neighborhood(8 boxes surrounding)
          let neighbors = 0;
          for (let i of [-1, 0, 1]) {
              for (let j of [-1, 0, 1]) {
                  if( i=== 0 && j ===0 ){
                      // the cell itself is not its own neighbor
                      continue;
                  }
                  // The modulo operator is crucial for wrapping on the edge
                  neighbors += currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
              }
          }

          // Rules of Life
          if (currentBoard[x][y] == 1 && neighbors < 2) {
              // Die of Loneliness
              nextBoard[x][y] = 0;
          } else if (currentBoard[x][y] == 1 && neighbors > 3) {
              // Die of Overpopulation
              nextBoard[x][y] = 0;
          } else if (currentBoard[x][y] == 0 && neighbors == 3) {
              // New life due to Reproduction
              nextBoard[x][y] = 1;
              
          } else {
              // Stasis
              
              nextBoard[x][y] = currentBoard[x][y];
              
          }
      }
  }

  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function draw() {
    background('#ffffff');

    if(keyBoard() == false) {
        generate();
        frameRate(slider.value());
    }
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 0 && nextBoard[i][j] == 1){   
                fill(0,0,255);   
            }else if (nextBoard[i][j] == 1){
                fill(0, 255, 0)
            }else if (currentBoard[i][j] == 1 && nextBoard[i][j] == 0) {
                fill(255, 0, 0);
            }else 
                fill(0);     
            stroke(strokeColor);
            // noStroke();
            rect(i * unitLength, j * unitLength, unitLength, unitLength); 
        }
   }
    
}    
  

/**
 * When mouse is dragged
 */
function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if(mouseX > unitLength * columns || mouseY > unitLength * rows){
      return;
      console.log(mouseX)
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  fill(boxColor2);
  stroke(strokeColor)
  //noStroke()
  rect(x * unitLength, y * unitLength, unitLength, unitLength);
}

/**
* When mouse is pressed
*/
function mousePressed() {
  noLoop();
  mouseDragged();
}

/**
* When mouse is released
*/
function mouseReleased() {
  loop();
}

function keyBoard() {
    let pressed = false;

    if (keyIsPressed) {
        frameRate(10);

        console.log(keyCoord.x + " " + keyCoord.y);
        let disappearasedX = keyCoord.x;
        let disappearasedY = keyCoord.y;
        currentBoard[keyCoord.x][keyCoord.y] = 0;

        if (keyIsDown(87)) {
            fill(255, 0, 0);
            keyCoord.y = (keyCoord.y - 1 + rows) % rows;
            
            //disappearasedY = (keyCoord.y + rows) % rows;
            pressed = true;
        }
        
        if (keyIsDown(83)) {
            fill(204, 0, 255);
            keyCoord.y = (keyCoord.y + 1 + rows) % rows;
            pressed = true;
        }
        
        if (keyIsDown(65)) {
            fill(0, 0, 255);
            keyCoord.x = (keyCoord.x - 1 + columns) % columns;
            pressed = true;
        }
        
        if (keyIsDown(68)) {
            fill(153, 255, 51);
            keyCoord.x = (keyCoord.x + 1 + columns) % columns;        
            pressed = true;
        }
        
        //clear();
        currentBoard[keyCoord.x][keyCoord.y] = 1;
        ellipse(keyCoord.x * unitLength, keyCoord.y * unitLength, unitLength, unitLength);
    }

    return pressed;
}

function keyReleased() {
    loop();
}

document.querySelector('.reset-game')
    .addEventListener('click',function(){
            for (let  i  =  0; i  <  columns; i++) {
                for (let  j  =  0; j  <  rows; j++) {
                    currentBoard[i][j] =  0;
                    nextBoard[i][j] =  0;
                }
            }
        }  
    );
document.querySelector('.resume').addEventListener('Click', function() {
    loop()
})

document.querySelector('.stop').addEventListener('click', function(){
    noLoop()
});



document.querySelector('.randoms').addEventListener('click', function() {
        for (let  i  =  0; i  <  columns; i++) {
            for (let  j  =  0; j  <  rows; j++) {
                currentBoard[i][j] = random() > 0.8? 1: 0; 
                  nextBoard[i][j] = 0;
            }
        }
})

document.querySelector('.pattern').addEventListener('click', function() {
    for (let  i  =  0; i  <  columns; i++) {
        for (let  j  =  0; j  <  rows; j++) {
            if (currentBoard[i][j] == 0 && nextBoard[i][j] == 1){   
                fill(0,0,255);   
            }else if (nextBoard[i][j] == 1){
                fill(0)
            }else if (currentBoard[i][j] == 1 && nextBoard[i][j] == 0) {
                fill(255, 0, 0);
            }else 
                fill(255);     
                stroke(strokeColor);
                //noStroke();
                rect(i * unitLength, j * unitLength, unitLength, unitLength);
         }  
    }          
})

// doxument.querySelector('.label-color').addEventListener('click', function() {
//     alert("1234")
// })

document.querySelector('.label-color').addEventListener('click', ()=> {
    alert("1234")
})