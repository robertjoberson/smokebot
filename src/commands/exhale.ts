import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class exhale implements IBotCommand {

    private readonly _command = "exhale"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let smokeEmbed = new Discord.RichEmbed()
        .setColor([0 , 200 , 0])
        .setImage("https://cdn.discordapp.com/attachments/609378055441612819/615114916453679116/exhale.png")
        .setFooter("ah ,")

    msgObject.channel.send(smokeEmbed)

    }


}