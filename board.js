var Board = function(rows, columns){
	var that = {};
	// board will be a double array that holds a Cell object at each board[i][j] location
	var board = [];

	// helper function that applies a task function to each coordinate (cell) on the board
	var applyAll = function(task){
		for (var i=0; i<rows; i++){
			for (var j=0; j<columns; j++){
				task(Coord(i,j));
			}
		}
	}

	// simple assert function
	var assert = function(predicted, msg){
		if (!predicted){
			throw ("Assertion failure: " + msg);
		}
	}

	// function that initializes a double array that represents a board, with a Cell object at each location, populates 
	// the neighbors array of each Cell, and sets an initial configuration of cells to be alive
	// takes in a config, a list of Coord objects that define which cells should be set to live in the beginning
	that.initializeEmptyBoard = function(config){
		for (var i=0; i<rows; i++){
			board[i] = [];
			for (var j=0; j<columns; j++){
				board[i][j] = Cell(false);
			}
		}
		applyAll(determineCellNeighbors);
		setInitialConfig(config);
	}

	// helper function that takes in a list of Coords, and sets the Cells at those locations to alive
	var setInitialConfig = function(coords){
		for (i=0; i<coords.length; i++){
			// check to make sure coordinates are within bounds of board
			assert(withinBounds(coords[i]), "Input coord " + coords[i].x + "," + coords[i].y + " is out of bounds!");
			// assert (coords[i].y >= 0 && coords[i].y < columns, "Input y coordinate " + coords[i].y + " is out of bounds!");
			// assert (coords[i].x >= 0 && coords[i].x < rows, "Input x coordinate " + coords[i].x + " is out of bounds!");
			var cell = that.getCell(coords[i]);
			cell.setCurrentState(true);
		}
	}

	// helper function that determines the neighbors of a Cell and populates its neighbors array with their Coords
	var determineCellNeighbors = function(coord){
		for (var x=-1; x<2; x++){
			for (var y =-1; y<2; y++){
				if (!(x==0 && y==0) && withinBounds(Coord(x+coord.x, y+coord.y))){
					that.getCell(coord).getNeighbors().push(Coord(x+coord.x, y+coord.y));
				}
			}
		}
	}

	// function that takes in a Coord of a Cell and returns the number of living neighbors it has
	that.countLivingNeighbors = function(coord){
		var currentCell = that.getCell(coord);
		var neighbors = currentCell.getNeighbors();
		var numLivingNeighbors = 0;
		for (i=0; i<neighbors.length; i++){
			var neighborCoord = neighbors[i];
			var neighborStatus = that.getCell(neighborCoord).isAlive();
			if (neighborStatus == true){
				numLivingNeighbors += 1;
			}
		}
		return numLivingNeighbors;
	}

	// function that applies Game of Life rules to each Cell to determine if it will be alive or dead in the next generation
	// propagates these updates to each Cell's status
	that.advanceGeneration = function(){
		applyAll(determineCellFate);
		applyAll(updateCellStatus);
	}

	// function that applies Game of Life rules to a Cell located at Coord to determine if it will be alive or dead in the next generation
	// stores the pending status in the Cell's nextState property

	var determineCellFate = function(coord){
		var currentCell = that.getCell(coord);
		var currentCellState = currentCell.isAlive();
		var livingNeighbors = that.countLivingNeighbors(coord);
		// Rules from http://en.wikipedia.org/wiki/Conway%27s_game_of_life
		if (currentCellState === true){
			if (livingNeighbors === 2 || livingNeighbors === 3){
				currentCell.setNextState(true); // stay alive
			}
			else{
				currentCell.setNextState(false); // cell dies
			}
		}
		else{

			if (livingNeighbors === 3 ){
				currentCell.setNextState(true);
			}

		}
	}

	// function to update a cell's current state to its pending nextState status
	var updateCellStatus = function(coord){
		var currentCell = that.getCell(coord);	
		if (currentCell.getNextState() !== undefined){
			currentCell.updateCurrentState();
			currentCell.setNextState(undefined);
		}
	}

	// helper function to check if given coordinate is within bounds of the board
	var withinBounds = function(coord){
		return (coord.x >=0) && (coord.x < rows) && (coord.y >=0 ) && (coord.y<columns);
	}

	// function to return a Cell at a specified Coord
	that.getCell = function(coord){
		return board[coord.x][coord.y];
	}

	that.getBoard= function(){
		return board;
	}

return that;
};

