import * as Discord from "discord.js";
import { IBotCommand } from "../api";

export default class oracle implements IBotCommand {

    private readonly _command = "oracle"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {



        if (args.length < 1) {

            msgObject.channel.send("Ask something first nigga !!");
            return;
        }

        let askedQ = args.join(" ");

        let askedQT = askedQ;


        var p0 = "perhaps ,";
        var p1 = "oh ?";
        var p2 = "ah ,";
        var p3 = "yes";
        var p4 = "fym wh*te boy";
        var p5 = "I believe so";
        var p6 = "this is certain";
        var p7 = "undoubtedly";
        var p8 = "impossible";
        var p9 = "no";
        var p10 = "definite kek in my opinion";
        var p11 = "cringe...";
        var p12 = "based......";
        var p13 = "nah,,,,";


        let arRes = new Array(14); 

        arRes = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13];
        var ranP = (Math.floor(Math.random() * 11));


        let orcEmbed = new Discord.RichEmbed()
            .setColor([255, 255, 255])
            .addField(`with regards to ... ${askedQT}`, `meme magic meth baby says.. ${arRes[ranP]}`)
            .setImage("https://i.imgur.com/11RcXDC.jpg")
            .setFooter("goo goo gaga.....")

        msgObject.channel.send(orcEmbed)




    }


}