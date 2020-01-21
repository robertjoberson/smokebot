import * as Discord from "discord.js";
import * as db from "quick.db";
import {IBotCommand} from "../api";




export default class bet implements IBotCommand {

    private readonly _command = "bet"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let inAmt;

        let userMoney: number = db.get(`${msgObject.author.id}.money`)

        let thePlayer = msgObject.member.user.username;

        if(args.length < 1){
            
            inAmt = 1;
        }

        else{

            inAmt = parseInt((args.join(" ")), 10);  
        }

        if(isNaN(inAmt)){

            msgObject.channel.send("Enter a number, IDIOT !!");

            return;
        }

        if(userMoney < inAmt ){

            msgObject.channel.send(`you too poor, NIGGA !`);
            return;
        }


        let betAmt = inAmt;
        let slotFooter;
        let slotElems = new Array(16); 

        slotElems = ["♣", "♥", "♦", "⚫", "🔵",  "💰", "⛔", "🚫", "📛",  "🔴", "💼", "👛", "💵", "💲", "🔔", "🗑"];  // initialize each of the array's elements to 0

        var a1 = Math.floor(Math.random() * 15);

        var a2 = Math.floor(Math.random() * 15); 

        var a3 = Math.floor(Math.random() * 15); 

        var b1 = Math.floor(Math.random() * 15); 

        var b2 = Math.floor(Math.random() * 15); 

        var b3 = Math.floor(Math.random() * 15); 

        var c1 = Math.floor(Math.random() * 15); 

        var c2 = Math.floor(Math.random() * 15);

        var c3 = Math.floor(Math.random() * 15); 



        msgObject.channel.send(`**[  ${betAmt} TOKEns  ]**\n\| ${slotElems[a1]} | ${slotElems[a2]} | ${slotElems[a3]} |\n\| ${slotElems[b1]} | ${slotElems[b2]} | ${slotElems[b3]} | **<**\n\| ${slotElems[c1]} | ${slotElems[c2]} | ${slotElems[c3]} |`)
        .then(msg =>{

            a1 = Math.floor(Math.random() * 15);

            a2 = Math.floor(Math.random() * 15); 
    
            a3 = Math.floor(Math.random() * 15); 
    
            b1 = Math.floor(Math.random() * 15); 
    
            b2 = Math.floor(Math.random() * 15); 
    
            b3 = Math.floor(Math.random() * 15); 
    
            c1 = Math.floor(Math.random() * 15); 
    
            c2 = Math.floor(Math.random() * 15);
    
            c3 = Math.floor(Math.random() * 15);

            function newSlot(newFooter){

                db.add(`${msgObject.author.id}.money`, -inAmt);            
                db.add(`${msgObject.author.id}.money`, betAmt);
        
                (msg as Discord.Message).edit(`**[  ${inAmt} TOKEns  ]**\n\| ${slotElems[a1]} | ${slotElems[a2]} | ${slotElems[a3]} |\n\| ${slotElems[b1]} | ${slotElems[b2]} | ${slotElems[b3]} | **<**\n\| ${slotElems[c1]} | ${slotElems[c2]} | ${slotElems[c3]} |\n\ ${newFooter}`)

                return;
            }


            if(b1 == b2 && b1 == b3){

                if(b1 == 0 || b1 == 1 || b1 == 2 || b1 == 3 || b1 == 4){

                    betAmt = (betAmt*1);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);

                    newSlot(slotFooter);
                    return;

                }
                if(b1 == 5){

                    betAmt = (betAmt*4);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;

                }

                if(b1 == 6 || b1 == 7 || b1 == 8 || b1 == 9 || b1 == 10 || b1 == 11 || b1 == 12){

                    betAmt = (betAmt*2);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;

                }
                if(b1 == 13 || b1 == 14){

                    betAmt = (betAmt*3);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;
                }
            }

            if(b1 == b2){

                console.log("advanced");

                if(b1 == 0 || b1 == 1 || b1 == 2 || b1 == 3 || b1 == 4){

                    betAmt = (betAmt*2);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;
                }

                if(b1 == 5){

                    betAmt = (betAmt*10);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;

                }

                if(b1 == 6 || b1 == 7 || b1 == 8 || b1 == 9 || b1 == 10 || b1 == 11 || b1 == 12){

                    betAmt = (betAmt*3);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;

                }

                if(b1 == 13 || b1 == 14){

                    betAmt = (betAmt*5);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;

                }

            }

            if(b2 == b3){

                if(b2 == 0 || b2 == 1 || b2 == 2 || b2 == 3 || b2 == 4){

                    betAmt = (betAmt*2);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;
                }

                if(b2 == 5){

                    betAmt = (betAmt*10);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;
                }

                if(b2 == 6 || b2 == 7 || b2 == 8 || b2 == 9 || b2 == 10 || b2 == 11 || b2 == 12){

                    betAmt = (betAmt*3);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;
                }

                if(b2 == 13 || b2 == 14){

                    betAmt = (betAmt*5);

                    slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                    newSlot(slotFooter);
                    return;
                }

            }

            if((b1 == 5) && (b2 == 12) && (b3 == 13)){

                betAmt = (betAmt*15);

                slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                newSlot(slotFooter);
                return;
            }

            if((b1 == 13) && (b2 == 12) && (b3 == 5)){

                betAmt = (betAmt*10);

                slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                newSlot(slotFooter);
                return;
            }

            if((b1 == 12) && (b2 == 13) && (b3 == 5)){

                betAmt = (betAmt*5);

                slotFooter = (`${thePlayer} won ${betAmt}, what a bitch !`);
                newSlot(slotFooter);
                return;
            }


            else{

                betAmt = (betAmt*0);

                slotFooter = (`${thePlayer} lost their bet, what a dumb nigga !!`);
                newSlot(slotFooter);
                return;
            }
                
        });


    }


}