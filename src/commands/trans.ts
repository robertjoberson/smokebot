
const projectId = '';
 
const {Translate} = require('@google-cloud/translate').v2;
import * as Discord from "discord.js";
import * as db from "quick.db";
import { IBotCommand } from "../api";
import * as ItemData from "../itemData";
import { itemModel } from "../models/itemModel";


export default class trans implements IBotCommand {

    private readonly _command = "trans"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {



  
  let msgT = args.toString();
 
  const translate = new Translate({projectId});
 
  async function quickStart() {

    const text = msgT;
 

    const target = 'en';

    if(text === target){

        return;
    }
 
    const [translation] = await translate.translate(text, target);

    console.log(`Text: ${text}`);
    msgObject.channel.send(`Translation: ${translation}`);
    return;
  }
 
  quickStart();




    }
}

