var Cell = function(isAlive){

	var state = isAlive;
	var nextState = undefined;
	var that = Object.create(Cell.prototype);

	that.getState = function(){
		return state;
	}
	// will contain Coords(x,y) of neighbors, to be populated when Board is initialized
	var neighbors = [];

	that.getNeighbors = function(){
		return neighbors;
	}

	that.setState = function(isAlive){
		state = isAlive;
	}

	that.setNextState = function(isAlive){
		nextState = isAlive;
	}
	
	that.getNextState = function(){
		return nextState;
	}

	that.updateState = function(){
		state = nextState;
	}
	return that;
}