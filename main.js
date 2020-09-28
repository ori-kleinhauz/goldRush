const board = new GoldRush(5, 5)
const renderer = new Renderer()

board.loadBoard()
board.placeCoins()
renderer.renderBoard(board)

//let t = 0
//while (true) {
    $(document).on('keypress', function(event) {
        console.log(event)
        if (event.which == 119) {
            console.log("1 up")
            board.movePlayer(1, "up")
        } else if (event.which == 97) {
            board.movePlayer(1, "left")
        } else if (event.which == 100) {
            board.movePlayer(1, "right")
        } else if (event.which == 115) {
            console.log("1 down")
            board.movePlayer(1, "down")
        } else if (event.which == 105) {
            board.movePlayer(2, "up")
        } else if (event.which == 106) {
            board.movePlayer(2, "left")
        } else if (event.which == 108) {
            board.movePlayer(2, "right")
        } else if (event.which == 107) {
            board.movePlayer(2, "down")
        }
        renderer.renderBoard(board)
        board.checkVictory()
    })
    //t++
//}

//renderer.renderBoard(board)

// let player = 1
// const dirs = ["up", "down", "left", "right"]
// let t = 0
// while(t < 12){
//     dir = dirs[Math.floor(Math.random() * dirs.length)]
//     board.movePlayer(player, dir)
//     console.log(`player ${player} moves ${dir}`)
//     player = (player == 1) ? 2 : 1
//     t++
//     renderer.renderBoard(board)
//     if(board.checkVictory()){break}
// }