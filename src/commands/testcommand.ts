import * as Discord from "discord.js";
import * as db from "quick.db";
import { IBotCommand } from "../api";
import * as ItemData from "../itemData";
import { itemModel } from "../models/itemModel";



export default class testcommand implements IBotCommand {

    private readonly _command = "testcommand"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        // let mentionedUser = msgObject.mentions.users.first();

        // let amtRep = -170;

    
        //         db.add(`${mentionedUser.id}.rep`, amtRep);
        //         let userRep: number = db.get(`${mentionedUser.id}.rep`);
    
        //         msgObject.channel.send(`${mentionedUser}'s rep is now ${userRep}`)
        //             .then(msg => {
        //                 (msg as Discord.Message).delete(3000);
    
        //             });
    
            }
        }
    
    





    


