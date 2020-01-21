import * as db from "quick.db";


export function moneyWords(message){
    let basteWords = ["smoke", "weed", "420", "marijuana", "based", "cum", "epic", "hole", "rogan", "za"] //words put , after the word


    let foundInText = false;

    for (var i in basteWords) { 
        if (message.content.toLowerCase().includes(basteWords[i].toLowerCase())) foundInText = true;
    }
 

    if (foundInText) {

        let coinAmt = Math.floor(Math.random() * 10) + 1;


        db.add(`${message.author.id}.money`, +coinAmt);


    }
}

export function dmt(message){

    let basteWords = ["dmt"] 


    let foundInText = false;
    for (var i in basteWords) { 

        if (message.content.toLowerCase().includes(basteWords[i].toLowerCase())) 
        foundInText = true;
    }

    if (foundInText) {

        message.channel.send(`${message.member}, you ever heard of rogan?`);
    }
    

}

export function hedi(message){

    
    let basteWords = ["hedi"] 


    let foundInText = false;

    for (var i in basteWords) { 

        if (message.content.toLowerCase().includes(basteWords[i].toLowerCase())) 
        foundInText = true;
    }

    if (foundInText) {

        message.channel.send(`😢😭`);
    }
    

}