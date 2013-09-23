// from http://stackoverflow.com/questions/237104/array-containsobj-in-javascript
var contains = function(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

test("testing setInitialConfig", function() {

	// blinker config
	var testConfig = [Coord(4,5), Coord(5,5), Coord(6,5)];
	var rows = 9;
	var cols = 9;
	var testBoard = Board(rows, cols);
	testBoard.initializeEmptyBoard(testConfig);
	var expectedBoard = [];	
	// set up expectedBoard
	for (var i=0; i<rows; i++){
		expectedBoard[i] = [];
		for (var j=0; j<cols; j++){
			if (Coord(i,j) in testConfig){
				expectedBoard[i][j] = Cell(true);
			}
			else{
				expectedBoard[i][j] = Cell(false);
			}
		}
	}
	// check correct cells are set to alive
	for (i=0; i< testConfig.length; i++){
		coord = testConfig[i];
		equal(testBoard.getCell(coord).isAlive(), true);
	}
});

test("test determineCellNeighborsMiddle", function() {

	// blinker config
	var testConfig = [Coord(4,5), Coord(5,5), Coord(6,5)];
	var rows = 9;
	var cols = 9;
	var testBoard = Board(rows, cols);
	testBoard.initializeEmptyBoard(testConfig);
	var testCoord = Coord(5,5);
	// test to find neighbors of Coord(5,5)
	var expectedNeighbors = [Coord(5,4), Coord(5,6), Coord(4,4), Coord(4,5), Coord(4,6), Coord(6,4), Coord(6,5), Coord(6,6)];
	var actualNeighbors = testBoard.getCell(testCoord).getNeighbors();

	// make sure expected and actual neighbors array have the same length
	equal(expectedNeighbors.length, actualNeighbors.length);
	for (i=0; i<actualNeighbors.length; i++){
		// check if item is in expectedNeighbors
		ok(contains(expectedNeighbors, actualNeighbors[i]) > -1);
	}
});

test("test determineCellNeighborsCorner", function() {

	// blinker config
	var testConfig = [Coord(4,5), Coord(5,5), Coord(6,5)];
	var rows = 9;
	var cols = 9;
	var testBoard = Board(rows, cols);
	testBoard.initializeEmptyBoard(testConfig);
	var testCoord = Coord(0,0);
	// test to find neighbors of Coord(0,0)
	var expectedNeighbors = [Coord(0,1), Coord(1,0), Coord(1,1)];
	var actualNeighbors = testBoard.getCell(testCoord).getNeighbors();

	// make sure expected and actual neighbors array have the same length
	equal(expectedNeighbors.length, actualNeighbors.length);
	for (i=0; i<actualNeighbors.length; i++){

		// check if item is in expectedNeighbors
		ok(contains(expectedNeighbors, actualNeighbors[i]) > -1);
	}
});

test("test determineCellNeighborsSide", function() {
	// blinker config
	var testConfig = [Coord(4,5), Coord(5,5), Coord(6,5)];
	var rows = 9;
	var cols = 9;
	var testBoard = Board(rows, cols);
	testBoard.initializeEmptyBoard(testConfig);
	var testCoord = Coord(5,0);
	// test to find neighbors of Coord(5,0)
	var expectedNeighbors = [Coord(4,0), Coord(4,1), Coord(5,1), Coord(6,0), Coord(6,1)];
	var actualNeighbors = testBoard.getCell(testCoord).getNeighbors();

	// make sure expected and actual neighbors array have the same length
	equal(expectedNeighbors.length, actualNeighbors.length);
	for (i=0; i<actualNeighbors.length; i++){
		// check if item is in expectedNeighbors
		ok(contains(expectedNeighbors, actualNeighbors[i]) > -1);
	}
});

test("test countLivingNeighbors", function() {
	// blinker config
	var testConfig = [Coord(4,5), Coord(5,5), Coord(6,5)];
	var rows = 9;
	var cols = 9;
	var testBoard = Board(rows, cols);
	testBoard.initializeEmptyBoard(testConfig);

	var testCoord = Coord(5,5);
	var expectedNumberOfLivingNeighbors = 2;
	var actualNumberOfLivingNeighbors = testBoard.countLivingNeighbors(testCoord);
	equal(expectedNumberOfLivingNeighbors, actualNumberOfLivingNeighbors);
});

test("test advanceGeneration", function() {
	// blinker config
	var testConfig = [Coord(4,5), Coord(5,5), Coord(6,5)];
	var rows = 9;
	var cols = 9;
	var testBoard = Board(rows, cols);
	testBoard.initializeEmptyBoard(testConfig);
	testBoard.advanceGeneration();

	// need to check that the config of live/dead cells is correct
	// expect Coord(5,5) to stay alive, Coord(4,5) and (Coord(6,5) to die, and Coord(4,5), Coord(6,5) to come alive
	var expectedAlive = [Coord(5,5), Coord(5,4), Coord(5,6)];

	for (i=0; i<expectedAlive.length; i++){
		equal(testBoard.getCell(expectedAlive[i]).isAlive(), true);
	}

	for (i=0; i<rows; i++){
		for (j=0; j<cols; j++){
			if (testBoard.getCell(Coord(i,j)).isAlive()){
				ok(contains(expectedAlive, Coord(i,j)) > -1);
			}
			else{
				equal(testBoard.getCell(Coord(i,j)).isAlive(), false);
			}

		}
	}
});



