import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as db from "quick.db";

export default class send implements IBotCommand {

    private readonly _command = "send"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if (args.length < 1){ return; }


        let sentItem = args.join(" ");

        let mentionedUser: Discord.User;

        let userMoney: number = db.get(`${msgObject.author.id}.money`);

        //msgObject.author.id
       
            if(msgObject.mentions.users.size > 0) {

                mentionedUser = msgObject.mentions.users.first()
                
                
               let temp = msgObject.mentions.members.first();

               let amt = sentItem;




                if( (temp.toString()) === (mentionedUser.toString()) ){

                    amt = amt.replace(`${mentionedUser}`, ''); 
                }

                else{

                    amt = amt.replace(`${temp}`, '');
                } 

                if (amt.includes(mentionedUser.toString())) {

                    let tempMobile = msgObject.mentions.users.first();
        
                    mentionedUser = tempMobile;
        
                    amt = amt.replace(`${mentionedUser}`, ''); // Remove the mentioned user from our string

                }
    

                var realAmt = parseInt(amt, 10);

                if(userMoney < realAmt){

                    msgObject.channel.send(`you too poor, NIGGA !`);
                    return;
                }
                else{

                    db.add(`${msgObject.author.id}.money`, -realAmt);
                    db.add(`${mentionedUser.id}.money`, realAmt);

                    msgObject.channel.send(`${msgObject.member.user.username} has sent ${mentionedUser} ${realAmt} TOKEns`);
                    

                }



            }
            else{

                mentionedUser = msgObject.member.user;
                msgObject.reply("You need to tag someone, BITCH !!");
                return;
            }
    }


}