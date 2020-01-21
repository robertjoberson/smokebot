import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as db from "quick.db";

const Attachment = require('discord.js');
const Canvas = require('canvas');



const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;

	} while (ctx.measureText(text).width > canvas.width - 300);


	return ctx.font;
};

export default class profile implements IBotCommand {

    private readonly _command = "profile"


    help(): string {
        return "This command does nothing"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let member;
        let mentionedUser: Discord.User;
        let memberAva;

        if(msgObject.mentions.users.size > 0) {

            member = msgObject.mentions.members.first();

            mentionedUser = msgObject.mentions.users.first();

            memberAva = member.user.displayAvatarURL;




        }
        else{
            member  = msgObject.member;

            mentionedUser = msgObject.member.user;

            memberAva = msgObject.member.user.displayAvatarURL;

        }

        // dutchId = member.roles.some(role => role.name === 'd*tch');
        // nonSmokeId = member.roles.some(role => role.name === "People Who Don't Smoke");



        let userMoney = db.get(`${mentionedUser.id}.money`)
        let userItems: string = (db.get(`${mentionedUser.id}.items`) as string[]).join(" ");
        let userCum: number = db.get(`${mentionedUser.id}.cumCount`);

        if(userCum == null){

            userCum = 0;
        }



                               
                            
        var tempH = userItems;
        var countH = (tempH.match(/harlequin/g) || []).length;
        var Hnet = (countH*600);

        var tempS = userItems;
        var countS = (tempS.match(/sour-tsunami/g) || []).length;
        var Snet = (countS*600);


        var tempP = userItems;
        var countP = (tempP.match(/pennywise/g) || []).length;
        var Pnet = (countP*600);

        var tempA = userItems;
        var countA = (tempA.match(/afghani/g) || []).length;
        var Anet = (countA*600);

        var tempT = userItems;
        var countT = (tempT.match(/thai/g) || []).length;
        var Tnet = (countT*600);

        var strainNet = (Hnet+Snet+Pnet+Anet+Tnet);

                       
                            
        var tempH = userItems;
        var countH = (tempH.match(/dutch-amnesia-haze/g) || []).length;

        var tempS = userItems;
        var countS = (tempS.match(/northern-lights/g) || []).length;

        var tempP = userItems;
        var countP = (tempP.match(/sour-diesel/g) || []).length;

        var tempA = userItems;
        var countA = (tempA.match(/pineapple-express/g) || []).length;

        var tempT = userItems;
        var countT = (tempT.match(/bubba-kush/g) || []).length;


        var DAnet = (countH*900);

        var Nnet = (countS*900);


        var SDnet = (countP*900);

        var PEnet = (countA*900);

        var Bknet = (countT*900);

        var topStrainNet = (DAnet+Nnet+SDnet+PEnet+Bknet);


        var tempJ = userItems;
        var countJ = (tempJ.match(/joint/g) || []).length;
        var Jnet = (countJ*10);

        var tempB = userItems;
        var countB = (tempB.match(/blunt/g) || []).length;
        var Bnet = (countB*15);

        var tempBo = userItems;
        var countBo = (tempBo.match(/bong/g) || []).length;
        var Bonet = (countBo*45);

        var tempD = userItems;
        var countD = (tempD.match(/dmt/g) || []).length;
        var Dnet = (countD*100);

        var tempC = userItems;
        var countC = (tempC.match(/cig/g) || []).length;
        var Cnet = (countC*5);

        var tempCr = userItems;
        var countCr = (tempCr.match(/crack/g) || []).length;
        var Crnet = (countCr*20);

        var tempR = userItems;
        var countR = (tempR.match(/ranch/g) || []).length;
        var Rnet = (countR*100);

        var itemNet = (Jnet+Bnet+Bonet+Dnet+Cnet+Crnet+Rnet);


        let totalNet = (userMoney+itemNet+topStrainNet+strainNet);

        var tempPer = userItems;
        var countPer = (tempPer.match(/perhaps-counter/g) || []).length;


        var tempPerTot = userItems;
        var countPerTot = (tempPerTot.match(/perhaps ,/g) || []).length;



                               



        const canvas = Canvas.createCanvas(700, 300);
        const ctx = canvas.getContext('2d');
    
        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/609378055441612819/619067215748268034/434807-Joker-Heath_Ledger-monochrome-dark-748x421.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    

        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`Net worth: ${totalNet} TOKEns`, canvas.width / 3.0 , canvas.height / 1.1);

        if(countR >= 1){

            //this should be badges
            ctx.font = '28px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`Weed Rancher`, canvas.width / 3.0 , canvas.height / 2.4);
        }

        if(countPer >= 1){

            //perhaps count
            ctx.font = '28px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`perhaps , count: ${countPerTot}`, canvas.width / 3.0 , canvas.height / 2.0);
        }
            //cum Count
            ctx.font = '25px sans-serif';
            ctx.fillStyle = '#FF0000';
            ctx.fillText(`💦: ${userCum}`, canvas.width / 8.5 , canvas.height / 1.1);

        
        // Add an exclamation point here and below
        ctx.font = applyText(canvas, `${member.displayName}`);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${member.displayName}`, canvas.width / 3.0, canvas.height / 3.5);

        if(countH >= 1){
            const DAbadge = await Canvas.loadImage('https://d3ix816x6wuc0d.cloudfront.net/sativa/amnesia-haze/badge?width=340');
            ctx.drawImage(DAbadge, 507, 35, 80, 80);
    }
        if(countS >= 1){
            const NLbadge = await Canvas.loadImage('https://d3ix816x6wuc0d.cloudfront.net/indica/northern-lights/badge');
            ctx.drawImage(NLbadge, 605, 35, 80, 80);
        }
        if(countP >= 1){
            const SDbadge = await Canvas.loadImage('https://d3ix816x6wuc0d.cloudfront.net/sativa/sour-diesel/badge');
            ctx.drawImage(SDbadge, 605, 120, 80, 80);
        }
        if(countA >= 1){
            const PEbadge = await Canvas.loadImage('https://d3ix816x6wuc0d.cloudfront.net/hybrid/pineapple-express/badge?width=340');
            ctx.drawImage(PEbadge, 507, 120, 80, 80);
        }
        if(countT >= 1){
            const BKbadge = await Canvas.loadImage('https://d3ix816x6wuc0d.cloudfront.net/indica/bubba-og/badge?width=340');
            ctx.drawImage(BKbadge, 605, 205, 80, 80);
        }

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const avatar = await Canvas.loadImage(memberAva);
        ctx.drawImage(avatar, 25, 25, 200, 200);
    
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'profile-image.png');
    
        msgObject.channel.send(`${member}`, attachment);



    }


}