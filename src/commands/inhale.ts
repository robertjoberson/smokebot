import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class inhale implements IBotCommand {

    private readonly _command = "inhale"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let smokeEmbed = new Discord.RichEmbed()
        .setColor([0 , 200 , 0 ])
        .setImage("https://cdn.discordapp.com/attachments/609378055441612819/615114882328559616/smoke.png")
        .setFooter("mm ,")

    msgObject.channel.send(smokeEmbed)

    }


}