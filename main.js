const GoldRush = require(`./GoldRush`)

const board = new GoldRush(5, 5)
board.loadBoard()
board.placeCoins()
board.print()

let player = 1
const dirs = ["up", "down", "left", "right"]
while(true){
    dir = dirs[Math.floor(Math.random() * dirs.length)]
    board.movePlayer(player, dir)
    console.log(`player ${player} moves ${dir}`)
    board.print()
    player = (player == 1) ? 2 : 1
    if(board.checkVictory()){break}
}