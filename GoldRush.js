class GoldRush {
    constructor(rowDimensions, colDimensions) {
        this.goldRush = new Matrix(rowDimensions, colDimensions),
        this.rowNum = rowDimensions,
        this.colNum = colDimensions,
        this.player1 = {number:1, coords:{x:0, y:0}},
        this.player2 = {number:2, coords:{x:this.rowNum-1, y:this.colNum-1}},
        this.score = {firstPlayer: 0, secondPlayer: 0},
        this.coinCoords = []
    }

    print = function () {
        this.goldRush.print()
    }

    loadBoard = function () {
        for (let i = 0; i < this.rowNum; i++) {
            for (let j = 0; j < this.colNum; j++) {
                if (i == 0 && j == 0) {
                    this.goldRush.alter(i, j, 1)
                } else if (i == this.rowNum - 1 && j == this.colNum - 1) {
                    this.goldRush.alter(i, j, 2)
                } else {
                    this.goldRush.alter(i, j, ".")
                }
            }
        }
    }

    determinePlayer = function(playerNumber){
        let player = this.player1
        if (playerNumber === 2){
            player =  this.player2 
        }
        return player
    }

    movePlayer = function (playerNumber, direction) {
        let player = this.determinePlayer(playerNumber)
        player.coords = this.goldRush.findCoordinate(playerNumber)
        
        if(this.isAvailableStep(player.coords.x, player.coords.y, direction)){
            switch (direction) {
                case 'up':
                    player.coords.y--
                    this.goldRush.alter(player.coords.x, player.coords.y, playerNumber)
                    this.goldRush.alter(player.coords.x, player.coords.y + 1, ".")
                    break
                case 'down':
                    player.coords.y++
                    this.goldRush.alter(player.coords.x, player.coords.y, playerNumber)
                    this.goldRush.alter(player.coords.x, player.coords.y - 1, ".")
                    break
                case 'left':
                    player.coords.x--
                    this.goldRush.alter(player.coords.x, player.coords.y, playerNumber)
                    this.goldRush.alter(player.coords.x + 1, player.coords.y, ".")
                    break
                case 'right':
                    player.coords.x++
                    this.goldRush.alter(player.coords.x, player.coords.y, playerNumber)
                    this.goldRush.alter(player.coords.x - 1, player.coords.y, ".")
                    break
                default:
                    console.log(`Sorry, we are out of ${direction}.`)
            }
        }

        if(this.collectCoin(playerNumber)){
            this.incrementScore(playerNumber)
        }
        this.checkVictory()
    }

    placeCoins = function () {
        let counter = 0
        while (counter != Math.floor(this.rowNum*this.colNum/4)) {
            let randomRow = Math.floor(Math.random() * this.rowNum)
            let randomColumn = Math.floor(Math.random() * this.colNum)
            if (this.checkIfFree(randomRow, randomColumn)) {
                this.goldRush.alter(randomRow, randomColumn, "c")
                this.coinCoords.push({x: randomRow, y: randomColumn})
                counter++
            }
        }
    }

    checkIfFree = function (i, j) {
        return this.goldRush.matrix[j][i] == "."
    }

    collectCoin = function (playerNumber) {
        let player = this.determinePlayer(playerNumber)
        let isExist = this.coinCoords.find(elem => elem.x==player.coords.x && elem.y==player.coords.y)
        if (isExist) {
            let coinIndex = this.coinCoords.findIndex(elem => elem.x==player.coords.x && elem.y==player.coords.y)
            this.coinCoords.splice(coinIndex, 1)
            return true
        }
        return false
    }

    isAvailableStep = function(x, y, dir){
        return !((dir=="up"&&y==0) || (dir=="down"&&y==this.colNum-1) || (dir=="left"&&x==0) || (dir=="right"&&x==this.rowNum-1))
    }

    incrementScore = function (playerNumber) {
        if (playerNumber === 1){
            this.score.firstPlayer += 10
        } else {
            this.score.secondPlayer += 10
        }
    }

    checkVictory = function () {
        if (!this.coinCoords.length) {
            let bool = this.score.secondPlayer > this.score.firstPlayer
            let winner = bool ? 2 : 1
            console.log(`player ${winner} wins with score: ${this.score.firstPlayer}-${this.score.secondPlayer}`)
            return true
        }
    }
}
