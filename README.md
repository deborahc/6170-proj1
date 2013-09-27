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

Project 1.2: Conway's Game of Life - DOM version
=====

Overview:

The Board and Cell data structure are unchanged from the previous implementation. This was made possible by the isolation enforced between the data structures/logic of the game, and the graphical rendering. 

However, the cells in the Game of Life are not implemented using the DOM. The board displayed in the browser is a Grid, and each of its cells is a div. Cells are rendered as alive or dead by changing their color. 

My extra feature was to allow the user to enter the speed at which the generations advanced, i.e. seconds before generation advance. 

Design challenges:

One major challenge was to find a way to relate the DOM grid and the Board data structure that performed the logic of the game. To do this, I gave each div a "divID_i_j" id that contained coordinate information, and used a dictionary with key: divId, value: Coord(i,j), the corresponding cell on the Board. This dictionary is used to collect all the list of cells the user has set to live and pass them into the Board class as its initial configuration. 

Another challenge was to decide how to render cells as alive or dead on the DOM grid. To do this, I toggled the className of each cell between "alive" and "dead," and accessed all the divs using jquery. Graphically, being alive or dead meant a change in color, implemented by changing the css color attribute. 

Finally, one design decision dealt with which edge cases with the user interaction to support. For example, in this implementation, a user cannot add cells to the grid while the game is being played. Though I agree that this would be a nice feature, the implementation was simpler when I decided not to handle this behavrio. However, I did handle the case that the user could add more cells after stopping a game, as the game state is saved after every stop. 

