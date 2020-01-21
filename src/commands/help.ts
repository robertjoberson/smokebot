import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { wordModel } from "../models/wordModel";
import * as db from "quick.db";

export default class help implements IBotCommand {

    private readonly _command = "help"


    help(): string {
        return "shows all dis shit"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        var server = msgObject.guild.id;
        
        let serverBanned: string[] = db.get(`${server}.bannedWords`) as any;

        let listWords = serverBanned.join(", ");


    let cmd = ['Banned Words', 's!addword/s!delword' ,'s!inhale/exhale', 's!ban', 's!bet', 's!buy', 's!cum' , 's!kick', 's!link', 's!market', 's!oracle', 's!pass', 's!profile','s!shop', 's!simp', 's!send', 's!smoke', 's!stash' , 's!vibe', 's!weed ranch', "s!work"];

    let pages = [listWords, "For adding and removing words from the banned list. Server specific. Requires word, member requires KICK perm to access this", 
    'for manual smokin,,,,', 'requires an @ of a member', 'for gamblin ya change, put in amount you wish to bet after the command, if none specified, will bet 1',
    'requires item name (optional: Enter a number after item name for bulk orders. Ex: s!buy cig 2)', 
    'for cummin on niggas,,,,, requires @',
    'requires an @ of a member', 'LINK WATCH !!', 'locally sourced all organic marihuana', 'to confer with the great one...',
    'requires name of item you\'re passing, can add an @ of who to pass to', 'shows the tagged persons profile, or your own if no one is tagged', 'shows da SHOP',
    'fo simpin, can @ a member to simp ova dem', 'fo sendin GUAP, requires a tagged user followed by a number', 
    'requires name of item you\'re smoking', 'shows da stash', 
    'VIBE CHECK, can @ a member to check their vibe', 'for ranchin (must first buy a ranch)', 'for makin guap,,'];

    let page = 1; 
    
        const embed = new Discord.RichEmbed() 
        .setTitle(cmd[page-1])
        .setColor([0, 200, 0]) 
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page-1])
    
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

                if (page === 1) return;
                page--;



                embed.setTitle(cmd[page-1])
                embed.setDescription(pages[page-1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);
                 (msg as Discord.Message).edit(embed)
            })
    
            forwards.on('collect', r => {

                r.remove(r.users.filter(u => !u.bot).first());

                if (page === pages.length) return;
                page++;

                embed.setTitle(cmd[page-1])
                embed.setDescription(pages[page-1]);
                embed.setFooter(`Page ${page} of ${pages.length}`);

                (msg as Discord.Message).edit(embed)
            })

                trash.on('collect', r => {

                r.remove(r.users.filter(u => !u.bot).first());

                (msg as Discord.Message).delete();
            })
        })
        })
    })







    }


}