import { User } from "discord.js";

type rowType = 'top' | 'middle' | 'bottom'
type colType = 'left'| 'middle' | 'right'
type placeableType = 'x' | 'o' | ' '
type gameStatus = 'draw' | 'playerWon' | 'botWon' | 'na'

class TicTacToeGame {
  user: User
  /** Can only be ' ', 'x' or 'o' */
  board: placeableType[] = [ 
    ' ', ' ', ' ',
    ' ', ' ', ' ',
    ' ', ' ', ' ',
  ]
  status: gameStatus = 'na'

  constructor(user: User) {
    this.user = user
  }

  areEqual(values: placeableType[]) {
    for(let i = 1; i < values.length; i++) {
      if(values[i] === ' ' || values[i] !== values[i - 1]) {
        return false
      }
    }
    return true
  }

  checkRow(row: number): gameStatus {
    if(this.areEqual(this.board.slice(3*row, 3 + (3 * row)))) {
      return this.board[3*row] === 'o' ? "playerWon" : this.board[3*row] === 'x' ? "botWon" : "na"
    }
    return 'na'
  }

  checkCol(col: number): gameStatus {
    if(this.areEqual(this.board.filter((val, index) => index % 3 === col))) {
      return this.board[col] === 'o' ? "playerWon" : this.board[col] === 'x' ? "botWon" : "na"
    }
    return 'na'
  }

  checkDiagonals() : gameStatus {
    if(this.areEqual(this.board.filter((val, index) => [0, 4, 8].includes(index)))) {
      return this.board[0] === 'o' ? "playerWon" : this.board[0] === 'x' ? "botWon" : "na"
    }
    if(this.areEqual(this.board.filter((val, index) => [2, 4, 6].includes(index)))) {
      return this.board[2] === 'o' ? "playerWon" : this.board[2] === 'x' ? "botWon" : "na"
    }
    return 'na'
  }

  checkGameStatus(): gameStatus {
    const resRow0 = this.checkRow(0)
    if(resRow0 == 'playerWon' || resRow0 == 'botWon') return resRow0
    const resRow1 = this.checkRow(1)
    if(resRow1 == 'playerWon' || resRow1 == 'botWon') return resRow1
    const resRow2 = this.checkRow(2)
    if(resRow2 == 'playerWon' || resRow2 == 'botWon') return resRow2
    
    const resCol0 = this.checkCol(0)
    if(resCol0 == 'playerWon' || resCol0 == 'botWon') return resCol0
    const resCol1 = this.checkCol(1)
    if(resCol1 == 'playerWon' || resCol1 == 'botWon') return resCol1
    const resCol2 = this.checkCol(2)
    if(resCol2 == 'playerWon' || resCol2 == 'botWon') return resCol2

    const resDiag = this.checkDiagonals()
    if(resDiag == 'playerWon' || resDiag == 'botWon') return resDiag

    if(this.board.every(val => val !== ' ')) {
      return 'draw'
    }
    return 'na'
  }

  getEmoji(symbol: ' ' | 'x' | 'o') {
    return {
      ' ': ':white_large_square:',
      'x': ':negative_squared_cross_mark:',
      'o': ':regional_indicator_o:',
    }[symbol]
  }

  getBoard(): string {
    return `
${this.getEmoji(this.board[0])}${this.getEmoji(this.board[1])}${this.getEmoji(this.board[2])}
${this.getEmoji(this.board[3])}${this.getEmoji(this.board[4])}${this.getEmoji(this.board[5])}
${this.getEmoji(this.board[6])}${this.getEmoji(this.board[7])}${this.getEmoji(this.board[8])} `
  }

  place(row: rowType, col: colType): boolean {
    const rowNum = ['top', 'middle', 'bottom'].indexOf(row.toLowerCase())
    const colNum = ['left', 'middle', 'right'].indexOf(col.toLowerCase())
    const boardNum = 3*rowNum + colNum
    if(this.board[boardNum] !== ' ') {
      console.log(`YOU TRIED TO PLACE AT ${row} (${rowNum}), ${col} (${colNum}), in boardNum ${boardNum}. In that spot was '${this.board[boardNum]}'`)
      return false
    }
    this.board[boardNum] = 'o'
    this.status = this.checkGameStatus()
    return true
  }

  placeBotPiece() : boolean {
    const blanks: number[] = []
    this.board.forEach((value, index) => {
      if(value === ' ') {
        blanks.push(index)
      }
    })
    if(blanks.length <= 0) {
      return false
    }
    const boardIndex = blanks[Math.floor(Math.random() * blanks.length)] // random from the blanks
    this.board[boardIndex] = 'x'
    this.status = this.checkGameStatus()
    return true
  }

  clear(): void {
    this.board = [ 
      ' ', ' ', ' ',
      ' ', ' ', ' ',
      ' ', ' ', ' ',
    ]
  }
}

export { TicTacToeGame, rowType, colType }