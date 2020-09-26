const Matrix = require(`./Matrix`)
const _ = require(`lodash`)

class GoldRush {
    constructor(rowDimensions, colDimensions) {
        this.goldRush = new Matrix(rowDimensions, colDimensions),
        this.rowNum = rowDimensions,
        this.colNum = colDimensions,
        this.player,
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

    movePlayer = function (playerNumber, direction) {
        this.player = this.goldRush.findCoordinate(playerNumber)

        if(this.isAvailableStep(this.player.x, this.player.y, direction)){
            switch (direction) {
                case 'up':
                    this.player.y--
                    this.goldRush.alter(this.player.x, this.player.y, playerNumber)
                    this.goldRush.alter(this.player.x, this.player.y + 1, ".")
                    break
                case 'down':
                    this.player.y++
                    this.goldRush.alter(this.player.x, this.player.y, playerNumber)
                    this.goldRush.alter(this.player.x, this.player.y - 1, ".")
                    break
                case 'left':
                    this.player.x--
                    this.goldRush.alter(this.player.x, this.player.y, playerNumber)
                    this.goldRush.alter(this.player.x + 1, this.player.y, ".")
                    break
                case 'right':
                    this.player.x++
                    this.goldRush.alter(this.player.x, this.player.y, playerNumber)
                    this.goldRush.alter(this.player.x - 1, this.player.y, ".")
                    break
                default:
                    console.log(`Sorry, we are out of ${expr}.`)
            }
        }

        if(this.collectCoin()){
            this.incrementScore(playerNumber)
        }
        this.checkVictory()
    }

    placeCoins = function () {
        let counter = 0
        while (counter !=15 /*Math.floor(this.rowNum*this.colNum/4)*/) {
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

    collectCoin = function () {
        let isExist = _.find(this.coinCoords, {x: this.player.x, y: this.player.y})
        console.log(isExist)
        console.log({x: this.player.x, y: this.player.y})
        if (isExist) {
            let coinIndex = _.findIndex(this.coinCoords, {x: this.player.x, y: this.player.y})
            console.log(coinIndex)
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
        if (this.coinCoords.length<6) {
            let bool = this.score.secondPlayer > this.score.firstPlayer
            let winner = bool ? 2 : 1
            console.log(`player ${winner} wins with score: ${this.score.firstPlayer}-${this.score.secondPlayer}`)
            return true
        }
    }
}

module.exports = GoldRush