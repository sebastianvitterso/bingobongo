import { Client } from "@typeit/discord";
import { TicTacToeGame, rowType, colType } from './TicTacToeGame';
import { User, Message } from 'discord.js';

class TicTacToeManager {
  static ready: boolean = false;

  private static games: TicTacToeGame[] = []

  static newGame(user: User) : TicTacToeGame {
    const game = new TicTacToeGame(user)
    TicTacToeManager.games.push(game)
    return game
  }

  static getUserGame(user: User) : TicTacToeGame {
    let game = TicTacToeManager.games.find(game => game.user.id === user.id)
    if(game == null) {
      game = TicTacToeManager.newGame(user)
    }
    return game
  }

  static handleMessage(message: Message) : void {
    if (message.content.toLowerCase() === 'ttt') {
      message.channel.send(`The following tick-tack-toe-commands are available:
        - \`ttt board\` (see the board)
        - \`ttt [TOP|MIDDLE|BOTTOM] [LEFT|MIDDLE|RIGHT]\` (place your piece on a position)
        - \`ttt reset\` (restart the game)`)
    } else if (message.content.toLowerCase().startsWith('ttt board')) {
      const game = TicTacToeManager.getUserGame(message.author)
      message.channel.send("To play: Write \`ttt [TOP|MIDDLE|BOTTOM] [LEFT|MIDDLE|RIGHT]\`" + game.getBoard())
    } else if (message.content.toLowerCase().startsWith('ttt reset')) {
      const game = TicTacToeManager.getUserGame(message.author)
      game.clear()
      message.channel.send("To play: Write \`ttt [TOP|MIDDLE|BOTTOM] [LEFT|MIDDLE|RIGHT]\`" + game.getBoard())
    } else if (/^ttt ((top)|(middle)|(bottom)) ((left)|(middle)|(right))$/i.test(message.content)) {
      const row = message.content.split(' ')[1]
      const col = message.content.split(' ')[2]
      const game = TicTacToeManager.getUserGame(message.author)
      const success = game.place(row as rowType, col as colType) // shouldn't be able to crash, eh? lets hope.
      if(success) {
        if(game.status == 'playerWon') {
          message.channel.send("You won!" + game.getBoard())
          return
        } else if (game.status == 'draw') {
          message.channel.send("Draw!" + game.getBoard())
          return
        }
        game.placeBotPiece()
        if(game.status == 'botWon') {
          message.channel.send("I won, hahahaha!" + game.getBoard())
        } else {
          message.channel.send("Nice choice!" + game.getBoard())
        }
      } else {
        message.channel.send("Hey, you can't place there!" + game.getBoard())
      }

    }
  }


}

export {TicTacToeManager};