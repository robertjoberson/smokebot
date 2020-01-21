import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class simp implements IBotCommand {

    private readonly _command = "simp"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let mentionedUser: Discord.User;
       
            if(msgObject.mentions.users.size > 0) {
                mentionedUser = msgObject.mentions.users.first()




                msgObject.channel.send(`https://www.youtube.com/watch?v=JsoPGeKrwCU`)

                let vibeEmbed = new Discord.RichEmbed()
                .setTitle(`${msgObject.member.displayName} simpin hard ova ${mentionedUser.username},,,,`)
                .setColor([255, 0, 0])
                .setImage("http://thyblackman.com/wp-content/uploads/2014/12/simpman.jpg")
                .setFooter("simp lyfe,,,,")

                msgObject.channel.send(vibeEmbed);
                
                //mentionedUser.send(`${msgObject.member.displayName} says they will protect you forever,,,, no matta what, queen,,,,,,,`);

                let temp = msgObject.mentions.members.first();

                //temp.send(`${msgObject.member.displayName} says they will protect you forever,,,, no matta what, queen,,,,,,,`);

                return;



            }
            else {
                msgObject.channel.send("You can't simp ya self, playah,,,, stay pimpin,,,"); 
            }
    }


}