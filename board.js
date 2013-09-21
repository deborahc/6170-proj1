	var Board = function(rows, columns, config){
		var that = Object.create(Board.prototype);
		var board = [];

		that.initializeEmptyBoard = function(){
			for (var i=0; i<rows; i++){
				board[i] = [];
				for (var j=0; j<columns; j++){
					board[i][j] = Cell(false);
				}
			}

			determineCellNeighbors();
		}

		var withinBounds = function(coord){
			return (coord.x >=0) && (coord.x < rows) && (coord.y >=0 ) && (coord.y<columns);
		}

		var determineCellNeighbors = function(){
			for (var i=0; i<rows; i++){
				for (var j=0; j<columns; j++){
					for (var x=-1; x<2; x++){
						for (var y =-1; y<2; y++){
							if (!(x==0 && y==0) && withinBounds(Coord(i+x, j+y))){
								board[i][j].getNeighbors().push(Coord(i+x, j+y))
							}
						}
					}
				}
			}
		}

		that.getCell = function(coord){
			return board[coord.x][coord.y];
		}


		that.getBoard = function(){
			return board;
		}

		that.getDimensions = function(){
		// coordinate of last element in grid 
		return Coord(rows, columns);
	}


	that.countLivingNeighbors = function(coord){

		var currentCell = that.getCell(coord);
		var neighbors = currentCell.getNeighbors();
		var livingNeighbors = 0;
		for (i=0; i<neighbors.length; i++){
			var neighborCoord = neighbors[i];
			var neighborStatus = that.getCell(neighborCoord).getState();
			if (neighborStatus == true){
				livingNeighbors += 1;
			}
		}

		return livingNeighbors;
	}

	that.setTestAlive = function(coords){
		for (i=0; i<coords.length; i++){
			var cell = that.getCell(coords[i]);
			cell.setState(true);
		}
	}

	that.advanceGeneration = function(){

		for (var i=0; i<rows; i++){
			for (var j=0; j<columns; j++){

				var currentCell = that.getCell(Coord(i,j));		

				var currentCellState = currentCell.getState();
				var livingNeighbors = that.countLivingNeighbors(Coord(i,j));

				if (currentCellState === true){
					console.log('here');

					if (livingNeighbors === 2 || livingNeighbors === 3){
						currentCell.setNextState(true); // stay alive
					}
					else{
						currentCell.setNextState(false);
					}
				}

				else{
					if (livingNeighbors === 3 ){
						currentCell.setNextState(true);
					}

				}
			}
		}
		updateCells();
	}

	var updateCells = function(){
		for (var i=0; i<rows; i++){
			for (var j=0; j<columns; j++){

				var currentCell = that.getCell(Coord(i,j));	
				if (currentCell.getNextState() !== undefined){
					currentCell.updateState();
					currentCell.setNextState(undefined);
				}

			}
		}

	}
	return that;
};

