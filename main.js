const board = new GoldRush()
board.print() //the print method should be defined inside of Matrix
//prints
// 1       .       .       .       .
// .       .       .       .       .
// .       .       .       .       .
// .       .       .       .       .
// .       .       .       .       2

board.movePlayer(1, "down") //this method should be defined inside of GoldRush
board.print()
//prints
// .       .       .       .       .
// 1       .       .       .       .
// .       .       .       .       .
// .       .       .       .       .
// .       .       .       .       2

board.movePlayer(2, "left")
board.print()
//prints
// .       .       .       .       .
// 1       .       .       .       .
// .       .       .       .       .
// .       .       .       .       .
// .       .       .       2       .
