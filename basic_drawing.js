// a demonstration program using the graphics library
(function () {
	// define some colors
	var black = Color(0,0,0);
	var red = Color(255,0,0);
	var green = Color(0,255,0);
	var blue = Color(0,0,255);

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
	var NUM_ROWS = 9;
	var NUM_COLUMNS = 9;
	var SCALE_FACTOR = 10;
	var testBoard = Board(NUM_ROWS,NUM_COLUMNS);

	testBoard.initializeEmptyBoard();
	var testCell = testBoard.getCell(Coord(5,5));

	var toad = [Coord(4,5), Coord(5,5), Coord(6,5), Coord(5,4), Coord(6,4), Coord(7,4)];
	var blinker = [Coord(4,5), Coord(5,5), Coord(6,5)];
	
	testBoard.setTestAlive(toad);


	var scaleCoord = function(index){
		return (index +1) * SCALE_FACTOR;
	}

	var applyAll = function(task){
		for (var i=0; i<NUM_ROWS; i++){
			for (var j=0; j<NUM_COLUMNS; j++){
				task(board, Coord(i,j))
			}
		}
	}

	var renderBoard = function(board){
		pad.clear();
		pad.draw_rectangle(Coord(0, 0), pad.get_width(), pad.get_height(), 10, darkOrange);

		for (var i=0; i<NUM_ROWS; i++){
			for (var j=0; j<NUM_COLUMNS; j++){
				if (board.getCell(Coord(i,j)).getState() == true){
					pad.draw_circle(Coord(scaleCoord(i)*x_factor, scaleCoord(j)*y_factor),
					RADIUS, LINE_WIDTH, darkOrange, darkOrange);
				}
				else{
				pad.draw_rectangle(Coord(scaleCoord(i)*x_factor-RADIUS, scaleCoord(j)*y_factor-RADIUS),
					RADIUS*2, RADIUS*2, LINE_WIDTH, dodgerBlue);
				}
			}
		}
	}

	var playGameOfLife = function(board){
		renderBoard(board);
		testBoard.advanceGeneration();
	}


setInterval(function(){playGameOfLife(testBoard)}, 1000);


}) ()

