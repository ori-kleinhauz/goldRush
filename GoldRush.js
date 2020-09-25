class GoldRush {
    constructor() {
        this.goldRush = new Matrix(5, 5),
            this.rowNum = this.goldRush.matrix.length,
            this.colNum = this.goldRush.matrix[0].length,
            this.player,
            this.score = {
                firstPlayer: 0,
                secondPlayer: 0
            }
        this.coinCoords = []
    }

    print = function () {
        this.goldRush.print()
    }

    movePlayer = function (playerNumber, direction) {
        this.player = this.goldRush.findCoordinate(playerNumber)

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
        if(this.collectCoin()){
            this.incrementScore(playerNumber)
        }
        this.checkVictory()
    }

    placeCoins = function () {
        //let availibleCoords = this.goldRush
        //availibleCoords[this.player.x].splice(this.player.y, 1)
        //let secondPlayerCoords = this.goldRush.findCoordinate(2)
        //availibleCoords[secondPlayerCoords.x].splice(secondPlayerCoords.y, 1)
        let k = 0
        while (k <= this.rowNum) {
            let randomRow = Math.floor(Math.random() * this.rowNum)
            let randomColumn = Math.floor(Math.random() * this.colNum)
            if (this.checkIfFree(randomRow, randomColumn)) {
                //availibleCoords[randomRow].splice(randomColumn, 1)
                this.goldRush.alter(randomRow, randomColumn, "c")
                this.coinCoords.push({
                    x: randomRow,
                    y: randomColumn
                })
                k++
            }
        }
    }

    checkIfFree = function (i, j) {
        return this.goldRush.matrix[i][j] == "."
    }

    checkVictory = function () {
        if (!this.coinCoords.length) {
            let p1S = this.score.firstPlayer, p2S = this.score.secondPlayer
            let bool = p2S > p1S
            let winner = bool ? 2 : 1
            console.log(`player ${winner} wins ${p1S}-${p2S}`)
            return true
        }
    }

    collectCoin = function () {
        let coinIndex = this.coinCoords.find(elem => elem = {
            x: this.player.x,
            y: this.player.y
        })
        if (coinIndex) {
            this.coinCoords.splice(coinIndex, 1)
            return true
        }
        //this.coinCoords.filter(elem => elem.x != this.player.x && elem.y != this.player.y) 
    }

    incrementScore = function (playerNumber) {
        if (playerNumber == 1){
            this.score.firstPlayer++
        }
        this.score.secondPlayer++
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
}