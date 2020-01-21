import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class kick implements IBotCommand {

    private readonly _command = "kick"


    help(): string {
        return "kicks niggas"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let mentionedUser = msgObject.mentions.users.first();
        let suppliedReason = args.slice(1).join(" ") || "";
        let kickLog = `${msgObject.author.username}: ${suppliedReason}`;

        msgObject.delete(5000);

        if(!msgObject.member.hasPermission("KICK_MEMBERS")){

            msgObject.channel.send(`you can't kick, BITCH, might kick you tho, ${msgObject.author.username}`);
            return;
        }

        if(!mentionedUser){
            msgObject.channel.send(`Couldn't find that nigga`);
            return;
        }


        msgObject.guild.member(mentionedUser).kick(kickLog)
            .then(console.log)
            .catch(console.error)
            msgObject.channel.send(`fuck dat bitch`);
    }


}