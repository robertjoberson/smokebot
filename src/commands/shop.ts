import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as db from "quick.db";

export default class shop implements IBotCommand {

    private readonly _command = "shop"


    help(): string {
        return "da shop"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let mentionedUser: Discord.User = msgObject.member.user;

        let botItems: string = (db.get(`${client.user.id}.items`) as string[]).join(" ");

        let temp = botItems;

        var countJ = (temp.match(/joint/g) || []).length;
   
        var countB = (temp.match(/blunt/g) || []).length;
    
        var countBo = (temp.match(/bong/g) || []).length;
   
        var countC = (temp.match(/cig/g) || []).length;


        let shopEmbedTwo = new Discord.RichEmbed()
        .setTitle(`Welcome to da shop, ${mentionedUser.username} (use s!buy to purchase item)`)
        .setColor([0, 200, 0])
        .addField(`Bong 45 TOKEns (Current Stock ${countBo}):`, `A water pipe used for smoking dope - usually dry herb ganj, and not to be confused with a dab rig which is used for cannabis concentrates.`)
        .addField(`dmt 100 TOKEns`, `The key to the brainzone...`)
        .addField(`strap 150 TOKEns`, `to defend your ranch from the feds,,`) 
        .addField(`ranch 1500 TOKEns`, `weed ranch`)


        function embedHand(embed){



            msgObject.channel.send(embed).then(msg => {
    
                (msg as Discord.Message).react('⬅').then( r => {
                    (msg as Discord.Message).react('➡').then( r => {
                        (msg as Discord.Message).react('🗑')
        
                    // Filters
                    const backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅' && user.id === msgObject.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === '➡' && user.id === msgObject.author.id;
                    const trashFilter = (reaction, user) => reaction.emoji.name === '🗑' && user.id === msgObject.author.id;
            
                    const backwards = (msg as Discord.Message).createReactionCollector(backwardsFilter);
                    const forwards = (msg as Discord.Message).createReactionCollector(forwardsFilter);
                    const trash = (msg as Discord.Message).createReactionCollector(trashFilter);
            
                    backwards.on('collect', r => {
        
                         r.remove(r.users.filter(u => !u.bot).first());
    
                         (msg as Discord.Message).delete();
                         embedHand(shopEmbedOne);
        
                        })
            
                    forwards.on('collect', r => {
        
                        r.remove(r.users.filter(u => !u.bot).first());
    
                        (msg as Discord.Message).delete();
                        embedHand(shopEmbedTwo);
    
                        })
        
                        trash.on('collect', r => {
        
                        r.remove(r.users.filter(u => !u.bot).first());
        
                        (msg as Discord.Message).delete();
                        })
                })
                })
            })



        }





        let shopEmbedOne = new Discord.RichEmbed()
            .setTitle(`Welcome to da shop, ${mentionedUser.username} (use s!buy to purchase item)`)
            .setColor([0, 200, 0])
            .addField(`cig 5 TOKEns (Current Stock ${countC}):`, `designed by insightful people, who realized that the last 7 yrs. of life are not worth living anyway. Those are the 7 yrs. you cant make coherent sentences, and you shit yourself constantly.`)
            .addField(`Joint 10 TOKEns (Current Stock ${countJ}):`, `a rolled marijuana cigarette`)
            .addField(`Blunt 15 TOKEns (Current Stock ${countB}):`, `a hollowed-out cigar filled with cannabis.`)
            .addField(`crack 20 TOKEns`, `Crack is something that is sold by both drug dealers and prostitutes. The only difference is that a prostitute can wash her crack and sell it again.`)

        embedHand(shopEmbedOne);
                

    }


}