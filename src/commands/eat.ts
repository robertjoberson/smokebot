import * as Discord from "discord.js";
import * as db from "quick.db";
import { IBotCommand } from "../api";
import * as ItemData from "../itemData";
import { itemModel } from "../models/itemModel";
import { simpleBuy } from "../functions/simpleBuy";


function buy(msgObject, member, item: itemModel) {

    const filter = m => m.member.id === member.id;
    msgObject.channel.send(`${member}, looks like you out, would you like to buy one...? (yes/no)`);
    msgObject.channel.awaitMessages(filter, { max: 2, time: 35000 }).then(collected => {

        if (collected.first().content.toLowerCase() === "no") {
            return;
        }

        if (collected.first().content.toLowerCase() === "yes") {

            simpleBuy(msgObject, item)
        }

    })

}

export default class eat implements IBotCommand {

    private readonly _command = "eat"


    help(): string {
        return "This command does nothing"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        if (args.length < 1) { return; }

        let smokedItem = args.join(" ");

        let item: itemModel = null;

        let mentionedUser: Discord.User = msgObject.member.user;

        let member = mentionedUser;


        //looks for all the items in the list of itemsDatas
        ItemData.itemData.items.forEach(element => {
            //if what we typed is equal to something in the itemData folder, then it sets it as the element
            if (element.name == smokedItem) {
                item = element;
            }

        });


        if (item === null) {

            msgObject.channel.send("you cant smoke that shit nigga")
            return;
        }


        let userItems: string = (db.get(`${msgObject.author.id}.items`) as string[]).join(" ");


        if (item.name === "joint") {

            var tempJ = userItems;
            var countJ = (tempJ.match(/joint/g) || []).length;

            if (countJ === 0) {

                buy(msgObject, member, item)

            }
            else {

                msgObject.channel.send(`https://www.youtube.com/watch?v=-ZvagcC3Kng`)
            }
        }

        if (item.name === "blunt") {

            var tempB = userItems;
            var countB = (tempB.match(/blunt/g) || []).length;

            if (countB === 0) {

                buy(msgObject, member, item)

            }
            else {

                msgObject.channel.send(`https://www.youtube.com/watch?v=-ZvagcC3Kng`)
            }

        }


        if (item.name === "bong") {

            msgObject.channel.send("You can't eat a bong nigga !");

        }

        if (item.name === "dmt") {

            var tempD = userItems;
            var countD = (tempD.match(/dmt/g) || []).length;

            if (countD === 0) {

                buy(msgObject, member, item)

            }

            else {
                //deletes the first instance of "dmt" in the array and then sets the new array
                const myValue = db.get(`${msgObject.author.id}.items`);

                myValue.splice(myValue.indexOf('dmt'), 1);

                (db.set(`${msgObject.author.id}.items`, myValue));

                let smokeEmbed = new Discord.RichEmbed()
                    .setTitle(`${msgObject.member.displayName} enters the aether......`)
                    .setColor([0, 200, 0])
                    .setImage("https://media0.giphy.com/media/SSvCdDADOx8li/giphy.gif")
                    .setFooter("woah.............")

                msgObject.channel.send(smokeEmbed)
            }
        }

        if (item.name === "cig") {


            var tempC = userItems;
            var countC = (tempC.match(/cig/g) || []).length;


            if (countC === 0) {

                buy(msgObject, member, item)

            }

            else {

                msgObject.channel.send(`https://www.youtube.com/watch?v=-ZvagcC3Kng`)
            }
        }


        if (item.name === "crack") {

            var tempCr = userItems;
            var countCr = (tempCr.match(/crack/g) || []).length;


            if (countCr === 0) {

                buy(msgObject, member, item)

            }

            else {

                //deletes the first instance of "crack" in the array and then sets the new array
                const myValue = db.get(`${msgObject.author.id}.items`);

                myValue.splice(myValue.indexOf('crack'), 1);

                (db.set(`${msgObject.author.id}.items`, myValue));


                let smokeEmbed = new Discord.RichEmbed()
                    .setTitle(`${msgObject.member.displayName} smokes some ${item.name}`)
                    .setColor([255, 255, 255])
                    .setImage("https://cdni.rt.com/files/2016.01/article/568ea58cc36188c13b8b45f1.jpg")
                    .setFooter("fuuuuuuuuuuuuuuuuuuuuuuuuuuuck")

                msgObject.channel.send(smokeEmbed)

            }
        }

        if (item.name === "twix") {

            var tempTw = userItems;
            var countTw = (tempTw.match(/twix/g) || []).length;


            if (countTw === 0) {

                buy(msgObject, member, item)

            }

            else {

                //deletes the first instance of "crack" in the array and then sets the new array
                const myValue = db.get(`${msgObject.author.id}.items`);

                myValue.splice(myValue.indexOf('twix'), 1);

                (db.set(`${msgObject.author.id}.items`, myValue));

                let smokeEmbed = new Discord.RichEmbed()
                    .setTitle(`${msgObject.member.displayName} enjoys delicious and nutritious ${item.name}`)
                    .setColor([101, 67, 33])
                    .setImage("https://cdn.discordapp.com/attachments/609378055441612819/668612769943126026/CwtIZnkUcAAd5lR.png")
                    .setFooter("fuuuuuuuuuuuuuuuuuuuuuuuuuuuck")

                msgObject.channel.send(smokeEmbed)

            }
        }


    }


}


