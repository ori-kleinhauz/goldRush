
const board = new GoldRush()
board.loadBoard()
//board.checkIfFree(3,0)
board.placeCoins()
board.print() //the print method should be defined inside of Matrix
//prints
// 1       .       .       .       .
// .       .       .       .       .
// .       .       .       .       .
// .       .       .       .       .
// .       .       .       .       2

//  board.movePlayer(1, "down") //this method should be defined inside of GoldRush
//  board.print()
//prints
// .       .       .       .       .
// 1       .       .       .       .
// .       .       .       .       .
// .       .       .       .       .
// .       .       .       .       2

//  board.movePlayer(2, "left")
//  board.print()
//prints
// .       .       .       .       .
// 1       .       .       .       .
// .       .       .       .       .
// .       .       .       .       .
// .       .       .       2       .
p = 1
dirs = ["up", "down", "left", "right"]
while(true){
    dir = dirs[Math.floor(Math.random() * dirs.length)]
    board.movePlayer(p, dir)
    console.log(`player ${p} moves ${dir}`)
    board.print()
    p = (p == 1) ? 2 : 1
    if(board.checkVictory()){break}
}

