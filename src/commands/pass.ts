import * as Discord from "discord.js";
import * as ItemData from "../itemData";
import * as db from "quick.db";
import { IBotCommand } from "../api";
import { itemModel } from "../models/itemModel";
import { simpleBuy } from "../functions/simpleBuy";

// at top
const tooManyTries = new Set();

export default class pass implements IBotCommand {

    private readonly _command = "pass"


    help(): string {
        return "passin dat shit"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if (args.length < 1) { return; }

        let userItems: string = (db.get(`${msgObject.author.id}.items`) as string[]).join(" ");

        let mentionedUser: Discord.User;

        if (msgObject.mentions.users.size > 0) {


            mentionedUser = msgObject.mentions.users.first();

            //ignore message if sent by bot
            if (mentionedUser.bot) {

                msgObject.channel.send("Sorry,,,, I have enough for myself");
                return;
            }

        }

        else {
            mentionedUser = msgObject.member.user;
            msgObject.channel.send("You can't pass to yourself... or can you...?");

            return;
        }


        let passItem = args[0];

        let item: itemModel = null;

        //looks for all the items in the list of itemsDatas
        ItemData.itemData.items.forEach(element => {
            //if what we typed is equal to something in the itemData folder, then it sets it as the element
            if (element.name == passItem) {

                item = element;
            }

        });

        if (item === null) {

            msgObject.channel.send("you cant smoke that shit nigga")

            msgObject.channel.send("Format: s!pass item @user")
            return;
        }

        let member = mentionedUser;

        function sendItem(item: itemModel, img, footer) {

            let tit;

            //deletes the first instance of "joint" in the array and then sets the new array
            const myValue = db.get(`${msgObject.author.id}.items`);

            myValue.splice(myValue.indexOf(`${item.name}`), 1);

            (db.set(`${msgObject.author.id}.items`, myValue));

            db.push(`${mentionedUser.id}.items`, item.name);

            if (item.name == "dmt") {

                tit = `you need to hit this shit bro.... ${mentionedUser.username}`;

            }
            else {

                tit = `${msgObject.member.displayName} passes da ${item.name} to ${mentionedUser.username}`;
            }

            let passEmbed = new Discord.RichEmbed()
                .setTitle(`${tit}`)
                .setColor([165, 42, 42])
                .setImage(img)
                .setFooter(footer)

            msgObject.channel.send(passEmbed)

            return;

        }

        function buyItem(item: itemModel) {

            simpleBuy(msgObject, item)

        }

        function itemAmtCheck(itemCheck) {

            if (itemCheck === 0) {

                member = msgObject.member.user;

                const filter = m => m.member.id === member.id;
                msgObject.channel.send(`${member}, looks like you out, would you like to buy one...? (yes/no)`);
                msgObject.channel.awaitMessages(filter, { max: 2, time: 35000 }).then(collected => {

                    if (collected.first().content.toLowerCase() === "no") {
                        return;
                    }

                    if (collected.first().content.toLowerCase() === "yes") {

                        buyItem(item);

                        sendItem(item, img, footer);
                        return;
                    }

                })

            }

            else {

                sendItem(item, img, footer);
                return;
            }


        }

        let img;
        let footer;

        let answer;


        function askAgain(answer) {

            const filter = m => m.member.id === member.id;

            msgObject.channel.send(`${member}, Do you accept...? (yes/no)`)//.then(() => {
            msgObject.channel.awaitMessages(filter, { max: 2, time: 35000, errors: ['time'] }).then(collected => {

                answer = collected.first().content.toLowerCase();

                if (answer === "yes") {

                    if (item.name === "joint") {

                        img = "https://www.boomercafe.com/wp-content/uploads/2015/04/joint_weed.jpg";
                        footer = "cough... cough.... enjoy brotha";

                        var tempJ = userItems;
                        var countJ = (tempJ.match(/joint/g) || []).length;

                        itemAmtCheck(countJ);
                        return;

                    }

                    if (item.name === "blunt") {

                        img = "https://916thc.com/wp-content/uploads/2018/03/girl-passing-joint-used-4-cloud.png";
                        footer = "cough... cough.... enjoy brotha";

                        var tempB = userItems;
                        var countB = (tempB.match(/blunt/g) || []).length;

                        itemAmtCheck(countB);
                        return;

                    }


                    if (item.name === "bong") {

                        img = "https://media1.tenor.com/images/98e3a44455b8a46d697536cc8805cc0d/tenor.gif";
                        footer = "cough... cough.... enjoy brotha";


                        var tempBo = userItems;
                        var countBo = (tempBo.match(/bong/g) || []).length;

                        itemAmtCheck(countBo);
                        return;

                    }

                    if (item.name === "dmt") {

                        img = "https://media3.giphy.com/media/WiXTVfLUIaX5K/giphy.gif";
                        footer = "woah.............";


                        var tempD = userItems;
                        var countD = (tempD.match(/dmt/g) || []).length;

                        itemAmtCheck(countD);
                        return;

                    }



                    if (item.name === "blowjob") {

                        let smokeEmbed = new Discord.RichEmbed()
                            .setTitle(`bro just take your pants off and let me do all the work... ${mentionedUser.username}`)
                            .setColor([0, 200, 0])
                            .setImage("https://66.media.tumblr.com/5f5466ae935c62787cba8b3d5a058f0e/tumblr_phyq8gUNOc1xqr2fio1_540.gif")
                            .setFooter(".... enjoy brotha")

                        msgObject.channel.send(smokeEmbed)
                        return;

                    }

                    if (item.name === "kiss") {

                        let smokeEmbed = new Discord.RichEmbed()
                            .setTitle(`come gimmie a smooch big boy,,,, ${mentionedUser.username}`)
                            .setColor([0, 200, 0])
                            .setImage("https://cdn.discordapp.com/attachments/562824294997164032/620663689124642848/unknown.png")
                            .setFooter("mmmmmmmmmmmmm..... soft,,,,,")

                        msgObject.channel.send(smokeEmbed)
                        return;

                    }

                    if (item.name === "cig") {

                        img = "https://live.staticflickr.com/118/392276781_84d065e4f1_z.jpg";
                        footer = "cough... cough.... yep, enjoy brotha";

                        var tempC = userItems;
                        var countC = (tempC.match(/cig/g) || []).length;

                        itemAmtCheck(countC);
                        return;
                    }

                    if (item.name === "twix") {

                        img = "https://cdn.discordapp.com/attachments/609378055441612819/667934987294605331/Twix.png";
                        footer = "a delicious choco log....";

                        var tempTw = userItems;
                        var countTw = (tempTw.match(/twix/g) || []).length;

                        itemAmtCheck(countTw);
                        return;
                    }


                    if (item.name === "crack") {

                        img = "https://i.pinimg.com/originals/fb/eb/28/fbeb28878e758b51b1417396b80ab3ae.jpg";
                        footer = "here's some Kibbles n’ Bits, enjoy brotha";

                        var tempCr = userItems;
                        var countCr = (tempCr.match(/crack/g) || []).length;

                        itemAmtCheck(countCr);
                        return;

                    }

                }
                if (answer === "no") {

                    msgObject.reply("They're non-smokers....");
                    return;
                }
                else {

                    // adds up to three tries and then closes
                    let tries = (tooManyTries.size) + 1;

                    tooManyTries.add(tries);
                    tries = (tooManyTries.size) + 1;

                    if(tries == 4){

                        msgObject.channel.send("ight...");

                        return;

                    }
                    else{

                        msgObject.channel.send("try that again playah");
                        askAgain(answer)

                    }

                }


            })
            // .catch(collected => {
            //     msgObject.channel.send('dumb nigga didn\'t answer');
            // });
            //});

        }

        askAgain(answer)

    }



}