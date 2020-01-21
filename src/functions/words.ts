import { wordModel } from "../models/wordModel";
import * as Discord from "discord.js";
import * as db from "quick.db";

export function banableWords(message) {

    var server = message.guild.id;

    let censoredWords: wordModel = db.get(`${server}.bannedWords`) as any;

    let word;

    let foundInText = false;
    for (var i in censoredWords) {

        // loops through the banned words list
        if (message.content.toLowerCase().includes(censoredWords[i].toLowerCase())) {

            word = censoredWords[i].toLowerCase();
            foundInText = true;
        }
    }

    if (message.author.bot) {

        return;
    }

    else {
        if (foundInText) {

            message.delete();

            message.channel.send(`Don't say ${word}`)
                .then(msg => {
                    (msg as Discord.Message).delete(3000);

                });
            message.author.send(`${message}`);
        }
    }
}

export function editedBanWords(oldMessage, newMessage) {

    var server = oldMessage.guild.id;

    let blacklisted: wordModel = db.get(`${server}.bannedWords`) as any;

    let word;

    //2 looking for words
    let foundInText = false;
    for (var i in blacklisted) { // loops through the blacklisted list
        if (newMessage.content.toLowerCase().includes(blacklisted[i].toLowerCase())) {

            word = blacklisted[i].toLowerCase();
            foundInText = true;
        }
    }
    // checks casesensitive words

    //3 deletes and send message
    if (newMessage.author.bot) { return; }

    else {
        if (foundInText) {
            newMessage.delete();

            newMessage.channel.send(`Don't say ${word}`)
                .then(msg => {
                    (msg as Discord.Message).delete(3000);

                });
        }
    }
}

export function checkWords(message) {

    // let check1 = (message.content.match(/[^ -~]+/g) || []).length;
    // let check2 = (message.content.match(/[\u00AD\u002D\u2011]+/g) || []).length;
    // let check3 = (message.content.match(/[\u200B\u200D\uFEFF]+/g) || []).length;

    // // check1 > 0 ||

    // if ( check2 > 0 || check3 > 0){

    //     message.delete();

    // }

}
