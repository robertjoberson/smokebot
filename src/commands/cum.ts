import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as db from "quick.db";

const Attachment = require('discord.js');
const Canvas = require('canvas');

async function cumFunc(msgObject, cumIm, ranP, picToCum){

        
    const canvas = Canvas.createCanvas(200, 200);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage(picToCum);
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(cumIm[ranP]);
    ctx.drawImage(avatar, 25, 25, 200, 200);
    
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'cum-image.png');

    msgObject.channel.send(`you just got CUMMED on BITCH, ${msgObject.mentions.members.first()} !!!`, attachment);
    db.push(`${msgObject.author.id}.items`, `cum-counter`);
    return;


}


export default class cum implements IBotCommand {

    private readonly _command = "cum"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {


        var cumIm = new Array(5);

        cumIm = [`https://cdn.discordapp.com/attachments/609378055441612819/619049148062367773/cum-splatter-png-2.png`, 
        `https://cdn.discordapp.com/attachments/609378055441612819/626884316215115807/fake-cum-png-5-png-image-cum-transparent-background-369_312.png`,
         `https://cdn.discordapp.com/attachments/609378055441612819/626884331322998788/cum-splatter-png-2-300x200.png`];

        let ranP = (Math.floor(Math.random() * 3));

        let member = msgObject.mentions.members.first();

        let picToCum;

        if(msgObject.mentions.users.size > 0) {

            picToCum = (member.user.displayAvatarURL);

            cumFunc(msgObject, cumIm, ranP, picToCum)

            return;

        }

        if (msgObject.attachments.size > 0){

            function attachIsImage(msgAttach) {
                var url = msgAttach.url;
                //True if this url is a png image.
                return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
            }

            if (msgObject.attachments.every(attachIsImage)){
                picToCum = msgObject.attachments.every(attachIsImage);
            }

            cumFunc(msgObject, cumIm, ranP, picToCum)

            return;

        }

        else{
            msgObject.channel.send("mention someone or attach something first nigga !");
            return;
        }

    }


}