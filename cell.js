var Cell = function(isAlive){

	var currentState = isAlive;
	// the pending state of the cell at the next generation
	var nextState = undefined;
	var that = {};

	// returns true if Cell is alive, false otherwise
	that.isAlive = function(){
		return currentState;
	}
	// will contain Coords(x,y) of neighbors, to be populated when Board is initialized
	var neighbors = [];

	// returns array containing the Coords(x,y) of a Cell's neighbors
	that.getNeighbors = function(){
		return neighbors;
	}

	// sets current state to input boolean indicating if cell is alive or dead
	that.setCurrentState = function(isAlive){
		currentState = isAlive;
	}

	// sets the pending state of the cell at the next generation
	that.setNextState = function(isAlive){
		nextState = isAlive;
	}
	
	// returns next state of the cell
	that.getNextState = function(){
		return nextState;
	}

	// sets the current state to its pending next state
	that.updateCurrentState = function(){
		currentState = nextState;
	}
	return that;
}