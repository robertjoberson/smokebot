import * as Discord from "discord.js";
import { IBotCommand } from "../api";




const Attachment = require('discord.js');
const Canvas = require('canvas');

export default class pic implements IBotCommand {

    private readonly _command = "pic"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if(msgObject.mentions.users.size > 0) {

        let member = msgObject.mentions.members.first();
        
        const canvas = Canvas.createCanvas(200, 200);
        const ctx = canvas.getContext('2d');
    
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
        
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'image.png');
    
        msgObject.channel.send(attachment);
        return;

        }

        else{
            msgObject.channel.send("mention someone first nigga !");
            return;
        }

    }

}