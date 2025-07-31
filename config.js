const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "tcR3BJqZ#iQa4qXqPV4qdnj7NPsS_k1KcZ2auo97k3Dd3-bmLCZw", // ඔයාගේ session id එක දාන්න
MONGODB: process.env.MONGODB || "mongodb+srv://ashenikavindi00:b1ajNVz40nKVlwjf@cluster0.rvzcqfk.mongodb.net/", // ඔයාගේ mongodb url එක දාන්න
BOT_NAME: process.env.BOT_NAME || "MD",
LANG: process.env.BOT_LANG || 'EN' ,
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39",
DELETEMSGSENDTO : process.env.DELETEMSGSENDTO === undefined ? '' : process.env.DELETEMSGSENDTO,
};
