var board = {
	pixelSize : 20,
	boardState : [], // an array of all on pixels [x,y,state(1 = alive, 0 = dead)]
	widthofBoard : 50,
	heightofboard: 50,//total number of pixels that can be on the board
	topCap:6,
	bottomCap:2,
	spawnCap:3,
	checkAlive: function(xValue,yValue){
		for(i = 0;i < this.widthofBoard*this.heightofboard ; i ++){
			if (this.boardState[i][0] == xValue && this.boardState[i][1] == yValue){
				return this.boardState[i][2];
			}
		}
	},
	updateBoard : function (){
		for(i = 0;i < this.widthofBoard*this.heightofboard; i ++){
			var neighbors = 0;
			if(this.boardState[i][0] > 1 && this.boardState[i][0] < this.widthofBoard - 1 && this.boardState[i][1] > 1 && this.boardState[i][1] < this.heightofboard - 1){
				if(this.checkAlive(this.boardState[i][0] - 1,this.boardState[i][1]) == 1){
					neighbors ++;
}//left
				if(this.checkAlive(this.boardState[i][0] - 1,this.boardState[i][1]-1) == 1){
					neighbors ++;
}//top left
				if(this.checkAlive(this.boardState[i][0] - 1,this.boardState[i][1]+ 1) == 1){
					neighbors ++;
}//bottom left
				if(this.checkAlive(this.boardState[i][0],this.boardState[i][1] - 1) == 1){
					neighbors ++;
}//top center
				if(this.checkAlive(this.boardState[i][0],this.boardState[i][1] +1) == 1){
					neighbors ++;
}//bottom center
				if(this.checkAlive(this.boardState[i][0] + 1,this.boardState[i][1]) == 1){
					neighbors ++;
}//right
				if(this.checkAlive(this.boardState[i][0] + 1,this.boardState[i][1]-1) == 1){
					neighbors ++;
}// top right
				if(this.checkAlive(this.boardState[i][0] + 1,this.boardState[i][1]+1) == 1){
					neighbors ++;
}// bottom right
				if(neighbors >= this.topCap || neighbors <= this.bottomCap){
					this.boardState[i][2] = 0;
				} else if (neighbors == this.spawnCap){
					this.boardState[i][2] = 1;
				}
				fill(0);
				rect(this.boardState[i][0]*this.pixelSize,this.boardState[i][1]*this.pixelSize,this.pixelSize,this.pixelSize);
			
			}
			rect(this.boardState[i][0]*this.pixelSize,this.boardState[i][1]*this.pixelSize,this.pixelSize,this.pixelSize);
	}
}

}


function setup (){
	for(i = 0;i<board.widthofBoard * board.heightofboard;i++){
		board.boardState[i] = [i % board.widthofBoard,i / board.widthofBoard,0]; 
		console.log(board.boardState[i]);
		
	}
	createCanvas(board.widthofBoard*board.pixelSize,board.heightofboard*board.pixelSize)
}

function draw (){
	//background(0);
	board.updateBoard();
}