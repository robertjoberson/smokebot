import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { connect } from "tls";

export default class leave implements IBotCommand {

    private readonly _command = "leave"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

       
        if(msgObject.guild.voiceConnection){

            msgObject.guild.voiceConnection.disconnect();
        }
        else{

            msgObject.reply("I'm not in vc, dumb nigga,,,,");
        }

    }


}