import * as db from "quick.db";
import * as Discord from "discord.js";

// keep up top
const fededRecently = new Set();

export function repFunc(message) {

    let mentionedUser: Discord.User;

    if (message.mentions.users.size > 0) {

        mentionedUser = message.mentions.users.first()

    }

    else {

        return;
    }

    if (fededRecently.has(message.author.id)) {

        return;

    } else {

    let repTier: string[] = ["+rep", "++rep", "+++rep", "-rep", "--rep", "---rep"];

    let typeOfRep: string;

    let amtRep: number;

    let foundInText = false;
    for (var i in repTier) {

        // loops through the banned words list
        if (message.content.toLowerCase().includes(repTier[i].toLowerCase())) {

            typeOfRep = repTier[i].toLowerCase();
            foundInText = true;
        }
    }

    if (message.author.bot) {

        return;
    }

    else {
        if (foundInText) {

            if (typeOfRep == repTier[0]) {

                amtRep = 1;

            }
            if (typeOfRep == repTier[1]) {

                amtRep = 2;

            }
            if (typeOfRep == repTier[2]) {

                amtRep = 3;

            }
            //******************************************* */
            if (typeOfRep == repTier[3]) {

                amtRep = -1;

            }
            if (typeOfRep == repTier[4]) {

                amtRep = -2;

            }
            if (typeOfRep == repTier[5]) {

                amtRep = -3;

            }

            if (mentionedUser == message.member.user) {

                message.channel.send("you can't rep yourself....")
                    .then(msg => {
                        (msg as Discord.Message).delete(3000);

                    });

                return;

            }

            db.add(`${mentionedUser.id}.rep`, amtRep);
            let userRep: number = db.get(`${mentionedUser.id}.rep`);

            message.channel.send(`${mentionedUser}'s rep is now ${userRep}`)
                .then(msg => {
                    (msg as Discord.Message).delete(3000);

                });

        }

                // wont get feded for at least 5 min
                fededRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after a 5 min
                    fededRecently.delete(message.author.id);
                }, 100000);
    }
}

}