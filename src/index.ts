import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import * as db from "quick.db";
import { IBotCommand } from "./api";
import { isNull } from "util";
import { itemModel } from "./models/itemModel";
import * as ItemData from "./itemData";
import { banableWords, editedBanWords, checkWords } from "./functions/words";
import { moneyWords, dmt, hedi } from "./functions/cashWords";
import { randomSentence } from "./functions/randomSent";
import { arrToString } from "./functions/arrToString";
import { workers } from "./functions/wokers";
import { feds } from "./functions/feds";
import { repFunc } from "./functions/repFunc";

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];


loadCommands(`${__dirname}/commands`)

function nonSmoke(member: Discord.GuildMember) {


    let memberRole = member.guild.roles.find(role => role.name == "People Who Don't Smoke");
    member.addRole(memberRole);

}


client.on("ready", () => {
    
    client.user.setActivity("TOOL (s!help)", { type: "LISTENING" });

    let allUsers = client.users.array();
    for (let i = 0; i < allUsers.length; i++) {

        if (isNull(db.get(allUsers[i].id))) {

            db.set(allUsers[i].id, { money: 50, items: [], rep: 0 })
            // db.set(allUsers[i].id, { rep: 1 })
        }

    }

    let allServers = client.guilds.array();

    for (let i = 0; i < allServers.length; i++) {

        if (isNull(db.get(allServers[i].id))) {

            db.set(allServers[i].id, { bannedWords: [] })
        }

    }

    console.log("ready to go");
})


client.on("guildCreate", daServer => {

    var server = daServer.id;

    if (isNull(db.get(server))) {

        db.set(server, { bannedWords: [] })

        console.log(`${daServer.name} has been added`);
    }

})

client.on("guildMemberAdd", async member => {

    if (isNull(db.get(member.id))) {

        db.set(member.id, { money: 50, items: [] })
        db.set(member.id, { rep: 1 })
    }


    if (member.guild.channels.find(channel => channel.name === "posting")) {
        let welcomeChannel = member.guild.channels.find(channel => channel.name === "posting") as Discord.TextChannel;

        welcomeChannel.send(`Do you smoke, ${member}?`)
    }
    else {

        return;
    }


})


client.on("message", msg => {

    if (msg.author.bot) {

        return;
    }


    if (msg.content.toLowerCase() === "i dont smoke") {
        nonSmoke(msg.member);
        msg.reply("I hate non-smokers.....");
        return;
    }

    if (msg.content.toLowerCase() === "i don't smoke") {
        nonSmoke(msg.member);
        msg.reply("I hate non-smokers.....");
        return;
    }

    if (msg.content.toLowerCase() === "i hate smokers") {
        nonSmoke(msg.member);
        msg.reply("are you looking to die.....?");
        return;
    }


});


client.on("message", msg => {

    randomSentence(msg);

});



client.on("message", msg => {

    if (msg.content.toLowerCase() === "ah ,") {
        msg.reply("oh?");
        return;
    }

    let tempUserItems = (db.get(`${msg.author.id}.items`));

    if (typeof tempUserItems === 'undefined') {

        return;
    }

    let userItems: string = arrToString(tempUserItems);

    var tempPer = userItems;
    var countPer = (tempPer.match(/perhaps-counter/g) || []).length;

    if (countPer >= 1) {

        if (msg.content.toLowerCase() === "perhaps ,") {


            let item: itemModel = null;

            let newItemName = msg.content.toLowerCase();


            ItemData.itemData.items.forEach(element => {

                if (element.name.toLowerCase() == newItemName.toLowerCase()) {
                    item = element;

                }
            });

            if (item === null) {

                msg.channel.send(`we ain't got that shit, RARTED BITCH !!`);
                return;

            }

            db.push(`${msg.author.id}.items`, item.name);

            return;
        }
    }

    if (msg.content.toLowerCase() === "ah,") {
        msg.reply("oh...?");
        return;
    }

    if (msg.content.toLowerCase() === "oh?") {
        msg.reply("ah ,");
        return;
    }

    if (msg.content.toLowerCase() === "oh ?") {
        msg.reply("ah,");
        return;
    }

    if (msg.content.toLowerCase() === "ja") {
        msg.reply("joa... ?");
        return;
    }

    if (msg.content.toLowerCase() === "ja ,") {
        msg.reply("joa ?");
        return;
    }


});


client.on('messageUpdate', (oldMessage, newMessage) => {

    editedBanWords(oldMessage, newMessage);

});


client.on('message', async message => {


    //to leave servers
    // if(message.author.bot){

    //     message.guild.leave()  
    //     .then(g => console.log(`Left the guild ${g}`))
    //     .catch(console.error);
        
    // }

    dmt(message);
    hedi(message);
    moneyWords(message);
    workers(message);
    feds(message);
    repFunc(message);


    try {
        
        checkWords(message);

        banableWords(message);


    } catch (e) {
        console.log('the ID shows as null');
    }

});


client.on("message", msg => {

    if (msg.channel.type == "dm") {

        return;

    }


    //ignore message if sent by bot
    if (msg.author.bot) {

        return;

    }

    //ignore if doesnt have prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) {

        return;

    }

    //handle the command 
    handleCommand(msg);

})

async function handleCommand(msg: Discord.Message) {

    //split the string into the command and all of the args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

    //loop through all our loaded commands
    for (const commandClass of commands) {

        //attempt to execute code but ready in case of possible error
        try {
            //check if our commandClass is the correct one
            if (!commandClass.isThisCommand(command)) {

                //go to next iteration of the loop if this isnt the correct commandClass
                continue;
            }

            await commandClass.runCommand(args, msg, client);
        }
        catch (exception) {

            console.log(exception);
        }
    }

}

function loadCommands(commandsPath: string) {

    //exit if no commands
    if (!ConfigFile.config.commands || (ConfigFile.config.commands as string[]).length === 0) { return; }

    //loop through all commands in our config file
    for (const commandName of ConfigFile.config.commands as string[]) {

        const commandClass = require(`${commandsPath}/${commandName}`).default;

        const command = new commandClass() as IBotCommand;

        commands.push(command);
    }

}


client.login(ConfigFile.config.token);