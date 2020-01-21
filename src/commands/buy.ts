import * as Discord from "discord.js";
import * as db from "quick.db";
import * as ItemData from "../itemData";
import { IBotCommand } from "../api";
import { itemModel } from "../models/itemModel";
import { simpleBuy } from "../functions/simpleBuy";

export default class buy implements IBotCommand {

    private readonly _command = "buy"


    help(): string {
        return "for buyin shit"
    }

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        msgObject.delete(0);

        if (args.length < 1) { return; }

        let newItemName = args.join(" ");

        let buyAmt;

        var tempC = newItemName;

        var countC: number = (tempC.match(/cig/g) || []).length;

        var countJ: number = (tempC.match(/joint/g) || []).length;
   
        var countB: number = (tempC.match(/blunt/g) || []).length;
    
        var countBo: number = (tempC.match(/bong/g) || []).length;
   
        var countD: number = (tempC.match(/dmt/g) || []).length;

        var countCr: number = (tempC.match(/crack/g) || []).length;

        var countPr: number = (tempC.match(/perhaps-counter/g) || []).length;

        var countStr: number = (tempC.match(/strap/g) || []).length;

        var realAmt: number;


        if(countC == 1){
            buyAmt = newItemName.replace('cig', ''); 
            newItemName = newItemName.replace(`${buyAmt}`, ''); 

            realAmt = parseInt(buyAmt, 10);
        }
        if(countJ == 1){
            buyAmt = newItemName.replace('joint', ''); 
            newItemName = newItemName.replace(`${buyAmt}`, ''); 

            realAmt = parseInt(buyAmt, 10);
        }
        if(countB == 1){
            buyAmt = newItemName.replace('blunt', ''); 
            newItemName = newItemName.replace(`${buyAmt}`, ''); 

            realAmt = parseInt(buyAmt, 10);
        }
        if(countBo == 1){
            buyAmt = newItemName.replace('bong', '');
            newItemName = newItemName.replace(`${buyAmt}`, ''); 

            realAmt = parseInt(buyAmt, 10);
        }

        if(countD == 1){
            buyAmt = newItemName.replace('dmt', ''); 
            newItemName = newItemName.replace(`${buyAmt}`, ''); 

            realAmt = parseInt(buyAmt, 10);
        }
        if(countCr == 1){
            buyAmt = newItemName.replace('crack', ''); 
            newItemName = newItemName.replace(`${buyAmt}`, ''); 

            realAmt = parseInt(buyAmt, 10);
        }
        if(countPr == 1){
            buyAmt = newItemName.replace('perhaps-counter', ''); 
            newItemName = newItemName.replace(`${buyAmt}`, ''); 

            realAmt = parseInt(buyAmt, 10);
        }
        if(countStr == 1){
            buyAmt = newItemName.replace('strap', ''); 
            newItemName = newItemName.replace(`${buyAmt}`, ''); 

            realAmt = parseInt(buyAmt, 10);
        }



        let item: itemModel = null;


        ItemData.itemData.items.forEach(element => {

            if (element.name.toLowerCase() == newItemName.toLowerCase()) {
                item = element;

            }
        });

        if (item === null) {

            msgObject.channel.send(`we ain't got that shit, RARTED BITCH !!`);
            return;

        }

        let userMoney: number = db.get(`${msgObject.author.id}.money`)

        if(userMoney < item.price){

            msgObject.channel.send(`you too poor, NIGGA !`);
            return;
        }

        if( countPr === 1 && (isNaN(realAmt) == false) ){
            
            msgObject.channel.send(`only one dumb nigger !!!`);
            return;
        }

//CIG
        if( countC === 1 && (isNaN(realAmt) == false) ){

            var num = buyAmt;

            if(userMoney < ((item.price)*num) ){

                msgObject.channel.send(`you too poor, NIGGA !`);
                return;
            }

            var i;
            for (i = 0; i < num; i++) { 

                var price = ((item.price)*num)

                db.add(`${msgObject.author.id}.money`, -item.price);
                db.push(`${msgObject.author.id}.items`, item.name);
            }

            msgObject.channel.send(`${msgObject.member.displayName} just bought:${num}x ${item.name} for ${price} TOKEns`);
            return;

        }
//BLUNT
        if( countB === 1 && (isNaN(realAmt) == false)){

            var num = buyAmt;

            if(userMoney < ((item.price)*num) ){

                msgObject.channel.send(`you too poor, NIGGA !`);
                return;
            }

            var i;
            for (i = 0; i < num; i++) { 

                var price = ((item.price)*num)

                db.add(`${msgObject.author.id}.money`, -item.price);
                db.push(`${msgObject.author.id}.items`, item.name);
            }

            msgObject.channel.send(`${msgObject.member.displayName} just bought:${num}x ${item.name} for ${price} TOKEns`);
            return;

        }
//CRACK
        if( countCr === 1 && (isNaN(realAmt) == false)){

            var num = buyAmt;

            if(userMoney < ((item.price)*num) ){

                msgObject.channel.send(`you too poor, NIGGA !`);
                return;
            }

            var i;
            for (i = 0; i < num; i++) { 

                var price = ((item.price)*num)

                db.add(`${msgObject.author.id}.money`, -item.price);
                db.push(`${msgObject.author.id}.items`, item.name);
            }

            msgObject.channel.send(`${msgObject.member.displayName} just bought:${num}x ${item.name} for ${price} TOKEns`);
            return;

        }
//BONG
        if( countBo === 1 && (isNaN(realAmt) == false)){

            var num = buyAmt;

            if(userMoney < ((item.price)*num) ){

                msgObject.channel.send(`you too poor, NIGGA !`);
                return;
            }

            var i;
            for (i = 0; i < num; i++) { 

                var price = ((item.price)*num)

                db.add(`${msgObject.author.id}.money`, -item.price);
                db.push(`${msgObject.author.id}.items`, item.name);
            }

            msgObject.channel.send(`${msgObject.member.displayName} just bought:${num}x ${item.name} for ${price} TOKEns`);
            return;

        }
//DMT
        if( countD === 1 && (isNaN(realAmt) == false)){

            var num = buyAmt;

            if(userMoney < ((item.price)*num) ){

                msgObject.channel.send(`you too poor, NIGGA !`);
                return;
            }

            var i;
            for (i = 0; i < num; i++) { 

                var price = ((item.price)*num)

                db.add(`${msgObject.author.id}.money`, -item.price);
                db.push(`${msgObject.author.id}.items`, item.name);
            }

            msgObject.channel.send(`${msgObject.member.displayName} just bought:${num}x ${item.name} for ${price} TOKEns`);
            return;

        }
        //STRAP
        if( countStr === 1 && (isNaN(realAmt) == false)){

            var num = buyAmt;

            if(userMoney < ((item.price)*num) ){

                msgObject.channel.send(`you too poor, NIGGA !`);
                return;
            }

            var i;
            for (i = 0; i < num; i++) { 

                var price = ((item.price)*num)

                db.add(`${msgObject.author.id}.money`, -item.price);
                db.push(`${msgObject.author.id}.items`, item.name);
            }

            msgObject.channel.send(`${msgObject.member.displayName} just bought:${num}x ${item.name} for ${price} TOKEns`);
            return;

        }

        else{

            simpleBuy(msgObject, item)

        return;
        }

        
    }


}