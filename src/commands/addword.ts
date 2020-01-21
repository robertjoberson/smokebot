import * as Discord from "discord.js";
import * as db from "quick.db";
import {IBotCommand} from "../api";
import { wordModel } from "../models/wordModel";

export default class addword implements IBotCommand {

    private readonly _command = "addword"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        var server = msgObject.guild.id;

        if(args.length < 1){

            msgObject.channel.send("Enter a word");
            return;
        }

        if(!msgObject.member.hasPermission("KICK_MEMBERS")){

            msgObject.channel.send(`you aint a mod bitch ass ${msgObject.author.username}`);
            return;
        }

        let newWord = args.join(" ").toLowerCase();

        let currentWords: string[] = db.get(`${server}.bannedWords`);

        if((currentWords).includes(newWord)){

            msgObject.channel.send("That word is already banned");
            return;
        }
        else{

            let serverBanned: wordModel = db.push(`${server}.bannedWords`, newWord) as any;


            msgObject.channel.send(`Current banned words: ${(serverBanned.bannedWords.join(", "))}`)
            .then(msg =>{
                (msg as Discord.Message).delete(5000);
                    
            });
        }





    }


}