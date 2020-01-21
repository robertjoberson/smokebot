import * as Discord from "discord.js";
import { IBotCommand } from "../api";
var request = require('request');




export default class trade implements IBotCommand {

    private readonly _command = "trade"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let tke;

        if (args.length < 2) {

            msgObject.channel.send("Enter a coin followed by a currency, nigga !!");

            return;

        }

        if (args.length == 3) {

            var coin = args[0];
            var currency = args[1];
            var curCommand = args[2]

        }

        else {

            var coin = args[0];
            var currency = args[1];

        }

        if(currency == tke){

        }




        request({ url: `https://api.cryptonator.com/api/ticker/${coin}-${currency}` }, function (err, res, body) {

            var value = '';
            var string2 = JSON.parse(body);


            if (err) {
                throw err;
            }

                let linkEmbed = new Discord.RichEmbed()
                    .setTitle(`LINK WATCH`)
                    .setColor([255, 192, 203])
                    .addField(`Current Price of: ${coin} in: ${currency}`, `$${string2.ticker.price}`)
                    .addField(`Past hour price change`, `${string2.ticker.change}`)
                    .addField(`24hr Volume`, `${string2.ticker.volume}`)
                    .setImage("https://cdn.discordapp.com/attachments/609378055441612819/618536367005106176/download.png")
                    .setFooter("")

                msgObject.channel.send(linkEmbed)

        });




    }


}