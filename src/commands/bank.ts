import * as Discord from "discord.js";
import * as ItemData from "../itemData";
import * as db from "quick.db";
import { IBotCommand } from "../api";
import { itemModel } from "../models/itemModel";
import * as ms from "parse-ms";


const Canvas = require('canvas');

export default class bank implements IBotCommand {

    private readonly _command = "bank"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let lastLoanDate = (db.fetch(`${msgObject.author.id}.payDate`) - 1);

        let oneDay = 8.64e+7, //24 hours in miliseconds
            payBackDay,
            loanAmt;

        if (lastLoanDate != 0) {

            let timeObj = ms((Date.now() - lastLoanDate)*-1);

            let member = msgObject.member.user;

            const filter = m => m.member.id === member.id;

            msgObject.channel.send(`${msgObject.author} you already have a loan out brotha. Time remaining on loan: ${timeObj.hours}h ${timeObj.minutes}m. Pay it back? yes/no`);
            msgObject.channel.awaitMessages(filter, { max: 2, time: 35000 }).then(collected => {


                if (collected.first().content.toLowerCase() === "no") {
                    return;
                }

                if (collected.first().content.toLowerCase() === "yes") {

                    let userMoney = db.fetch(`${msgObject.author.id}.money`);
                    loanAmt = db.fetch(`${msgObject.author.id}.loan`);

                    if (userMoney < loanAmt) {

                        msgObject.channel.send(`${msgObject.author} you're too poor nigga !`);
                        return;

                    }

                    else {

                        db.set(msgObject.author.id, { payDate: 1, loan: 1 });

                        db.add(`${msgObject.author.id}.money`, -loanAmt);

                        msgObject.channel.send(`${member} you have paid back your loan`);

                        return;
                    }
                }

            })
        }
        else{

        let bankEmbed = new Discord.RichEmbed()
            .setColor([0, 255, 0])
            .setTitle(`Welcome to the bank, ${msgObject.author.username}`)
            .addField(`Loan amount: 420`, `5% interest every 6 hours,,,, must pay back within 24 hours or assests will be sold off,,,,`)
            .addField(`Loan amount: 2000`, `15% interest every 6 hours,,,, must pay back within 24 hours or assests will be sold off,,,,`)
            .addField(`Loan amount: 5000`, `30% interest every 6 hours,,,, must pay back within 24 hours or assests will be sold off,,,,`)
            .addField(`Buy a users debt`, `Will collect all of the indebted users payments, and the worth of their assests if they default`);

        msgObject.channel.send(bankEmbed).then(msg => {

            (msg as Discord.Message).react('💴').then(r => {

                (msg as Discord.Message).react('💶').then(r => {

                    (msg as Discord.Message).react('💵').then(r => {

                        (msg as Discord.Message).react('💰')

                        // Filters
                        const smallFilter = (reaction, user) => reaction.emoji.name === '💴' && user.id === msgObject.author.id;
                        const medFilter = (reaction, user) => reaction.emoji.name === '💶' && user.id === msgObject.author.id;
                        const largeFilter = (reaction, user) => reaction.emoji.name === '💵' && user.id === msgObject.author.id;
                        const buyDebtFilter = (reaction, user) => reaction.emoji.name === '💰' && user.id === msgObject.author.id;


                        const small = (msg as Discord.Message).createReactionCollector(smallFilter);
                        const med = (msg as Discord.Message).createReactionCollector(medFilter);
                        const large = (msg as Discord.Message).createReactionCollector(largeFilter);
                        const buyDebt = (msg as Discord.Message).createReactionCollector(buyDebtFilter);

                        //small loan*********************************************************************************************************************************
                        small.on('collect', r => {

                            r.remove(r.users.filter(u => !u.bot).first());

                            (msg as Discord.Message).delete();

                            loanAmt = 420;
                            payBackDay = (Date.now() + oneDay);

                            db.add(`${msgObject.author.id}.payDate`, payBackDay);
                            db.add(`${msgObject.author.id}.loan`, loanAmt);
                            db.add(`${msgObject.author.id}.money`, loanAmt);

                            msgObject.channel.send(`${msgObject.author} has taken out a loan of ${loanAmt} and must repay it within 24 hours`);
                            return;


                        })

                        med.on('collect', r => {

                            r.remove(r.users.filter(u => !u.bot).first());

                            (msg as Discord.Message).delete();

                            loanAmt = 2000;
                            payBackDay = (Date.now() + oneDay);

                            db.add(`${msgObject.author.id}.payDate`, payBackDay);
                            db.add(`${msgObject.author.id}.loan`, loanAmt);
                            db.add(`${msgObject.author.id}.money`, loanAmt);

                            msgObject.channel.send(`${msgObject.author} has taken out a loan of ${loanAmt} and must repay it within 24 hours`);
                            return;


                        })

                        large.on('collect', r => {

                            r.remove(r.users.filter(u => !u.bot).first());

                            (msg as Discord.Message).delete();

                            loanAmt = 5000;
                            payBackDay = (Date.now() + oneDay);

                            db.add(`${msgObject.author.id}.payDate`, payBackDay);
                            db.add(`${msgObject.author.id}.loan`, loanAmt);
                            db.add(`${msgObject.author.id}.money`, loanAmt);

                            msgObject.channel.send(`${msgObject.author} has taken out a loan of ${loanAmt} and must repay it within 24 hours`);
                            return;

                        })

                        buyDebt.on('collect', r => {

                            r.remove(r.users.filter(u => !u.bot).first());

                            (msg as Discord.Message).delete();


                        })

                    })
                })
            })
        })
    }
    }
}
