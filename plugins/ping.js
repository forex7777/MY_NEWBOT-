const config = require('../config')
let fs = require('fs')
const os = require("os")
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
cmd({
    pattern: "ping",
    alias: ["speed","pong"],
    react: "📡",
    desc: "Check the bot's response time.",
    category: "main",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
	try{   
		var initial = new Date().getTime(); 
		let { key } = await conn.sendMessage(from, { text: "```🚀 Testing ping...!```" });
		await sleep(500);
		var final = new Date().getTime();
		let pingTime = final - initial;
		return await conn.sendMessage(from, { text: "*📡 Ping : " + pingTime + "ms*", edit: key });

	} catch (e) {
		console.log(e);
	}
});
