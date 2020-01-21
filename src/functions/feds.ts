import * as db from "quick.db";
import { arrToString } from "./arrToString";

// keep up top
const fededRecently = new Set();

export function feds(message) {

    let mentionedUser = message.member;

    //let tempUserItems: string[] = (db.get(`${message.author.id}.items`) as string[]);

    let tempUserItems = (db.get(`${message.author.id}.items`));

    if (typeof tempUserItems === 'undefined') {

        return;
    }

    let userItems: string = arrToString(tempUserItems);

    var tempR = userItems;

    var countR = (tempR.match(/ranch/g) || []).length;

    var countStr = (tempR.match(/strap/g) || []).length;

    if (fededRecently.has(message.author.id)) {

        return;

    } else {


        if (countR > 0) {

            var fedNum = (Math.floor((Math.random() * 100) + 1));

            if (fedNum == 1) {
                message.channel.send(`${mentionedUser} your ranch is under siege by the feds, playah,,, strap up,,, ? (yes/no)`)
                let member = mentionedUser;
                //******************************************************************************* */
                const filter = m => m.member.id === member.id;
                message.channel.awaitMessages(filter, { max: 1, time: 35000 }).then(collected => {

                    if (collected.first().content.toLowerCase() === "yes") {

                        if (countStr == 0) {

                            message.channel.send(`${mentionedUser} you didn't have a strap boss,,, you were forced to work with the feds and pay a fine of 900,,`);
                            db.add(`${message.author.id}.money`, -900);
                            return;

                        }
                        else {
                            message.channel.send(`${mentionedUser}, you successfully defended your dog given right to smoke mary jane,,, but your strap is now too hot to keep, so you dump it,,,`)

                            const myValue = db.get(`${message.author.id}.items`);

                            myValue.splice(myValue.indexOf('strap'), 1);

                            (db.set(`${message.author.id}.items`, myValue));
                            return;
                        }


                    }

                    if (collected.first().content.toLowerCase() === "no") {
                        message.channel.send(`${mentionedUser} you gave in and the feds just fined you,,, 420 TOKEns`);
                        db.add(`${message.author.id}.money`, -420);
                        return;

                    }
                    else {
                        message.channel.send(`${mentionedUser} you did nothing so the feds confiscated your ranch,,,`);

                        const myValue = db.get(`${message.author.id}.items`);

                        myValue.splice(myValue.indexOf('ranch'), 1);

                        (db.set(`${message.author.id}.items`, myValue));
                        return;

                    }


                })

            }

            if (fedNum == 10) {


                db.add(`${message.author.id}.money`, -175);
                message.channel.send(`${mentionedUser} pays 175 TOKEns in ranch upkeep,,,,`);
                return;

            }

            if (fedNum == 5) {


                db.add(`${message.author.id}.money`, -150);
                message.channel.send(`${mentionedUser} pays 150 TOKEns in ranch upkeep,,,,`);
                return;

            }

        }

        // wont get feded for at least 5 min
        fededRecently.add(message.author.id);
        setTimeout(() => {
            // Removes the user from the set after a 5 min
            fededRecently.delete(message.author.id);
        }, 300000);
    }
}