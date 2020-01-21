import * as Discord from "discord.js";
import * as db from "quick.db";
import { IBotCommand } from "../api";

export default class rep implements IBotCommand {

    private readonly _command = "rep"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let mentionedUser: Discord.User;
        
        if (args.length > 0) {

            if(msgObject.mentions.users.size > 0){
                mentionedUser = msgObject.mentions.users.first();
            }
            else{ return; }

        }
        else{

            mentionedUser = msgObject.member.user;
        }

        let userRep = db.get(`${mentionedUser.id}.rep`);

        if(typeof userRep == 'undefined'){

            userRep = 0;

        }


        msgObject.channel.send(`${mentionedUser}'s rep is: ${userRep}`);


        return;

    }
}