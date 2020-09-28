class Renderer {
    constructor() {}

    renderBoard = function (matrix) {
        let mat = matrix.goldRush.matrix
        let rows = matrix.rowNum
        let columns = matrix.colNum
        let coins = matrix.coinCoords
        let player1 = matrix.player1
        let player2 = matrix.player2
        let score = matrix.score

        // console.log(mat)
        // console.log(coins)
        // console.log(player1)
        // console.log(player2)

        $("#main-container").empty()

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let newHTML = `<div id="box"></div>`

                if (i == player1.coords.y && j == player1.coords.x) {
                    newHTML = `<div id="box"><img src="player66.PNG" alt="player1"></div>`
                } else if (i == player2.coords.y && j == player2.coords.x) {
                    newHTML = `<div id="box"><img src="player22.PNG" alt="player2"></div>`
                } else if (coins.find(elem => elem.x == j && elem.y == i)) {
                     //newHTML = `<img src="cub.gif" alt="cub" width="60" height="60">`
                    newHTML = `<div id="box"><iframe src="https://giphy.com/embed/WT9wi81vtEhqt17SE4" width="80" height="80" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Cryply-money-cryptocurrency-coin-WT9wi81vtEhqt17SE4"></a></p></div>`
                }

                $('#main-container').append(newHTML)
            }
        }
        this.renderScores(score)
    }

    renderScores = function (score) {
        $("#scores").empty()
        const source = $("#scores-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template(score)
        $('#scores').append(newHTML)
    }
}
