import { Command, CommandMessage } from "@typeit/discord"

export abstract class Dumming {
  @Command('dumming')
  onCommand(command : CommandMessage) {
    command.react('👺')
    command.channel.send('DET ER IKKE LOV Å SI!')
  }
}

