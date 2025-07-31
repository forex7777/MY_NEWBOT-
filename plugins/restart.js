const config = require('../config')
const { cmd } = require('../command')
const { sleep } = require('../lib/functions')

cmd({
    pattern: "restart",
    alias: ["rebot", "reboot"],
    react: "🔄",
    desc: "restart the bot",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, sender, pushname, isOwner, reply
}) => {
    try {
        if (!isOwner) return;

        const { exec } = require("child_process")

        await conn.sendMessage(from, {
            text: "> *ʀᴇsᴛᴀʀᴛ ɴᴏᴡ ᴅᴀʀᴋ ᴋɪɴɢ - x ᴍᴅ 👑*",
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420182617946@newsletter', // use your newsletter JID
                    newsletterName: 'ᴅᴀʀᴋ ᴋɪɴɢ - x ᴍᴅ', // your newsletter name
                    serverMessageId: 143 // random or actual ID
                }
            }
        }, { quoted: mek })

        await sleep(1500)

        exec("pm2 restart all")

    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
