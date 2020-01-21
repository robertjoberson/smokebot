import * as Discord from "discord.js";
import * as db from "quick.db";
import { IBotCommand } from "../api";
import { itemModel } from "../models/itemModel";
import * as ItemData from "../itemData";

export default class market implements IBotCommand {

    private readonly _command = "market"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {


        let userItems: string = (db.get(`${client.user.id}.items`) as string[]).join(" ");

        let userStrains = userItems;

        let item: itemModel = null;


        var tempH = userStrains;
        var countH = (tempH.match(/harlequin/g) || []).length;

        var tempS = userStrains;
        var countS = (tempS.match(/sour-tsunami/g) || []).length;

        var tempP = userStrains;
        var countP = (tempP.match(/pennywise/g) || []).length;

        var tempA = userStrains;
        var countA = (tempA.match(/afghani/g) || []).length;

        var tempT = userStrains;
        var countT = (tempT.match(/thai/g) || []).length;

        var tempCig = userStrains;
        var countCig = (tempCig.match(/tobacco/g) || []).length;

        let userTopStrains = userItems;


        var tempDA = userTopStrains;
        var countDA = (tempDA.match(/dutch-amnesia-haze/g) || []).length;

        var tempNL = userTopStrains;
        var countNL = (tempNL.match(/northern-lights/g) || []).length;

        var tempSD = userTopStrains;
        var countSD = (tempSD.match(/sour-diesel/g) || []).length;

        var tempPE = userTopStrains;
        var countPE = (tempPE.match(/pineapple-express/g) || []).length;

        var tempBK = userTopStrains;
        var countBk = (tempBK.match(/bubba-kush/g) || []).length;



        function breedbuyer(newStrainName) {

            ItemData.itemData.items.forEach(element => {

                if (element.name.toLowerCase() == newStrainName.toLowerCase()) {
                    item = element;

                }
            });

            db.add(`${msgObject.author.id}.money`, -item.price);

            msgObject.channel.send(`1 lbs of ${item.name} was bought and ${item.price} was subtracted from your account`);

            //deletes the first instance of "newStrainName" in the array and then sets the new array
            const myValue = db.get(`${client.user.id}.items`);

            myValue.splice(myValue.indexOf(`${newStrainName}`), 1);

            (db.set(`${client.user.id}.items`, myValue));

            //sends from the bots inv to the player
            (db.push(`${msgObject.author.id}.items`, item.name));

        }




        let marketEmbed = new Discord.RichEmbed()
            .setTitle(`welcome to the farmas market, my nigga`)
            .setColor([0, 200, 0])
            .setImage("https://www.washingtonian.com/wp-content/uploads/2019/04/HSt_MarketShot.jpg")
            .addField("Non-GMO, 600 per pound:", `${countH}lbs of harlequin, ${countS}lbs sour-tsunami, ${countP}lbs pennywise, ${countT}lbs thai, ${countA}lbs afghani`)
            .addField("Organic, 900 per pound:", `${countDA} lbs of dutch-amnesia-haze, ${countNL} lbs northern-lights, ${countSD} lbs sour-diesel, ${countPE} lbs pineapple-express, ${countBk} lbs bubba-kush`)
            .addField(`Organic red man's, 150 per pound`, `${countCig} lbs of tobacco`);

        msgObject.channel.send(marketEmbed).then(msg => {

            (msg as Discord.Message).react('🇭').then(r => {

                (msg as Discord.Message).react('🇸').then(r => {

                    (msg as Discord.Message).react('🇵').then(r => {

                        (msg as Discord.Message).react('🇦').then(r => {

                            (msg as Discord.Message).react('🇹').then(r => {

                                (msg as Discord.Message).react('🇳🇱').then(r => {

                                    (msg as Discord.Message).react('🌃').then(r => {

                                        (msg as Discord.Message).react('🍋').then(r => {

                                            (msg as Discord.Message).react('🍍').then(r => {

                                                (msg as Discord.Message).react('🗯').then(r => {

                                                    (msg as Discord.Message).react('🚬')
                                                    // Filter
                                                    const dutchFilter = (reaction, user) => reaction.emoji.name === '🇳🇱' && user.id === msgObject.author.id;
                                                    const northernFilter = (reaction, user) => reaction.emoji.name === '🌃' && user.id === msgObject.author.id;
                                                    const sourFilter = (reaction, user) => reaction.emoji.name === '🍋' && user.id === msgObject.author.id;
                                                    const pineApFilter = (reaction, user) => reaction.emoji.name === '🍍' && user.id === msgObject.author.id;
                                                    const bubbaFilter = (reaction, user) => reaction.emoji.name === '🗯' && user.id === msgObject.author.id;
                                                    const cigFilter = (reaction, user) => reaction.emoji.name === '🚬' && user.id === msgObject.author.id;

                                                    const dutchAm = (msg as Discord.Message).createReactionCollector(dutchFilter);
                                                    const northernLights = (msg as Discord.Message).createReactionCollector(northernFilter);
                                                    const sour = (msg as Discord.Message).createReactionCollector(sourFilter);
                                                    const pineAp = (msg as Discord.Message).createReactionCollector(pineApFilter);
                                                    const bubba = (msg as Discord.Message).createReactionCollector(bubbaFilter);
                                                    const cig = (msg as Discord.Message).createReactionCollector(cigFilter);
                                                    // Filters

                                                    const harlequinFilter = (reaction, user) => reaction.emoji.name === '🇭' && user.id === msgObject.author.id;
                                                    const sourTsunamiFilter = (reaction, user) => reaction.emoji.name === '🇸' && user.id === msgObject.author.id;
                                                    const pennywiseFilter = (reaction, user) => reaction.emoji.name === '🇵' && user.id === msgObject.author.id;
                                                    const afghaniFilter = (reaction, user) => reaction.emoji.name === '🇦' && user.id === msgObject.author.id;
                                                    const thaiFilter = (reaction, user) => reaction.emoji.name === '🇹' && user.id === msgObject.author.id;

                                                    const harlequin = (msg as Discord.Message).createReactionCollector(harlequinFilter);
                                                    const sourTsunami = (msg as Discord.Message).createReactionCollector(sourTsunamiFilter);
                                                    const pennywise = (msg as Discord.Message).createReactionCollector(pennywiseFilter);
                                                    const afghani = (msg as Discord.Message).createReactionCollector(afghaniFilter);
                                                    const thai = (msg as Discord.Message).createReactionCollector(thaiFilter);

                                                    harlequin.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countH == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "harlequin";
                                                            breedbuyer(newStrainName);


                                                        }

                                                    })

                                                    sourTsunami.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countS == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "sour-tsunami";

                                                            breedbuyer(newStrainName);

                                                        }

                                                    })

                                                    pennywise.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countP == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "pennywise";

                                                            breedbuyer(newStrainName);
                                                        }

                                                    })

                                                    afghani.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countA == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "afghani";

                                                            breedbuyer(newStrainName);
                                                        }

                                                    })

                                                    thai.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countT == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "thai";

                                                            breedbuyer(newStrainName);

                                                        }

                                                    })

                                                    dutchAm.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countDA == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "dutch-amnesia-haze";

                                                            breedbuyer(newStrainName);

                                                        }

                                                    })

                                                    northernLights.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countNL == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "northern-lights";

                                                            breedbuyer(newStrainName);

                                                        }

                                                    })

                                                    sour.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countSD == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "sour-diesel";

                                                            breedbuyer(newStrainName);

                                                        }

                                                    })

                                                    pineAp.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countPE == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "pineapple-express";

                                                            breedbuyer(newStrainName);

                                                        }

                                                    })

                                                    bubba.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countBk == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "bubba-kush";

                                                            breedbuyer(newStrainName);

                                                        }

                                                    })

                                                    cig.on('collect', r => {

                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                        (msg as Discord.Message).delete();

                                                        if (countCig == 0) {
                                                            msgObject.channel.send("we aint got any in stock, boss");
                                                        }
                                                        else {

                                                            let newStrainName = "tabacco";

                                                            breedbuyer(newStrainName);

                                                        }

                                                    })
                                                })
                                            })


                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    }


}