import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class ban implements IBotCommand {

    private readonly _command = "ban"


    help(): string {
        return "bans niggas"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

   async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ") || "";
        let banLog = `${msgObject.author.username}: ${suppliedReason}`;

        msgObject.delete(5000);

        if(!msgObject.member.hasPermission("BAN_MEMBERS")){

            msgObject.channel.send(`you can't ban, BITCH, might ban you tho, ${msgObject.author.username}`);
            return;
        }

        if(!mentionedUser){
            msgObject.channel.send(`Couldn't find that nigga`);
            return;
        }


        msgObject.guild.member(mentionedUser).ban(banLog)
            .then(console.log)
            .catch(console.error)
            msgObject.channel.send(`fuck dat bitch`);

    }


}