import * as Discord from "discord.js";
import * as db from "quick.db";
import { IBotCommand } from "../api";


const talkedRecently = new Set();

export default class horn implements IBotCommand {

    private readonly _command = "horn"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        msgObject.delete();

        if (args.length < 1) { return; }

        else {

            console.log(`${msgObject.author.username}`);

            let wordsTosend = args.join(" ");

            let allServers = client.guilds.array();

            let channelID;
            let channels;



            if (talkedRecently.has(client.user.id)) {
                msgObject.channel.send("wait a couple minutes nigga")

            } else {

                msgObject.channel.send(`sent`);

                for (let i = 0; i < allServers.length; i++) {
                    channels = allServers[i].channels;
                    channelLoop:
                    for (let c of channels) {
                        let channelType = c[1].type;
                        if (channelType === "text") {
                            channelID = c[0];
                            break channelLoop;
                        }
                    }

                    let channel = client.channels.get(allServers[i].systemChannelID || channelID) as Discord.TextChannel;
                    channel.send(`${wordsTosend}`);

                }


                talkedRecently.add(client.user.id);
                setTimeout(() => {
                    talkedRecently.delete(client.user.id);
                }, 120000);
            }




        }
    }

}