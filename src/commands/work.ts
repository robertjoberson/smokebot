import * as Discord from "discord.js";
import * as db from "quick.db";
import { IBotCommand } from "../api";

// keep up top
const talkedRecently = new Set();


export default class work implements IBotCommand {

    private readonly _command = "work"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        msgObject.delete(3000);

        if (talkedRecently.has(msgObject.author.id)) {
            msgObject.channel.send("Wait 1 minute before workin again. - " + msgObject.author)
            .then(msg =>{
                (msg as Discord.Message).delete(3000);
            });
            
        } else {


            let workAr = new Array(3);
            workAr = ["worked as a prostitute", "worked as a za ranch hand", "got robbed on the way home,,,"];
    
            let workRan = (Math.floor(Math.random() * 2));
    
            let payChance = (Math.floor(Math.random() * 5) + 1);
    
            let pay = (Math.floor(Math.random() * 9) + 1);
    
    
            let payAr = new Array(8);
            payAr = [0, 300, 200, 25, 420, 15, 50, 100, 150, 75];
    
            if (payChance == 1) {
    
                pay = 0;
            }
    
            if (payChance == 2 || payChance == 3 || payChance == 4) {
    
                pay = payAr[pay];
            }
    
            if (payChance == 5) {
    
                pay = -(payAr[5]);
                workRan = 2;
    
            }
    
    
    
            msgObject.channel.send(`${msgObject.author.username} ${workAr[workRan]} and earned ${pay} TOKEns`)               
            .then(msg =>{
                (msg as Discord.Message).delete(3000);
            });
            
    
            db.add(`${msgObject.author.id}.money`, pay);

            talkedRecently.add(msgObject.author.id);
            setTimeout(() => {
                talkedRecently.delete(msgObject.author.id);
            }, 60000);
        }

    }


}