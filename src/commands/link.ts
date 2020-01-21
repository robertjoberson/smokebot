import * as Discord from "discord.js";
import {IBotCommand} from "../api";
var request = require('request');




export default class link implements IBotCommand {

    private readonly _command = "link"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

    

        
        request({url: 'https://api.cryptonator.com/api/ticker/link-usd'}, function(err, res, body) {
            
            var value = '';
            var string2 = JSON.parse(body);




        if (err) {
              throw err;
            }


 

            let linkEmbed = new Discord.RichEmbed()
            .setTitle(`LINK WATCH`)
            .setColor([255,192,203])
            .addField(`Current Price`, `$${string2.ticker.price}`)
            .addField(`Past hour price change`, `${string2.ticker.change}`)
            .addField(`24hr Volume`, `${string2.ticker.volume}`)
            .setImage("https://cdn.discordapp.com/attachments/609378055441612819/618536367005106176/download.png")
            .setFooter("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    
            msgObject.channel.send(linkEmbed)


          });



    }


}