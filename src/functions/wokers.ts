import { itemModel } from "../models/itemModel";
import { arrToString } from "./arrToString";
import * as db from "quick.db";
import * as ItemData from "../itemData";

export function workers(message) {

    let mentionedUser = message.member;

    let tempUserItems = (db.get(`${message.author.id}.items`));

    if (typeof tempUserItems === 'undefined') {

        return;
    }

    let userItems: string = arrToString(tempUserItems);

    var tempR = userItems;

    var countW = (tempR.match(/worker/g) || []).length;

    let item: itemModel = null;

        //worker harvesting*************************************************************
        if (countW > 0) {

            var chanceHar = (Math.floor((Math.random() * 80) + 1));


            if (chanceHar == 1) {

                let strainNames = new Array(5);

                strainNames = ["harlequin", "sour-tsunami", "pennywise", "afghani", "thai"]

                var ranNum = (Math.floor((Math.random() * 6)));

                let actStrain = strainNames[ranNum];

                ItemData.itemData.items.forEach(element => {

                    if (element.name.toLowerCase() == actStrain.toLowerCase()) {
                        item = element;

                    }
                })

                for (let i = 0; i < countW; i++) {

                    db.push(`${message.author.id}.items`, item.name);

                }

                message.channel.send(`${mentionedUser} your workers have succesfully harvested ${countW} lbs of ${item.name}`);
                return;


            }

            let chanceOfDeath = (Math.floor((Math.random() * 100) + 1));

            if (chanceOfDeath == 5) {

                message.channel.send(`${mentionedUser} one of your workers died during a za stampede,,,, you now have one less worker,,, 😔`);

                const myValue = db.get(`${message.author.id}.items`);

                myValue.splice(myValue.indexOf('worker'), 1);

                (db.set(`${message.author.id}.items`, myValue));
                return;

            }

            if (chanceHar == 10) {
                let pay = (countW * 165);

                message.channel.send(`${mentionedUser} pay day boss, you pay your workers 165 TOKEns each for a total pay out of ${pay}`);

                db.add(`${message.author.id}.money`, -pay);
                return;
            }
        }

}