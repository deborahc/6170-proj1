(function () {
	// define some colors
    var darkOrange = "#FF8C00";
    var white = "#FFFFFF";

	// default size of board
	var NUM_ROWS = 9;
	var NUM_COLUMNS = 9;
	var BLOCK_SIZE = 50;

	// initial Conway's Game of Life configurations - for debugging
	var toad = [Coord(4,5), Coord(5,5), Coord(6,5), Coord(5,4), Coord(6,4), Coord(7,4)];
	var blinker = [Coord(4,5), Coord(5,5), Coord(6,5)];
	var beacon = [Coord(5,5), Coord(5,6), Coord(4,5), Coord(4,6), Coord(2,4), Coord(2,3), Coord(3,4), Coord(3,3)];
	// list of Coords used by game to determine which cells are alive to start with 
	var initialConfig = [];
	// Prefix for each div that represents a square
	var divPrefix = 'Square';
	// initialize timer id
	var timerId = 0;
	// dictionary that has key: divID and value: Coord(i,j) representing where that square is on the Board object
	var divToCoordDict = {};

	// simple assert function
	var assert = function(predicted, msg){
		if (!predicted){
			throw ('Assertion failure: ' + msg);
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

	// function that takes a Board and renders it on the canvas
	var renderBoard = function(board){
		applyAll(board, renderCell);
	}

	// function to draw each cell on board
	var renderCell = function(board, coord){
		// check that given coordinate is within bounds of board
		assert (coord.y >= 0 && coord.y < NUM_COLUMNS, 'Input y coordinate ' + coord.y + ' is out of bounds!');
		assert (coord.x >= 0 && coord.x < NUM_ROWS, 'Input x coordinate ' + coord.x + ' is out of bounds!');
		if (board.getCell(coord).isAlive()){
			colorAndSetLive(coord);
		}
		else{
			colorAndSetDead(coord);
		}
	}

	// function to create a grid of DIV elements
	// adapted from http://jsfiddle.net/yijiang/nsYyc/1/
	var createGrid = function(blockSize, gridWidth, gridHeight) {
   	    var parent = $('<div />', {
	        class: 'grid', 
	        width: gridWidth * blockSize, 
	        height: gridHeight * blockSize,
	        className: 'squares'
	    }).addClass('grid').appendTo('body');

		for (var i = 0; i < gridWidth; i++) {
		    for (var j = 0; j < gridHeight; j++) {
		    	var squareId = divPrefix+i+'_'+j;
				var square = $('<div />', {
	    			id: squareId,
	    			className: 'dead',	
	    			width: blockSize - 5, 
	    			height: blockSize - 5
	    		});
				square.appendTo(parent);
				// store corresponding Coord object that maps where this grid is on Board object
				divToCoordDict[squareId] = Coord(i,j);
		    }
		}
		setClickHandlers();
	}

	// function that sets handlers on each square div to toggle between alive and dead
	var setClickHandlers = function(){
		$('div').each(function(){
			$(this).click((function(div) {
                return function() {
                	if ($(this).attr('className')=='dead'){
                		colorAndSetLive(divToCoordDict[$(this).attr('id')]);
              		}

              		else {
              			if ($(this).attr('className')=='alive'){
              			colorAndSetDead(divToCoordDict[$(this).attr('id')]);
              		}
                }
          	}
        })($(this)));
		});
	}

	// function to render board and advance generation of all cells on board
	// takes in Board object
	var playGameOfLife = function(board){
		renderBoard(board);
		board.advanceGeneration();
	}

	// function that takes in Coord object, colors and displays corresponding div on Grid to be alive
	var colorAndSetLive = function(coord){
		var divId = "#"+divPrefix+coord.x+'_'+coord.y;
		// console.log(coord);
		$(divId).css('background-color', darkOrange);
		$(divId).attr('className', 'alive');
	}

	// function that takes in Coord object, colors and displays corresponding div on Grid to be dead
	var colorAndSetDead = function(coord){
		var divId = "#"+divPrefix+coord.x+'_'+coord.y;
		$(divId).css('background-color', white);
		$(divId).attr('className', 'dead');
	}

	// function to start Game of Life 
	var startGame = function(){
		// taken as input from user
		var speed = $("#speedButton").val();
		console.log(speed);

		// need to reset config after game is stopped
		initialConfig = [];
		$('div').each(function(){
			// save all live boxes user has toggled 
			if ($(this).attr('className') == 'alive'){
				squareCoord = divToCoordDict[$(this).attr('id')];
				initialConfig.push(squareCoord);
			}

		});
		board.initializeEmptyBoard(initialConfig);
		timerId = setInterval(function(){playGameOfLife(board)}, 1000*speed);
	} 

	// function to stop game by
	var stopGame = function(){
		clearInterval(timerId);
	}

	// links start button to startGame function
    $('#startButton').click(function(){
       startGame();
    });

    // links stop button to stopGame function
    $('#stopButton').click(function(){
       stopGame();
    });

	// Create empty grid 
	var board = Board(NUM_ROWS,NUM_COLUMNS);
	createGrid(BLOCK_SIZE, NUM_ROWS,NUM_COLUMNS);

}) ()

