import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class vibe implements IBotCommand {

    private readonly _command = "vibe"


    help(): string {
        return "vibe checks"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        

        let mentionedUser: Discord.User;
       
            if(msgObject.mentions.users.size > 0) {
                mentionedUser = msgObject.mentions.users.first()



                let member = mentionedUser;
//******************************************************************************* */
                const filter = m => m.member.id === member.id;
                msgObject.channel.send(`${msgObject.member} wishes to check your vibe. You vibin, ${mentionedUser}.....?`);
                msgObject.channel.awaitMessages(filter, {max: 1, time: 25000}).then(collected => {
        
        
                    if(collected.first().content.toLowerCase() === "no"){
                        msgObject.channel.send("have you considered vibin n chillin..?\n\
                        https://www.youtube.com/watch?v=oJnF5VxTO5g")
        
                        let vibeEmbed = new Discord.RichEmbed()
                        .setTitle("truly vibin....")
                        .setColor([0,200,0])
                        .setImage("https://i.kym-cdn.com/entries/icons/mobile/000/025/388/maxresdefault_live.jpg")
                        .setFooter("vibin hard rn")
        
                        msgObject.channel.send(vibeEmbed);
        
                        return;
        
        
                    }
        
                    if(collected.first().content.toLowerCase() === "yes"){
        
                        msgObject.channel.send("Checked n vibed brotha...keep on chillin")
        
                        let vibeEmbed = new Discord.RichEmbed()
                        .setTitle("In case of emergency check out image n vibe.....")
                        .setColor([0,200,0])
                        .setImage("https://thumbs.gfycat.com/SnarlingMajorBrocketdeer-max-1mb.gif")
                        .setFooter("vibin hard rn")
        
                        msgObject.channel.send(vibeEmbed);
                        
        
                        return;
                    }
        
        
                })


            }
 
        else{
            mentionedUser = msgObject.member.user;



            let member = mentionedUser;



            const filter = m => m.member.id === member.id;
            msgObject.channel.send(`${member} VIBE CHECK: You chillin...? (yes/no)`);
            msgObject.channel.awaitMessages(filter, {max: 1, time: 25000}).then(collected => {
    
    
                if(collected.first().content.toLowerCase() === "no"){
                    msgObject.channel.send("have you considered vibin n chillin..?\n\
                    https://www.youtube.com/watch?v=oJnF5VxTO5g")
    
                    let vibeEmbed = new Discord.RichEmbed()
                    .setTitle("truly vibin....")
                    .setColor([0,200,0])
                    .setImage("https://i.kym-cdn.com/entries/icons/mobile/000/025/388/maxresdefault_live.jpg")
                    .setFooter("vibin hard rn")
    
                    msgObject.channel.send(vibeEmbed);
    
    
    
    
                }
    
                if(collected.first().content.toLowerCase() === "yes"){
    
                    msgObject.channel.send("Checked n vibed brotha...keep on chillin")
    
                    let vibeEmbed = new Discord.RichEmbed()
                    .setTitle("In case of emergency check out image n vibe.....")
                    .setColor([0,200,0])
                    .setImage("https://thumbs.gfycat.com/SnarlingMajorBrocketdeer-max-1mb.gif")
                    .setFooter("vibin hard rn")
    
                    msgObject.channel.send(vibeEmbed);
                    
    
    
                }
            })



        }




}


}