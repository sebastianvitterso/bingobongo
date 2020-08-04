import { Discord, On, ArgsOf, Client } from "@typeit/discord";
import * as Path from "path";
import { Message } from 'discord.js';
import { TicTacToeManager } from '../ticTacToe/TicTacToeManager';

@Discord("🍝", {
  import: [ Path.join(__dirname, "..", "commands", "*.ts") ]
})
export class DiscordApp {
  sleep = async (ms : number) => new Promise(resolve => setTimeout(resolve, ms))

  @On("message")
  async onMessage(
    [message]: ArgsOf<"message">,
    client: Client
  ) {
    if(message.content.toLowerCase().startsWith('bingo')) {
      await this.respondWithBongo(message)
    } else if (message.content.toLowerCase().startsWith('spam')) {
      await this.spam(message)
    } else if (message.content.toLowerCase().startsWith('ttt')) {
      TicTacToeManager.handleMessage(message)
    }
  } 

  async respondWithBongo(message : Message): Promise<Message> {
    const emojis = [ '🙏','😊','😍','🐱‍👤','🏕','🐱‍👓','🐱‍🚀','✨','🐱‍🐉','👏','🙌' ]
    message.react(emojis[Math.floor(Math.random() * emojis.length)])
    const response = await message.channel.send('`BONGO!`')
    response.react('🥁')
    return response
  }

  async spam(message : Message) : Promise<void> {
    const messageCount = Math.floor(Math.random() * 10)
    const messages: Message[] = [];
    for (let i = 0; i < messageCount; i++) {
      messages.push(await message.channel.send('Ønsket noen seg litt ' + 'SPAM '.repeat(i + 1) + '?'))
      await this.sleep(100)
    }
    messages.forEach(message => message.react('🍝'))
  }
}