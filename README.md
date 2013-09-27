Project 1.1: Conway's Game of Life
=====
Overview:

The project consists of 3 files: board.js, cell.js, and gameOfLife.js. A board is represented by a double array, with a Cell in each board[x][y] location. The Board class contains all the logic of the game and a function to advance to the next generation. Each Cell contains a boolean indicating its current state, its pending next state, and a list of all its neighbors. The gameOfLife.js file 1. initializes the board, 2. calls a Board function to advance to the next generation, and 3. renders the updates in the browser. Steps 2-3 are repeated every second. 

Test cases are located in boardTest.js, under the qunit example.

Design challenges:

One major design challenge was to separate the rendering of the board from the logic of the game as much as possible. To do this, no graphics related code is in board.js. In gameOfLife.js, cells are rendered as circles (alive) or squares (dead) depending on the state of each cell in the board. Board.js is only responsible for updating these states, however, not rendering them.

Another design consideration was to create a separate Board and Cell class. I initially considered just having the Board double array contain a boolean at each location; however, since I needed to keep track of the current and pending state, this was insufficient. I could have used a tuple (current, nextState) at each location, but I thought it would be cleaner to have a separate Cell class. 

In addition, each Cell keeps a list of the coordinates of each neighbors; this way, when counting live neighbors, there is no need to iterate through the entire board and re-calculate each neighbor every time, just the 3, 5, or 8 neighbors already determined. 


======

DOM Version:



