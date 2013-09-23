(function () {
	// define some colors
	var dodgerBlue = Color(30,144,255);
	var darkOrange = Color(255,140,0);
    
	// create the drawing pad object and associate with the canvas
	pad = Pad(document.getElementById('canvas'));
	pad.clear();
    
	// set constants to be able to scale to any canvas size
	var MAX_X = 100;
	var MAX_Y = 100;
	var x_factor = pad.get_width() / MAX_X;
	var y_factor = pad.get_height() / MAX_Y;
  
	// draw some circles and squares inside
	var RADIUS = 5;
	var LINE_WIDTH = 2;

	// default size of board
	var BORDER_WIDTH = 10;
	var NUM_ROWS = 9;
	var NUM_COLUMNS = 9;
	var SCALE_FACTOR = 10;

	// initial Conway's Game of Life configurations 
	var toad = [Coord(4,5), Coord(5,5), Coord(6,5), Coord(5,4), Coord(6,4), Coord(7,4)];
	var blinker = [Coord(4,5), Coord(5,5), Coord(6,5)];
	var beacon = [Coord(5,5), Coord(5,6), Coord(4,5), Coord(4,6), Coord(2,4), Coord(2,3), Coord(3,4), Coord(3,3)];

	// simple assert function
	var assert = function(predicted, msg){
		if (!predicted){
			throw ("Assertion failure: " + msg);
		}
	}

	// function that applies a task function to every cell on the board
	var applyAll = function(board, task){
		for (var i=0; i<NUM_ROWS; i++){
			for (var j=0; j<NUM_COLUMNS; j++){
				task(board, Coord(i,j));
			}
		}
	}

	// function to scale coordinate index from Board coordinate to canvas coordinate
	var scaleCoord = function(index){
		return (index +1) * SCALE_FACTOR;
	}

	// function that takes a Board and renders it on the canvas
	// draws border and all cells
	var renderBoard = function(board){
		pad.clear();
		// draw boarder 
		pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), BORDER_WIDTH, darkOrange);
		applyAll(board, renderCell);
	}

	// function to draw each cell on board
	// takes in a coordinate on a board and draws circle if cell is alive, and square otherwise
	var renderCell = function(board, coord){
		// check that given coordinate is within bounds of board
		assert (coord.y >= 0 && coord.y < NUM_COLUMNS, "Input y coordinate " + coord.y + " is out of bounds!");
		assert (coord.x >= 0 && coord.x < NUM_ROWS, "Input x coordinate " + coord.x + " is out of bounds!");

		if (board.getCell(coord).isAlive()){
			pad.draw_circle(Coord(scaleCoord(coord.x)*x_factor, scaleCoord(coord.y)*y_factor),
				RADIUS, LINE_WIDTH, darkOrange, darkOrange);
		}
		else{
			pad.draw_rectangle(Coord(scaleCoord(coord.x)*x_factor-RADIUS, scaleCoord(coord.y)*y_factor-RADIUS),
				RADIUS*2, RADIUS*2, LINE_WIDTH, dodgerBlue);
		}
	}

	// function to render board and advance generation of all cells on board
	// takes in Board object
	var playGameOfLife = function(board){
		renderBoard(board);
		board.advanceGeneration();
	}

	// Main 
	var board = Board(NUM_ROWS,NUM_COLUMNS);
	board.initializeEmptyBoard(toad);
	setInterval(function(){playGameOfLife(board)}, 1000);

}) ()

