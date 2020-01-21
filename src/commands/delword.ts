import * as Discord from "discord.js";
import * as db from "quick.db";
import {IBotCommand} from "../api";
import { wordModel } from "../models/wordModel";

export default class delword implements IBotCommand {

    private readonly _command = "delword"


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

        if((currentWords).includes(newWord) == false){

            msgObject.channel.send("That word isn't on the list, BITCH !!!");
        }
        else{

            //deletes the first instance of "joint" in the array and then sets the new array
            const myValue = db.get(`${server}.bannedWords`);

            myValue.splice(myValue.indexOf(newWord), 1);
                
            (db.set(`${server}.bannedWords`, myValue)) as any;

            msgObject.channel.send(`The word ${newWord} has now been deleted`);

        }





    }


}