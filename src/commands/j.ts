import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { connect } from "tls";
import * as YTDL from "ytdl-core";

let servers = {};



function Play(connection, msgObject){

    var server = servers[msgObject.guild.id];

    server.dispatcher = connection.playStream(YTDL(`${server.queue[0]}`, {filter: "audioonly"}));

    server.queue.shift();
    server.dispatcher.on("end", function(){

        if(server.queue[0]){

            Play(connection, msgObject);
        }
        else{
            connection.disconnect();
        }
    });
}


export default class j implements IBotCommand {

    private readonly _command = "j"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        
        let song = args.join(" ");




        if(msgObject.member.voiceChannel){

            if(!msgObject.guild.voiceConnection){

                //gay sex
                var p0 = "https://www.youtube.com/watch?v=uM0Cx4q4QPQ";
                //slob
                //var p1 = "https://www.youtube.com/watch?v=jziiOMeChrc";
                var p1 = "https://youtu.be/2BIWNLC_iT4?t=9";

                let songP;

                if(song === "1"){

                    songP = p0;

                }

                if(song === "2"){

                    songP = p1;

                }

                if(!servers[msgObject.guild.id]){

                    servers[msgObject.guild.id] = {queue: []}

                }
                msgObject.member.voiceChannel.join()
                    .then(connection =>{
                        var server = servers[msgObject.guild.id];
                        msgObject.reply("I joined dis shit");
                        server.queue.push(`${songP}`);


                        Play(connection, msgObject);

                    })
            }
        }
        else{
            msgObject.reply("You gotta joice vc first, nigga,,,");
        }
    }


}