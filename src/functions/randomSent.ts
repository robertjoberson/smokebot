import * as Discord from "discord.js";

export function randomSentence(msg){

    let mentionedUser: Discord.User;


    if (msg.mentions.users.size > 0) {
        mentionedUser = msg.mentions.users.first();

        if (mentionedUser.id == "609383913822879755") {


            var words = Array();
            words[0] = new Array("time", "person", "year", "way", "day", "thing", "man", "world", "life", "hand", "part", "child", "eye", "woman", "place", "work", "week", "case", "point", "government", "company", "number", "group", "problem", "fact");
            words[1] = new Array("be", "have", "do", "say", "get", "make", "go", "know", "take", "see", "come", "think", "look", "want", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try", "leave", "call");
            words[2] = new Array("good", "new", "first", "last", "long", "great", "little", "own", "other", "old", "right", "big", "high", "different", "small", "large", "next", "early", "young", "important", "few", "public", "bad", "same", "able");
            words[3] = new Array("to", "of", "in", "for", "on", "with", "at", "by", "from", "up", "about", "into", "over", "after", "as", "between", "out", "against", "during", "without", "before", "under", "around", "among", "through");
            words[4] = new Array("the", "and", "a", "that", "I", "it", "not", "he", "as", "you", "this", "but", "his", "they", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their");
            words[5] = new Array("za", "cum", "penis", "vagene", "hole", "sex", "gay", "epic", "style", "butt", "dick", "cheese", "weed", "smoke", "marijuana", "blaze", "420", "vibe", "check", "chill", "anime", "deep", "woke", "bong", "blunt");
            words[6] = new Array("fucking", "magic", "explore", "beautiful", "chaos", "I am", "bill", "computer", "built", "real", "build", "vibration", "beach", "keep", "joint", "stash", "juno", "mars", "moon", "earth", "sun", "kill", "think", "thank", "comma");
            words[7] = new Array("texas", "richard", "lucas", "sam", "clinton", "michael", "austin", "bill", "john", "elena", "jackson", "bob", "robert", "avery", "brandon", "cody", "cory", "cole", "joe", "charlotte", "canada", "california", "washington", "oregon", "arizona");


            var w1 = Math.floor(Math.random() * 24);
            var w2 = Math.floor(Math.random() * 24);

            var w3 = Math.floor(Math.random() * 24);
            var w4 = Math.floor(Math.random() * 24);

            var w5 = Math.floor(Math.random() * 24);
            var w6 = Math.floor(Math.random() * 24);

            var w7 = Math.floor(Math.random() * 24);
            var w8 = Math.floor(Math.random() * 24);

            //***************************************************************************** */
            var ww = Math.floor(Math.random() * 7);
            var ww1 = Math.floor(Math.random() * 7);

            var ww2 = Math.floor(Math.random() * 7);
            var ww3 = Math.floor(Math.random() * 7);

            var ww4 = Math.floor(Math.random() * 7);
            var ww5 = Math.floor(Math.random() * 7);

            var ww6 = Math.floor(Math.random() * 7);
            var ww7 = Math.floor(Math.random() * 7);

            if (words[ww][w1] === words[ww1][w2]) {

                w2 = (w1 = Math.floor(Math.random() * 24));
                ww1 = (ww = Math.floor(Math.random() * 7));

            }

            if (words[ww1][w2] === words[ww2][w3]) {

                w3 = (w1 = Math.floor(Math.random() * 24));
                ww2 = (ww = Math.floor(Math.random() * 7));
            }

            if (words[ww2][w3] === words[ww3][w4]) {

                w4 = (w1 = Math.floor(Math.random() * 24));
                ww3 = (ww = Math.floor(Math.random() * 7));
            }

            if (words[ww3][w4] === words[ww4][w5]) {

                w5 = (w1 = Math.floor(Math.random() * 24));
                ww4 = (ww = Math.floor(Math.random() * 7));
            }

            if (words[ww4][w5] === words[ww5][w6]) {

                w6 = (w1 = Math.floor(Math.random() * 24));
                ww5 = (ww = Math.floor(Math.random() * 7));
            }

            if (words[ww5][w6] === words[ww6][w7]) {

                w7 = (w1 = Math.floor(Math.random() * 24));
                ww6 = (ww = Math.floor(Math.random() * 7));
            }

            if (words[ww6][w7] === words[ww7][w8]) {

                w8 = (w1 = Math.floor(Math.random() * 24));
                ww7 = (ww = Math.floor(Math.random() * 7));
            }


            if ((!words[ww][w1] || !words[ww1][w2]) == (words[0][w1] || words[7][w2])) {

                ww = (ww = Math.floor(Math.random() * 7));
                ww1 = (ww = Math.floor(Math.random() * 7));

            }

            msg.channel.send(`${words[ww][w1]} ${words[ww1][w2]} ${words[ww2][w3]} ${words[ww3][w4]} ${words[ww4][w5]} ${words[ww5][w6]} ${words[ww6][w7]} ${words[ww7][w8]}`);

        }

        else { 

            return; 
        }
    }


}