const config = require('../config')
const { cmd, commands } = require('../command')
const os = require("os")
const { updateEnv } = require("../lib/updateEnv") // Make sure this exists

cmd({
    pattern: "settings",
    alias: ["setting"],
    desc: "settings the bot",
    category: "owner",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        let desc = `┏━━━━━━━━━━━━━━━━
*│ ⚙️ kavidu-  ᴍᴅ sᴇᴛᴛɪɴɢ ᴘᴀɴᴇʟ*
┗━━━━━━━━━━━━━━━━

┏━*1️⃣  ᴡᴏʀᴋ_ᴍᴏᴅᴇ 🛃*━━━━━━
 *1.1  | ᴘᴜʙʟɪᴄ ᴏʀ ɪɴʙᴏx ᴍᴏᴅᴇ*
 *1.2 | ᴘʀɪᴠᴀᴛᴇ ᴍᴏᴅᴇ*
 *1.3 |  ɢʀᴏᴜᴘ ᴍᴏᴅᴇ*
 *1.4 |  ɪɴʙᴏx ᴍᴏᴅᴇ*
┗━━━━━━━━━━━━━━━━

┏━ *2️⃣ ᴀᴜᴛᴏ_ᴠᴏɪᴄᴇ 🗣*  ━━━━━
 *2.1  | ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ ᴇɴᴀʙʟᴇ*
 *2.2 | Auto Voice ᴅɪsᴀʙʟᴇ*
┗━━━━━━━━━━━━━━━━

┏━ *3️⃣ ᴀᴜᴛᴏ_ʀᴇᴀᴅ_sᴛᴀᴛᴜs 🖲* ━━
 *3.1 |  ᴀᴜᴛᴏ ʀᴇᴀᴅ sᴛᴀᴛᴜs ᴇɴᴀʙʟᴇ*
 *3.2 | ᴀᴜᴛᴏ ʀᴇᴀᴅ sᴛᴀᴜs ᴅɪsᴀʙʟᴇ*
┗━━━━━━━━━━━━━━━━

┏━*4️⃣ ᴀᴜᴛᴏ_sᴛɪᴄᴋᴇʀ🎭*━━━━━
 *4.1 | ᴀᴜᴛᴏ sᴛɪᴄᴋᴇʀ ᴇɴᴀʙʟᴇ*
 *4.2 | ᴀᴜᴛᴏ sᴛɪᴄᴋᴇʀ ᴅɪsᴀʙʟᴇ*
┗━━━━━━━━━━━━━━━━

┏━*5️⃣ ᴀᴜᴛᴏ_ʀᴇᴘʟʏ  💬*━━━━━━
 *5.1 | ᴀᴜᴛᴏ ʀᴇᴘʟʏ ᴇɴᴀʙʟᴇ*
 *5.2 | ᴀᴜᴛᴏ ʀᴇᴘʟʏ ᴅɪsᴀʙʟᴇ*
┗━━━━━━━━━━━━━━━━

┏━*6️⃣ ʙᴏᴛ ᴏɴʟɪɴᴇ ᴏʀ ᴏғғʟɪɴᴇ📱*━
 *6.1 | ᴏɴʟɪɴᴇ ᴇɴᴀʙʟᴇ*
 *6.2 | ᴏғғʟɪɴᴇ ᴅɪsᴀʙʟᴇ*
┗━━━━━━━━━━━━━━━━

┏━ *7️⃣ ʀᴇᴀᴅ_ᴍᴇssᴀɢᴇ ❇️* ━━━━
 *7.1 | ʀᴇᴀᴅ ᴍᴇssᴀɢᴇ ᴇɴᴀʙʟᴇ*
 *7.2 | ʀᴇᴀᴅ ᴍᴇssᴀɢᴇ ᴅɪsᴀʙʟᴇ*
┗━━━━━━━━━━━━━━━━

┏━*8️⃣ ᴀᴜᴛᴏ_ʀᴇᴀᴄᴛ ᴇᴍᴏᴊɪ 🎉* ━━━
 *8.1 | ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ ᴇᴍᴏᴊɪ ᴇɴᴀʙʟᴇ*
 *8.2 | ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ ᴇᴍᴏᴊɪ ᴅɪsᴀʙʟᴇ*
┗━━━━━━━━━━━━━━━━

┏━*9️⃣ ᴀɴᴛɪ_ʟɪɴᴋ 🚯*━━━━━━━
 *9.1 | ᴀɴᴛɪ ʟɪɴᴋ ᴇɴᴀʙʟᴇ*
 *9.2 | ᴀɴᴛɪ ʟɪɴᴋ ᴅɪsᴀʙʟᴇ*
 *9.3 | ᴀɴᴛɪ ʟɪɴᴋ ʀᴇᴍᴏᴠᴇ*
┗━━━━━━━━━━━━━━━━

> *🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜɪs ɴᴜᴍʙᴇʀ ᴄʜᴀɴɢᴇ ᴛᴏ ʙᴏᴛ sᴇᴛᴛɪɴɢ*

> *kavidu-  ᴍᴅ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ*`;

        const vv = await conn.sendMessage(from, {
            image: { url: "https://i.ibb.co/bjyS3nXz/5608.jpg" },
            caption: desc
        }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {

                try {
                    switch (selectedOption) {
                        case '1.1':
                            {
                                let success = await updateEnv('MODE', 'public');
                                if (success) reply("✅ Mode set to Public");
                                else reply("❌ Failed to set mode to Public");
                            }
                            break;

                        case '1.2':
                            {
                                let success = await updateEnv('MODE', 'private');
                                if (success) reply("✅ Mode set to Private");
                                else reply("❌ Failed to set mode to Private");
                            }
                            break;

                        case '1.3':
                            {
                                let success = await updateEnv('MODE', 'group');
                                if (success) reply("✅ Mode set to Group");
                                else reply("❌ Failed to set mode to Group");
                            }
                            break;

                        case '1.4':
                            {
                                let success = await updateEnv('MODE', 'inbox');
                                if (success) reply("✅ Mode set to Inbox");
                                else reply("❌ Failed to set mode to Inbox");
                            }
                            break;

                        case '2.1':
                            {
                                let success = await updateEnv('AUTO_VOICE', 'true');
                                if (success) reply("✅ Auto Voice Enabled");
                                else reply("❌ Failed to enable Auto Voice");
                            }
                            break;

                        case '2.2':
                            {
                                let success = await updateEnv('AUTO_VOICE', 'false');
                                if (success) reply("✅ Auto Voice Disabled");
                                else reply("❌ Failed to disable Auto Voice");
                            }
                            break;

                        case '3.1':
                            {
                                let success = await updateEnv('AUTO_READ_STATUS', 'true');
                                if (success) reply("✅ Auto Read Status Enabled");
                                else reply("❌ Failed to enable Auto Read Status");
                            }
                            break;

                        case '3.2':
                            {
                                let success = await updateEnv('AUTO_READ_STATUS', 'false');
                                if (success) reply("✅ Auto Read Status Disabled");
                                else reply("❌ Failed to disable Auto Read Status");
                            }
                            break;

                        case '4.1':
                            {
                                let success = await updateEnv('AUTO_STICKER', 'true');
                                if (success) reply("✅ Auto Sticker Enabled");
                                else reply("❌ Failed to enable Auto Sticker");
                            }
                            break;

                        case '4.2':
                            {
                                let success = await updateEnv('AUTO_STICKER', 'false');
                                if (success) reply("✅ Auto Sticker Disabled");
                                else reply("❌ Failed to disable Auto Sticker");
                            }
                            break;

                        case '5.1':
                            {
                                let success = await updateEnv('AUTO_REPLY', 'true');
                                if (success) reply("✅ Auto Reply Enabled");
                                else reply("❌ Failed to enable Auto Reply");
                            }
                            break;

                        case '5.2':
                            {
                                let success = await updateEnv('AUTO_REPLY', 'false');
                                if (success) reply("✅ Auto Reply Disabled");
                                else reply("❌ Failed to disable Auto Reply");
                            }
                            break;

                        case '6.1':
                            {
                                let success = await updateEnv('ALLWAYS_OFFLINE', 'false');
                                if (success) reply("✅ Bot is now Online");
                                else reply("❌ Failed to set Bot Online");
                            }
                            break;

                        case '6.2':
                            {
                                let success = await updateEnv('ALLWAYS_OFFLINE', 'true');
                                if (success) reply("✅ Bot is now Offline");
                                else reply("❌ Failed to set Bot Offline");
                            }
                            break;

                        case '7.1':
                            {
                                let success = await updateEnv('READ_MESSAGE', 'true');
                                if (success) reply("✅ Read Message Enabled");
                                else reply("❌ Failed to enable Read Message");
                            }
                            break;

                        case '7.2':
                            {
                                let success = await updateEnv('READ_MESSAGE', 'false');
                                if (success) reply("✅ Read Message Disabled");
                                else reply("❌ Failed to disable Read Message");
                            }
                            break;

                        case '8.1':
                            {
                                let success = await updateEnv('AUTO_REACT', 'true');
                                if (success) reply("✅ Auto React Enabled");
                                else reply("❌ Failed to enable Auto React");
                            }
                            break;

                        case '8.2':
                            {
                                let success = await updateEnv('AUTO_REACT', 'false');
                                if (success) reply("✅ Auto React Disabled");
                                else reply("❌ Failed to disable Auto React");
                            }
                            break;

                        case '9.1':
                            {
                                let success1 = await updateEnv('ANTI_LINK', 'true');
                                let success2 = await updateEnv('ANTI_LINKK', 'false');
                                if (success1 && success2) reply("✅ Anti Link Enabled (Strict)");
                                else reply("❌ Failed to enable Anti Link Strict Mode");
                            }
                            break;

                        case '9.2':
                            {
                                let success1 = await updateEnv('ANTI_LINKK', 'true');
                                let success2 = await updateEnv('ANTI_LINK', 'false');
                                if (success1 && success2) reply("✅ Anti Link Soft Mode Enabled");
                                else reply("❌ Failed to enable Anti Link Soft Mode");
                            }
                            break;

                        case '9.3':
                            {
                                let success1 = await updateEnv('ANTI_LINK', 'false');
                                let success2 = await updateEnv('ANTI_LINKK', 'false');
                                if (success1 && success2) reply("✅ Anti Link Disabled");
                                else reply("❌ Failed to disable Anti Link");
                            }
                            break;

                        default:
                            reply("❌ Invalid Option. Please select a valid option.");
                    }

                } catch (err) {
                    console.error(err);
                    reply("⚠️ Error while updating setting.");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('⚠️ An error occurred while processing your request.');
    }
});
