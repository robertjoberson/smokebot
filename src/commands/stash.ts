import * as Discord from "discord.js";
import * as db from "quick.db";
import {IBotCommand} from "../api";

export default class stash implements IBotCommand {

    private readonly _command = "stash"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        
        let mentionedUser: Discord.User;
        
        if (args. length > 0) {

            if(msgObject.mentions.users.size > 0){
                mentionedUser = msgObject.mentions.users.first();
            }
            else{ return; }

        }
        else{

            mentionedUser = msgObject.member.user;
        }


        let userMoney = db.get(`${mentionedUser.id}.money`);
        let userItems: string = (db.get(`${mentionedUser.id}.items`) as string[]).join(" ");

        let temp = userItems;

        var countJ = (temp.match(/joint/g) || []).length;
   
        var countB = (temp.match(/blunt/g) || []).length;
    
        var countBo = (temp.match(/bong/g) || []).length;
   
        var countD = (temp.match(/dmt/g) || []).length;

        var countC = (temp.match(/cig/g) || []).length;

        var countCr = (temp.match(/crack/g) || []).length;

        var countStr = (temp.match(/strap/g) || []).length;

        var countR = (temp.match(/ranch/g) || []).length;

        var countW = (temp.match(/worker/g) || []).length;

        if(countR >= 1 && countStr >= 1){

            let stashEmbed = new Discord.RichEmbed()
            .setTitle(`${mentionedUser.username}'s stash`)
            .setColor([0,200,0])
            .addField("Has a ranch:", `${mentionedUser.username} is a big DAWG rancha with ${countW} workers`)
            .addField("Has a strap:", `${mentionedUser.username} is ready to fight the feds,,,,`)
            .addField("Guap:", `${userMoney} TOKEns`)
            .addField("stuff:", `${countC} cigs,  ${countJ} joints, ${countB} blunts, ${countBo} bongs, ${countD}g of dmt, ${countCr} rocks of crack`)

            msgObject.channel.send(stashEmbed); 
            return;

        }

        if(countStr >= 1){

            let stashEmbed = new Discord.RichEmbed()
            .setTitle(`${mentionedUser.username}'s stash`)
            .setColor([0,200,0])
            .addField("Has a strap:", `${mentionedUser.username} is ready to fight the feds,,,,`)
            .addField("Guap:", `${userMoney} TOKEns`)
            .addField("stuff:", `${countC} cigs,  ${countJ} joints, ${countB} blunts, ${countBo} bongs, ${countD}g of dmt, ${countCr} rocks of crack`)

            msgObject.channel.send(stashEmbed); 
            return;

        }

        if(countR >= 1){

            let stashEmbed = new Discord.RichEmbed()
            .setTitle(`${mentionedUser.username}'s stash`)
            .setColor([0,200,0])
            .addField("Has a ranch:", `${mentionedUser.username} is a big DAWG rancha with ${countW} workers`)
            .addField("Guap:", `${userMoney} TOKEns`)
            .addField("stuff:", `${countC} cigs,  ${countJ} joints, ${countB} blunts, ${countBo} bongs, ${countD}g of dmt, ${countCr} rocks of crack`)

            msgObject.channel.send(stashEmbed); 
            return;

        }


        else{

            if(userItems === ""){
                msgObject.channel.send("You broke, wh*te boy");
            }
                let stashEmbed = new Discord.RichEmbed()
                .setTitle(`${mentionedUser.username}'s stash`)
                .setColor([0,200,0])
                .addField("Guap:", `${userMoney} TOKEns`)
                .addField("stuff:", `${countC} cigs,  ${countJ} joints, ${countB} blunts, ${countBo} bongs, ${countD}g of dmt, ${countCr} rocks of crack`)

                msgObject.channel.send(stashEmbed); 

                return;


            }
    }


}