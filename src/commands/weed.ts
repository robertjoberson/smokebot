import * as Discord from "discord.js";
import * as ItemData from "../itemData";
import * as db from "quick.db";
import { IBotCommand } from "../api";
import { itemModel } from "../models/itemModel";

const Canvas = require('canvas');


function breeder(numB: number, newTopStrainName, breedArr = new Array(10), item, msgObject) {

    let member = msgObject.member;

    const filterB = m => m.member.id === member.id;
    msgObject.channel.send("Would you like to backtrace for better better breeding odds? 200 TOKEns (yes/no)");
    msgObject.channel.awaitMessages(filterB, { max: 1, time: 60000 }).then(async collectedB => {

        let answer = collectedB.first().content.toLowerCase();

        if (answer === "yes") {

            let userMoney: number = db.get(`${msgObject.author.id}.money`)

            if (userMoney < item.price) {

                msgObject.channel.send(`You can't afford that`);

                answer = "no";

            }
            else {


                db.add(`${msgObject.author.id}.money`, -200);
                numB = (Math.floor((Math.random() * 9)));

                if (numB % 2 == 0) {
                    numB = (numB + 1);
                }
            }
        }

        if (answer === "no") {

            numB = (Math.floor((Math.random() * 9)));
        }


        breedArr = [".", "dutch-amnesia-haze", ".", "northern-lights", ".", "sour-diesel", ".", "pineapple-express", ".", "bubba-kush"];



        if (numB === 0 || numB === 2 || numB === 4 || numB === 6 || numB === 8) {

            msgObject.channel.send("The breeding process failed cuz you too high, nigga");

            return;

        }

        if (numB === 1 || numB === 3 || numB === 5 || numB === 7 || numB === 9) {

            newTopStrainName = breedArr[numB];

            ItemData.itemData.items.forEach(elementT => {

                if (elementT.name.toLowerCase() == newTopStrainName.toLowerCase()) {
                    item = elementT;

                }
            });



            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');

            const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/609378055441612819/619194381655605259/wallpaper.jpg');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            ctx.font = '28px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`You bred ${item.name}`, canvas.width / 7.0, canvas.height / 4.0);


            async function imgLoader(PAF, PAB, PAE) {

                const AF = await Canvas.loadImage(PAF);
                ctx.drawImage(AF, 465, 160, 220, 75);

                const AB = await Canvas.loadImage(PAB);
                ctx.drawImage(AB, 535, 25, 100, 100);


                const AE = await Canvas.loadImage(PAE);
                ctx.drawImage(AE, 55, 110, 350, 100);

                const attachment = new Discord.Attachment(canvas.toBuffer(), 'breed-image.png');

                msgObject.channel.send(attachment);



                db.push(`${msgObject.author.id}.items`, item.name);

            }

            if (numB === 1) {

                let DAF = "https://cdn.discordapp.com/attachments/618383690329882625/619204305194582036/DAF_2.png";
                let DAB = "https://d3ix816x6wuc0d.cloudfront.net/sativa/amnesia-haze/badge?width=340";
                let DAE = "https://cdn.discordapp.com/attachments/618383690329882625/619205524071907355/DA_2.png";

                imgLoader(DAF, DAB, DAE);

            }

            if (numB === 3) {

                let NLF = "https://cdn.discordapp.com/attachments/618383690329882625/619209741876592643/NLF.png"
                let NLB = "https://d3ix816x6wuc0d.cloudfront.net/indica/northern-lights/badge"
                let NLE = "https://cdn.discordapp.com/attachments/618383690329882625/619209797765693470/NLE.png"

                imgLoader(NLF, NLB, NLE);

            }

            if (numB === 5) {

                let SDF = "https://cdn.discordapp.com/attachments/618383690329882625/619211169927790612/SDF.png"
                let SDB = "https://d3ix816x6wuc0d.cloudfront.net/sativa/sour-diesel/badge"
                let SDE = "https://cdn.discordapp.com/attachments/618383690329882625/619211153326997505/SDE.png"

                imgLoader(SDF, SDB, SDE);
            }


            if (numB === 7) {

                let PEF = "https://cdn.discordapp.com/attachments/618383690329882625/619212530543493120/PEF.png"
                let PEB = "https://d3ix816x6wuc0d.cloudfront.net/hybrid/pineapple-express/badge?width=340"
                let PEE = "https://cdn.discordapp.com/attachments/618383690329882625/619212563678232576/PEE.png"

                imgLoader(PEF, PEB, PEE);
            }

            if (numB === 9) {

                let BKF = "https://cdn.discordapp.com/attachments/618383690329882625/619213545346695179/BKF.png"
                let BKB = "https://d3ix816x6wuc0d.cloudfront.net/indica/bubba-og/badge?width=340"
                let BKE = "https://cdn.discordapp.com/attachments/618383690329882625/619213809302634506/BKE_2.png"

                imgLoader(BKF, BKB, BKE);
            }
        }

    })


}

export default class weed implements IBotCommand {

    private readonly _command = "weed"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if (args.length < 1) { return; }

        let ranchNum = args.join(" ");

        let item: itemModel = null;

        let mentionedUser = msgObject.member;

        let userItems: string = (db.get(`${msgObject.author.id}.items`) as string[]).join(" ");

        let botItems: string = (db.get(`${client.user.id}.items`) as string[]).join(" ");


        let userStrains = userItems;


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

        //************************************************************************************************************** */

        let userStrainsB = botItems;


        var tempHB = userStrainsB;
        var countHB = (tempHB.match(/harlequin/g) || []).length;

        var tempSB = userStrainsB;
        var countSB = (tempSB.match(/sour-tsunami/g) || []).length;

        var tempPB= userStrainsB;
        var countPB = (tempPB.match(/pennywise/g) || []).length;

        var tempAB = userStrainsB;
        var countAB = (tempAB.match(/afghani/g) || []).length;

        var tempTB = userStrainsB;
        var countTB = (tempTB.match(/thai/g) || []).length;

        var tempCigB = userStrainsB;
        var countCigB = (tempCigB.match(/tobacco/g) || []).length;

        let userTopStrainsB = botItems;


        var tempDAB = userTopStrainsB;
        var countDAB = (tempDAB.match(/dutch-amnesia-haze/g) || []).length;

        var tempNLB = userTopStrainsB;
        var countNLB = (tempNLB.match(/northern-lights/g) || []).length;

        var tempSDB = userTopStrainsB;
        var countSDB = (tempSDB.match(/sour-diesel/g) || []).length;

        var tempPEB = userTopStrainsB;
        var countPEB = (tempPEB.match(/pineapple-express/g) || []).length;

        var tempBKB= userTopStrainsB;
        var countBkB = (tempBKB.match(/bubba-kush/g) || []).length;


        

        //looks for all the items in the list of itemsDatas
        ItemData.itemData.items.forEach(element => {
            //if what we typed is equal to something in the itemData folder, then it sets it as the element
            if (element.name == ranchNum) {
                item = element;
            }

        });

        if (item === null) {

            msgObject.channel.send("it's 's!weed ranch' dumb BITCH !!!")
            return;
        }

        if (item.name === "ranch") {

            var tempR = userItems;
            var countR = (tempR.match(/ranch/g) || []).length;

            if (countR === 0) {
                msgObject.reply("You ain't got a ranch yet, pimp");
                return;

            }
            else {

                let member = mentionedUser;

                let ranchEmbed = new Discord.RichEmbed()
                    .setTitle(`welcome to your ranch, brotha ${msgObject.member.user.username},,, what would you like to do ?`)
                    .setColor([0, 200, 0])
                    .addField("water 🚰:", `to water ya crops`)
                    .addField("harvest 🚜:", `to harvest ya crops`)
                    .addField("sell 💰:", `take ya shit to the farmas market`)
                    .addField("breed 🤰:", `breedin some w33d,,,`)
                    .addField("stock 💼:", `to view your current stock of weed`)
                    .addField("hire 👔:", `hire workers to work your farm for 2400 TOKEns each (Plus 1000 per worker, per ranch over 1)`)
                    .setImage("https://static01.nyt.com/packages/flash/Lens/2011/08/20110811-KM-Pot/015-20110810-KM-pot.jpg");

                let sellEmbed = new Discord.RichEmbed()
                    .setTitle(`Enter the name of the strain you'd like to sell`)
                    .setColor([0, 200, 0])
                    .addField("strains:", `${countH} lbs of harlequin, ${countS} lbs sour-tsunami, ${countP} lbs pennywise, ${countA} lbs afghani, ${countT} lbs thai`)
                    .addField(`other:`, `${countCig} lbs tobacco`)
                    .addField("Bred strains:", `${countDA} lbs of dutch-amnesia-haze, ${countNL} lbs northern-lights, ${countSD} lbs sour-diesel, ${countPE} lbs pineapple-express, ${countBk} lbs bubba-kush`);

                let breedEmbed = new Discord.RichEmbed()
                    .setTitle(`Choose a male plant to pollinate with`)
                    .setColor([0, 200, 0])
                    .addField("Inventory:", `${countH} lbs of harlequin, ${countS} lbs sour-tsunami, ${countP} lbs pennywise, ${countT} lbs thai, ${countA} lbs afghani`);

                let stashEmbed = new Discord.RichEmbed()
                    .setTitle(`${msgObject.member.user.username}'s weed stock`)
                    .setColor([0, 200, 0])
                    .setImage("https://www.themarijuanaeffect.com/wp-content/uploads/2019/01/weed-storage.jpg")
                    .addField("stuff:", `${countH} lbs of harlequin, ${countS} lbs sour-tsunami, ${countP} lbs pennywise, ${countT} lbs thai, ${countA} lbs afghani`)
                    .addField(`other:`, `${countCig} lbs tobacco`)
                    .addField("Bred strains:", `${countDA} lbs of dutch-amnesia-haze, ${countNL} lbs northern-lights, ${countSD} lbs sour-diesel, ${countPE} lbs pineapple-express, ${countBk} lbs bubba-kush`);


                msgObject.channel.send(ranchEmbed).then(msg => {

                    (msg as Discord.Message).react('🚰').then(r => {

                        (msg as Discord.Message).react('🚜').then(r => {

                            (msg as Discord.Message).react('💰').then(r => {

                                (msg as Discord.Message).react('🤰').then(r => {

                                    (msg as Discord.Message).react('💼').then(r => {

                                        (msg as Discord.Message).react('👔')

                                        // Filters
                                        const waterFilter = (reaction, user) => reaction.emoji.name === '🚰' && user.id === msgObject.author.id;
                                        const harvestFilter = (reaction, user) => reaction.emoji.name === '🚜' && user.id === msgObject.author.id;
                                        const sellFilter = (reaction, user) => reaction.emoji.name === '💰' && user.id === msgObject.author.id;
                                        const breedFilter = (reaction, user) => reaction.emoji.name === '🤰' && user.id === msgObject.author.id;
                                        const stashFilter = (reaction, user) => reaction.emoji.name === '💼' && user.id === msgObject.author.id;
                                        const hireFilter = (reaction, user) => reaction.emoji.name === '👔' && user.id === msgObject.author.id;

                                        const water = (msg as Discord.Message).createReactionCollector(waterFilter);
                                        const harvestEve = (msg as Discord.Message).createReactionCollector(harvestFilter);
                                        const sell = (msg as Discord.Message).createReactionCollector(sellFilter);
                                        const breedEv = (msg as Discord.Message).createReactionCollector(breedFilter);
                                        const stash = (msg as Discord.Message).createReactionCollector(stashFilter);
                                        const hire = (msg as Discord.Message).createReactionCollector(hireFilter);

                                        //water*********************************************************************************************************************************
                                        water.on('collect', r => {

                                            r.remove(r.users.filter(u => !u.bot).first());

                                            (msg as Discord.Message).delete();
                                            msgObject.channel.send(`You successfully pissed on ya plants, ${msgObject.member.user.username}`)


                                        })
                                        //harvest****************************************************************************************************************************
                                        harvestEve.on('collect', r => {

                                            r.remove(r.users.filter(u => !u.bot).first());

                                            (msg as Discord.Message).delete();


                                            var harvestArr = new Array(12);

                                            harvestArr = [".", "harlequin", ".", "sour-tsunami", ".", "pennywise", ".", "thai", ".", "afghani", ".", "tobacco"];

                                            var num = (Math.floor((Math.random() * 11)));

                                            //var num = 9;


                                            if (num == 0 || num == 2 || num == 8 || num == 10) {
                                                msgObject.channel.send(`You were too blazed and failed to harvest anything,,,,`);
                                                return;

                                            }
                                            if (num == 4 || num == 6) {
                                                msgObject.channel.send(`yo shit ain't ready to harvest yet, playah`);
                                                return;

                                            }

                                            if (num == 1 || num == 3 || num == 5 || num == 7 || num == 9  || num == 11) {

                                                msgObject.channel.send(`You harvest 1lbs of ${harvestArr[num]}`);

                                                let newStrainName = harvestArr[num];

                                                ItemData.itemData.items.forEach(element => {

                                                    if (element.name.toLowerCase() == newStrainName.toLowerCase()) {
                                                        item = element;

                                                    }
                                                });

                                                db.push(`${msgObject.author.id}.items`, item.name);
                                                return;
                                            }



                                        })
                                        //SELL**************************************************************************************************************
                                        sell.on('collect', r => {

                                            r.remove(r.users.filter(u => !u.bot).first());

                                            (msg as Discord.Message).delete();

                                            function breedSeller(newStrainName) {

                                                ItemData.itemData.items.forEach(element => {

                                                    if (element.name.toLowerCase() == newStrainName.toLowerCase()) {
                                                        item = element;

                                                    }
                                                });


                                                function sellMore(itemF) {

                                                    const filterB = m => m.member.id === member.id;
                                                    msgObject.channel.send("How many lbs would you like to sell? (Enter a number only)");
                                                    msgObject.channel.awaitMessages(filterB, { max: 1, time: 60000 }).then(async collectedB => {

                                                        let answer = collectedB.first().content.toLowerCase();

                                                        let desAmt = parseInt(answer, 10);

                                                        if (isNaN(desAmt)) {

                                                            msgObject.channel.send("Enter a number nigga !!");

                                                            sellMore(itemF);
                                                        }

                                                        else {

                                                            const myValue = db.get(`${msgObject.author.id}.items`);

                                                            let cash = (itemF.price)*desAmt;

                                                            msgObject.channel.send(`${desAmt} lbs of ${itemF.name} was sold and ${cash} was deposited into your account`);

                                                            for (let i = 0; i < desAmt; i++) {


                                                                db.add(`${msgObject.author.id}.money`, itemF.price);

                                                                myValue.splice(myValue.indexOf(`${itemF.name}`), 1);

                                                                (db.set(`${msgObject.author.id}.items`, myValue));

                                                                //for sending to the bots inv
                                                                (db.push(`${client.user.id}.items`, itemF.name));


                                                            }


                                                        }


                                                    })



                                                }

                                                sellMore(item);


                                            }


                                            msgObject.channel.send(sellEmbed).then(msg => {

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
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "harlequin";
                                                                                            breedSeller(newStrainName);

                                                                                        }

                                                                                    })

                                                                                    sourTsunami.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countS == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "sour-tsunami";

                                                                                            breedSeller(newStrainName);

                                                                                        }

                                                                                    })

                                                                                    pennywise.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countP == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "pennywise";

                                                                                            breedSeller(newStrainName);
                                                                                        }

                                                                                    })

                                                                                    afghani.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countA == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "afghani";

                                                                                            breedSeller(newStrainName);
                                                                                        }

                                                                                    })

                                                                                    thai.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countT == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "thai";

                                                                                            breedSeller(newStrainName);
                                                                                        }

                                                                                    })

                                                                                    dutchAm.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countDA == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "dutch-amnesia-haze";

                                                                                            breedSeller(newStrainName);
                                                                                        }

                                                                                    })

                                                                                    northernLights.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countNL == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "northern-lights";

                                                                                            breedSeller(newStrainName);
                                                                                        }

                                                                                    })

                                                                                    sour.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countSD == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "sour-diesel";

                                                                                            breedSeller(newStrainName);
                                                                                        }

                                                                                    })

                                                                                    pineAp.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countPE == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "pineapple-express";

                                                                                            breedSeller(newStrainName);
                                                                                        }

                                                                                    })

                                                                                    bubba.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countBk == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "bubba-kush";

                                                                                            breedSeller(newStrainName);
                                                                                        }

                                                                                    })

                                                                                    cig.on('collect', r => {

                                                                                        r.remove(r.users.filter(u => !u.bot).first());

                                                                                        (msg as Discord.Message).delete();

                                                                                        if (countCig == 0) {
                                                                                            msgObject.channel.send("You ain't got any of that to sell, boss");
                                                                                        }
                                                                                        else {

                                                                                            let newStrainName = "tobacco";

                                                                                            breedSeller(newStrainName);
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

                                        })
                                        //breed*********************************************************************************************************************                               
                                        breedEv.on('collect', r => {

                                            r.remove(r.users.filter(u => !u.bot).first());

                                            (msg as Discord.Message).delete();

                                            var breedArr = new Array(10);

                                            var numB;

                                            let newTopStrainName;

                                            msgObject.channel.send(breedEmbed).then(msg => {

                                                (msg as Discord.Message).react('🇭').then(r => {

                                                    (msg as Discord.Message).react('🇸').then(r => {

                                                        (msg as Discord.Message).react('🇵').then(r => {

                                                            (msg as Discord.Message).react('🇦').then(r => {

                                                                (msg as Discord.Message).react('🇹')
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

                                                                    if (countH === 0) {
                                                                        msgObject.channel.send(`${msgObject.member.user.username} you don't have a male of that strain brotha`);
                                                                        return;
                                                                    }
                                                                    else {

                                                                        //deletes the first instance of "harlequin" in the array and then sets the new array
                                                                        const myValue = db.get(`${msgObject.author.id}.items`);

                                                                        myValue.splice(myValue.indexOf(`harlequin`), 1);

                                                                        (db.set(`${msgObject.author.id}.items`, myValue));

                                                                        breeder(numB, newTopStrainName, breedArr[0], item, msgObject);

                                                                        return;

                                                                    }

                                                                })

                                                                sourTsunami.on('collect', r => {

                                                                    r.remove(r.users.filter(u => !u.bot).first());

                                                                    (msg as Discord.Message).delete();


                                                                    if (countS == 0) {
                                                                        msgObject.channel.send(`${msgObject.member.user.username} you don't have a male of that strain brotha`);
                                                                        return;
                                                                    }
                                                                    else {
                                                                        //deletes the first instance of "sour-tsunami" in the array and then sets the new array
                                                                        const myValue = db.get(`${msgObject.author.id}.items`);

                                                                        myValue.splice(myValue.indexOf('sour-tsunami'), 1);

                                                                        (db.set(`${msgObject.author.id}.items`, myValue));

                                                                        breeder(numB, newTopStrainName, breedArr[0], item, msgObject);

                                                                        return;

                                                                    }

                                                                })

                                                                pennywise.on('collect', r => {

                                                                    r.remove(r.users.filter(u => !u.bot).first());

                                                                    (msg as Discord.Message).delete();

                                                                    if (countP == 0) {
                                                                        msgObject.channel.send(`${msgObject.member.user.username} you don't have a male of that strain brotha`);
                                                                        return;
                                                                    }
                                                                    else {
                                                                        //deletes the first instance of "pennywise" in the array and then sets the new array
                                                                        const myValue = db.get(`${msgObject.author.id}.items`);

                                                                        myValue.splice(myValue.indexOf('pennywise'), 1);

                                                                        (db.set(`${msgObject.author.id}.items`, myValue));


                                                                        breeder(numB, newTopStrainName, breedArr[0], item, msgObject);

                                                                        return;

                                                                    }

                                                                })

                                                                afghani.on('collect', r => {

                                                                    r.remove(r.users.filter(u => !u.bot).first());

                                                                    (msg as Discord.Message).delete();

                                                                    if (countA == 0) {
                                                                        msgObject.channel.send(`${msgObject.member.user.username} you don't have a male of that strain brotha`);
                                                                        return;
                                                                    }
                                                                    else {
                                                                        //deletes the first instance of "afghani" in the array and then sets the new array
                                                                        const myValue = db.get(`${msgObject.author.id}.items`);

                                                                        myValue.splice(myValue.indexOf('afghani'), 1);

                                                                        (db.set(`${msgObject.author.id}.items`, myValue));


                                                                        breeder(numB, newTopStrainName, breedArr[0], item, msgObject);

                                                                        return;

                                                                    }

                                                                })

                                                                thai.on('collect', r => {

                                                                    r.remove(r.users.filter(u => !u.bot).first());

                                                                    (msg as Discord.Message).delete();

                                                                    if (countT === 0) {
                                                                        msgObject.channel.send(`${msgObject.member.user.username} you don't have a male of that strain brotha`);
                                                                        return;
                                                                    }
                                                                    else {
                                                                        //deletes the first instance of "thai" in the array and then sets the new array
                                                                        const myValue = db.get(`${msgObject.author.id}.items`);

                                                                        myValue.splice(myValue.indexOf('thai'), 1);

                                                                        (db.set(`${msgObject.author.id}.items`, myValue));


                                                                        breeder(numB, newTopStrainName, breedArr[0], item, msgObject);

                                                                        return;

                                                                    }

                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })


                                        })

                                        //STOCK*********************************************************************************************************************
                                        stash.on('collect', r => {

                                            r.remove(r.users.filter(u => !u.bot).first());

                                            (msg as Discord.Message).delete();
                                            msgObject.channel.send(stashEmbed);


                                        })

                                        hire.on('collect', r => {

                                            function buyWorker(item){

                                                let actPrice:number = 0;


                                                if(countW >= 5 && countW < 10){

                                                    db.add(`${msgObject.author.id}.money`, -1000);

                                                    actPrice = 600;
                                                }
                                                
                                                if(countW >= 10 && countW < 15){

                                                    db.add(`${msgObject.author.id}.money`, -2000);

                                                    actPrice = 1600;
                                                }

                                                if(countW >= 15 && countW < 20){

                                                    db.add(`${msgObject.author.id}.money`, -3000);

                                                    actPrice = 2400;

                                                }

                                                actPrice = (actPrice+item.price)


                                                if (userMoney < actPrice) {

                                                    msgObject.channel.send(`you too poor, NIGGA !`);
                                                    return;
                                                }


                                                db.add(`${msgObject.author.id}.money`, -item.price);
                                                db.push(`${msgObject.author.id}.items`, item.name);

                                                msgObject.channel.send(`You successfully hired a ${item.name} for ${actPrice}`)

                                                return;


                                            }

                                            r.remove(r.users.filter(u => !u.bot).first());

                                            (msg as Discord.Message).delete();

                                            let userMoney: number = db.get(`${msgObject.author.id}.money`)

                                            let newWorker = "worker";

                                            var tempW = userItems;
                                            var countW = (tempW.match(/worker/g) || []).length;

                                            ItemData.itemData.items.forEach(element => {

                                                if (element.name.toLowerCase() == newWorker.toLowerCase()) {
                                                    item = element;

                                                }

                                            })


                                            if(countW >= 5 && countW < 10){



                                                if(countR >= 2){

                                                    buyWorker(item)

                                                    return;

                                                }

                                                else{

                                                    msgObject.channel.send("You must buy another ranch to hire more workers");
                                                    return;
                                                }

                                            }

                                            if(countW >= 10 && countW < 15){



                                                if(countR >= 3){

                                                    buyWorker(item)

                                                    return;

                                                }

                                                else{

                                                    msgObject.channel.send("You must buy another ranch to hire more workers");
                                                    return
                                                }

                                            }
                                            if(countW >= 15 && countW < 20){



                                                if(countR >= 4){

                                                    buyWorker(item)

                                                    return;

                                                }

                                                else{

                                                    msgObject.channel.send("You must buy another ranch to hire more workers");
                                                    return
                                                }

                                            }
                                            else {

                                                buyWorker(item)

                                                return;
                                            }

                                        })
                                    })
                                })
                            })
                        })
                    })
                 }) //.catch(collected => {
                //     msgObject.channel.send('ran outta time');
                // });

            }
        }
    }

}

