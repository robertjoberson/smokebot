import { itemModel } from "../models/itemModel";
import * as db from "quick.db";

export function simpleBuy(message, item: itemModel) {

    db.add(`${message.author.id}.money`, -item.price);
    db.push(`${message.author.id}.items`, item.name);
    message.channel.send(`${message.member.displayName} just bought: ${item.name} for ${item.price} TOKEns`);

}