import * as Discord from "discord.js";
import * as ItemData from "../itemData";
import * as db from "quick.db";
import {IBotCommand} from "../api";
import { itemModel } from "../models/itemModel";
import { simpleBuy } from "../functions/simpleBuy";

function buy(msgObject, member, item: itemModel) {

    const filter = m => m.member.id === member.id;
    msgObject.channel.send(`${member}, looks like you out, would you like to buy one...? (yes/no)`);
    msgObject.channel.awaitMessages(filter, {max: 2, time: 35000}).then(collected => {

        if(collected.first().content.toLowerCase() === "no"){
            return;
        }

        if(collected.first().content.toLowerCase() === "yes"){

            simpleBuy(msgObject, item)
        }

    })


}

export default class smoke implements IBotCommand {

    private readonly _command = "smoke"


    help(): string {
        return "For smoking"
    }    
    
    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        if (args.length < 1){ return; }

        let smokedItem = args.join(" ");

        let item: itemModel = null;

        let mentionedUser: Discord.User = msgObject.member.user;

        let member = mentionedUser;


        //looks for all the items in the list of itemsDatas
            ItemData.itemData.items.forEach(element => {
            //if what we typed is equal to something in the itemData folder, then it sets it as the element
            if(element.name == smokedItem){
                item = element;
            }
            
        });


        if(item === null){

            msgObject.channel.send("you cant smoke that shit nigga")
            return;
        }


        let userItems: string = (db.get(`${msgObject.author.id}.items`) as string[]).join(" ");


        if(item.name === "joint"){

            var tempJ = userItems;
            var countJ = (tempJ.match(/joint/g) || []).length;

            if(countJ === 0){

                buy(msgObject, member, item)

            }
 
            else{
            //deletes the first instance of "joint" in the array and then sets the new array
            const myValue = db.get(`${msgObject.author.id}.items`);

            myValue.splice(myValue.indexOf('joint'), 1);
    
            (db.set(`${msgObject.author.id}.items`, myValue));

            let arJoint = new Array(25); 

            var p0 = "https://3a09223b3cd53870eeaa-7f75e5eb51943043279413a54aaa858a.ssl.cf3.rackcdn.com/local_13_temp-1429338656-5531fa20-620x348.jpg";
            var p1 = "https://media.nbcbayarea.com/images/652*469/marijuana_man+smoking+joint.jpg";
            var p2 = "https://i.kinja-img.com/gawker-media/image/upload/s--Y5IY78Jy--/c_scale,f_auto,fl_progressive,q_80,w_800/u7ddu3celqazf2rhq8xc.jpg";
            var p3 = "https://66.media.tumblr.com/4733b909a813643e37458b27aafadeb8/tumblr_mu21yqZoZm1sp74hho1_400.png";
            var p4 = "https://i.ytimg.com/vi/T0lRNgcW6KY/maxresdefault.jpg";
            var p5 = "https://media0.giphy.com/media/JOYL3w5eUSMZG/giphy.gif";
            var p6 = "http://www.islandbreath.org/2015Year/09/150906arnold.jpg";
            var p7 = "https://yodaisthebest.files.wordpress.com/2015/11/smoke-yoda-erryday.jpg";
            var p8 = "https://cannabisnow.com/wp-content/uploads/2015/12/Cannabis-Smoke-Responsible-Ambassador.jpg";
            var p9 = "https://www.verywellhealth.com/thmb/FiFXGu2GtJ4Kd4jzRrt-PA6KeVo=/5120x2880/smart/filters:no_upscale()/woman-smoking-joint-523097008-594d97235f9b58f0fc7bbe69.jpg";

            var p10 = "https://marijuanastox.com/wp-content/uploads/2018/04/mj1-25.jpg";
            var p11 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7lcy6p5vJUUsX8XxJV0wdGnEtR-WuZflRZ8lfaN3h0TLXIEqJ";
            var p12 = "https://www.closeup-shop.com/media/oart_0/oart_s/oart_56679/thumbs/521142_2102906.jpg";
            var p13 = "https://media.giphy.com/media/l4pT16cpZGdNAehUY/giphy.gif";
            var p14 = "https://i.imgur.com/qlF338w.gif";
            var p15 = "https://media3.giphy.com/media/BADcS2LyoZFlK/source.gif";
            var p16 = "https://66.media.tumblr.com/d3fd97dbabb0364eecd3b4aaefc6e15e/tumblr_mpqvihG8Pa1syced4o1_250.gif";
            var p17 = "http://66.media.tumblr.com/febcffb97744f16e3c7d930902afdd46/tumblr_mismxgtp5n1qg786lo1_500.gif";
            var p18 = "http://i.imgur.com/bPwOiwJ.gif";
            var p19 = "http://cdn.lowgif.com/small/d55bd66ce237cf8e-bob-marley-smoking-weed-tumblr.gif";

            var p20 = "https://media2.giphy.com/media/5UrW3JN3SiJx61iNRi/giphy.gif";
            var p21 = "https://cdn.vox-cdn.com/uploads/chorus_asset/file/12523231/QYkFVIN6TbKzZLiqsCvn_Weed_Fail.0.gif";
            var p22 = "https://www.medicalnewstoday.com/content//images/articles/323/323425/person-smoking-a-joint.jpg";
            var p23 = "https://www.cp24.com/polopoly_fs/1.3378998.1505150692!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg";
            var p24 = "https://cdn3.collective-evolution.com/assets/uploads/2016/11/weed.jpg";

            arJoint = [p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24];
            var ranP = (Math.floor(Math.random() * 24));


            let smokeEmbed = new Discord.RichEmbed()
            .setTitle(`${msgObject.member.displayName} smokes a ${item.name}`)
            .setColor([0, 200, 0])
            .setImage(arJoint[ranP])
            .setFooter("cough... cough....")

        msgObject.channel.send(smokeEmbed)
   
            }
        }

        if(item.name === "blunt"){

            var tempB = userItems;
            var countB = (tempB.match(/blunt/g) || []).length;

            if(countB === 0){

                buy(msgObject, member, item)

            }
            else{

            //deletes the first instance of "blunt" in the array and then sets the new array
            const myValue = db.get(`${msgObject.author.id}.items`);

            myValue.splice(myValue.indexOf('blunt'), 1);
            
            (db.set(`${msgObject.author.id}.items`, myValue));

            let arBlunt = new Array(25); 

            var p0 = "https://gethigher-gethighcom.netdna-ssl.com/wp-content/uploads/2018/05/smoking-a-blunt.jpg";
            var p1 = "http://weedmemes.com/wp-content/uploads/2016/04/garfield-cartoon-smoke-weed-memes.jpg";
            var p2 = "https://d.newsweek.com/en/full/615565/ny-lawmaker-introduces-legislation-that-would-add-womens-cramps-list-conditions-medical.png?w=600&e=40cd08c74281ad539e89e3b20896f09d";
            var p3 = "https://i.imgur.com/69AAeeG.jpg";
            var p4 = "https://2raw4tv.com/video/picture/gykguygyukguygykgygkuygyukgygkugcc.jpg";
            var p5 = "https://mcdn.wallpapersafari.com/medium/57/50/6bcInP.jpg";
            var p6 = "https://assets3.thrillist.com/v1/image/2784209/size/sk-2017_04_featured_listing_mobile.jpg";
            var p7 = "https://i.redd.it/ddz14ha6ove11.jpg";
            var p8 = "https://pbs.twimg.com/profile_images/442730502462910464/MbOIHmPw.jpeg";
            var p9 = "https://media3.giphy.com/media/ftdUGIeXOlE290OHjc/giphy.gif";

            var p10 = "https://i.imgur.com/EmqrjD0.jpg";
            var p11 = "http://weedmemes.com/wp-content/uploads/2017/10/et-wake-bake-memes-blunts-750x426.jpg";
            var p12 = "https://hw-static.worldstarhiphop.com/u/pic/2014/11/X5vR8do2bLIM.jpg";
            var p13 = "https://steamuserimages-a.akamaihd.net/ugc/929312308091756557/28543139F2896A77D8AA05566DCB5300D7D0E74D/";
            var p14 = "https://media.giphy.com/media/l2JdU5ThmLTkQRPEI/giphy.gif";
            var p15 = "https://i.gifer.com/HjDE.gif";
            var p16 = "http://giphygifs.s3.amazonaws.com/media/CoB1VA7w5cAjC/giphy.gif";
            var p17 = "https://media3.giphy.com/media/XgXZ4LiyVKoM7Ikk1B/giphy.gif";
            var p18 = "https://media.giphy.com/media/xTiTnkCSkEeBijjq00/giphy.gif";
            var p19 = "https://media0.giphy.com/media/XDRPimdD7Eucg/source.gif";

            var p20 = "https://media1.tenor.com/images/b6d4d5d99ab160c799d5773009c453fc/tenor.gif";
            var p21 = "http://66.media.tumblr.com/0c37141bd79ae07aac26aefc16964298/tumblr_mry57tCFwt1spxnqbo1_250.gif";
            var p22 = "https://media.giphy.com/media/c3ETeYpSKKXle/giphy.gif";
            var p23 = "https://images.rapgenius.com/9uqxqhthzzmvfe9tkwc3hs7l1.500x503x23.gif";
            var p24 = "https://thumbs.gfycat.com/SophisticatedPeriodicLadybird-size_restricted.gif";

            arBlunt = [p0,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22,p23,p24];
            var ranP = (Math.floor(Math.random() * 24));


            let smokeEmbed = new Discord.RichEmbed()
            .setTitle(`${msgObject.member.displayName} smokes a ${item.name}`)
            .setColor([0, 200, 0])
            .setImage(arBlunt[ranP])
            .setFooter("cough... cough....")

        msgObject.channel.send(smokeEmbed)
            }
    
        }


        if(item.name === "bong"){

            var tempBo = userItems;
            var countBo = (tempBo.match(/bong/g) || []).length;

            if(countBo === 0){
 
                buy(msgObject, member, item)

            }
            else{
            //deletes the first instance of "bong" in the array and then sets the new array
            const myValue = db.get(`${msgObject.author.id}.items`);

            myValue.splice(myValue.indexOf('bong'), 1);
                        
            (db.set(`${msgObject.author.id}.items`, myValue));

            let smokeEmbed = new Discord.RichEmbed()
            .setTitle(`${msgObject.member.displayName} takes a fat rip from da ${item.name}`)
            .setColor([0, 200, 0])
            .setImage("https://66.media.tumblr.com/bc6d095dea5991d68b38192053128d3f/tumblr_otv1f0oo5u1wrhno7o1_250.gif")
            .setFooter("cough... cough....")

        msgObject.channel.send(smokeEmbed)
            }
    
        }

        if(item.name === "dmt"){

            var tempD = userItems;
            var countD = (tempD.match(/dmt/g) || []).length;

            if(countD === 0){

                buy(msgObject, member, item)

            }

            else{
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

        if(item.name === "cig"){

    
            var tempC = userItems;
            var countC = (tempC.match(/cig/g) || []).length;


            if(countC === 0){

                buy(msgObject, member, item)

            }

            else{

            //deletes the first instance of "cig" in the array and then sets the new array
            const myValue = db.get(`${msgObject.author.id}.items`);

            myValue.splice(myValue.indexOf('cig'), 1);
                        
            (db.set(`${msgObject.author.id}.items`, myValue));


            let smokeEmbed = new Discord.RichEmbed()
            .setTitle(`${msgObject.member.displayName} smokes a ${item.name}`)
            .setColor([165, 42, 42])
            .setImage("https://media2.s-nbcnews.com/j/newscms/2015_20/1023251/150513-smoking-cigarette-jpo-508p_d58f1abb2c671a81b2ebca7a28816dc3.fit-760w.jpg")
            .setFooter("ah ,")

        msgObject.channel.send(smokeEmbed)
    
            }
        }


        if(item.name === "crack"){

    
            var tempCr = userItems;
            var countCr = (tempCr.match(/crack/g) || []).length;


            if(countCr === 0){

                buy(msgObject, member, item)

            }

            else{

            //deletes the first instance of "crack" in the array and then sets the new array
            const myValue = db.get(`${msgObject.author.id}.items`);

            myValue.splice(myValue.indexOf('crack'), 1);
                        
            (db.set(`${msgObject.author.id}.items`, myValue));


            let smokeEmbed = new Discord.RichEmbed()
            .setTitle(`${msgObject.member.displayName} smokes some ${item.name}`)
            .setColor([255,255,255])
            .setImage("https://cdni.rt.com/files/2016.01/article/568ea58cc36188c13b8b45f1.jpg")
            .setFooter("fuuuuuuuuuuuuuuuuuuuuuuuuuuuck")

        msgObject.channel.send(smokeEmbed)
    
            }
        }


    }



}