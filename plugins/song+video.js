const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

// MP4 video download
// MP4 video download with options
cmd({ 
    pattern: "mp4", 
    alias: ["video"], 
    react: "🎥", 
    desc: "Download YouTube video", 
    category: "main", 
    use: '.mp4 < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("*ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ʏᴏᴜᴛᴜʙʀ ᴜʀʟ ᴏʀ sᴏɴɢ ɴᴀᴍᴇ.❓*");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("*ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ ❗️*");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }

        let ytmsg = `┏━*🎥 lakshan MD ᴠɪᴅᴇᴏ ᴅʟ*🌟━━━
┃ 🎙 *ᴛɪᴛʟᴇ :* ${yts.title}
┃ ⌛️ *ᴅᴜʀᴀᴛɪᴏɴ :* ${yts.timestamp}
┃ 👀 *ᴠɪᴇᴡs :* ${yts.views}
┃ 👤 *ᴀᴜᴛʜᴏʀ :* ${yts.author.name}
┃ 🖇 *ʟɪɴᴋ :* ${yts.url}
┗━━━━━━━━━━━━━━━━

> *🔢 ᴄʜᴏᴏꜱᴇ ᴀ ɴᴜᴍʙᴇʀ ʙᴇʟᴏᴡ.*

*[ 1️⃣ ] ᴅᴏᴄᴜᴍᴇɴᴛ  ғᴏʀᴍᴀᴛ*
*[ 2️⃣ ] ɴᴏʀᴍᴀʟ ᴠɪᴅᴇᴏ ғᴏʀᴍᴀᴛ*

*ʀᴇᴘʟʏ ᴡɪᴛʜ 1,2 ᴛᴏ ᴛʜɪs ᴍᴇssᴀɢᴇ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴛʜᴇ ғᴏʀᴍᴀᴛ ʏᴏᴜ ᴘʀᴇғᴇʀ.*

> *lakshan  - ᴍᴅ ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ*`;

        let contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363420182617946@newsletter',
                newsletterName: 'ᴅᴀʀᴋ ᴋɪɴɢ - x ᴍᴅ',
                serverMessageId: 143
            }
        };

        // Send thumbnail with options
        const videoMsg = await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytmsg, contextInfo }, { quoted: mek });

        conn.ev.on("messages.upsert", async (msgUpdate) => {
            const replyMsg = msgUpdate.messages[0];
            if (!replyMsg.message || !replyMsg.message.extendedTextMessage) return;

            const selected = replyMsg.message.extendedTextMessage.text.trim();

            if (
                replyMsg.message.extendedTextMessage.contextInfo &&
                replyMsg.message.extendedTextMessage.contextInfo.stanzaId === videoMsg.key.id
            ) {
                await conn.sendMessage(from, { react: { text: "⬇️", key: replyMsg.key } });

                switch (selected) {
                    case "1":
                        await conn.sendMessage(from, {
                            document: { url: data.result.download_url },
                            mimetype: "video/mp4",
                            fileName: `${yts.title}.mp4`,
                            contextInfo
                        }, { quoted: replyMsg });
                        break;

                    case "2":
                        await conn.sendMessage(from, {
                            video: { url: data.result.download_url },
                            mimetype: "video/mp4",
                            contextInfo
                        }, { quoted: replyMsg });
                        break;

                    default:
                        await conn.sendMessage(
                            from,
                            { text: "*ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ( 1 , 2 ) ❤️*" },
                            { quoted: replyMsg }
                        );
                        break;
                }
            }
        });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});

// MP3 song download
cmd({ 
    pattern: "song", 
    react: "🎶", 
    desc: "Download YouTube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("*ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ʏᴏᴜᴛᴜʙʀ ᴜʀʟ ᴏʀ sᴏɴɢ ɴᴀᴍᴇ.❓*");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("*ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ ❗️*");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
            return reply("*ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ.ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.🔁*");
        }
        
        let ytmsg = `┏━*🎵  ᴅᴀʀᴋ ᴋɪɴɢ sᴏɴɢ ᴅʟ*🌟━━━
┃ 🎙 *ᴛɪᴛʟᴇ :* ${yts.title}
┃ ⌛️ *ᴅᴜʀᴀᴛɪᴏɴ :* ${yts.timestamp}
┃ 👀 *ᴠɪᴇᴡs :* ${yts.views}
┃ 👤 *ᴀᴜᴛʜᴏʀ :* ${yts.author.name}
┃ 🖇 *ʟɪɴᴋ :* ${yts.url}
┗━━━━━━━━━━━━━━━━

> *🔢 ᴄʜᴏᴏꜱᴇ ᴀ ɴᴜᴍʙᴇʀ ʙᴇʟᴏᴡ.*

*[ 1️⃣ ] ᴍᴘ3 ᴀs ᴅᴏᴄᴜᴍᴇɴᴛ*
*[ 2️⃣ ] ᴍᴘ3 ᴀs ᴀᴜᴅɪᴏ ( ᴘʟᴀʏ )*
*[ 3️⃣ ] ᴍᴘ3 ᴀs ᴠᴏɪᴄᴇ ɴᴏᴛᴇ ( ᴘᴛᴛ )*

*ʀᴇᴘʟʏ ᴡɪᴛʜ 1,2,3 ᴛᴏ ᴛʜɪs ᴍᴇssᴀɢᴇ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ᴛʜᴇ ғᴏʀᴍᴀᴛ ʏᴏᴜ ᴘʀᴇғᴇʀ.*

> *lakshan  - MD ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ*`;
        
        let contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363420182617946@newsletter',
                newsletterName: 'ᴅᴀʀᴋ ᴋɪɴɢ - x ᴍᴅ',
                serverMessageId: 143
            }
        };
        
        // Send thumbnail with caption only
  const songmsg = await conn.sendMessage(from, { image: { url: yts.thumbnail }, caption: ytmsg, contextInfo }, { quoted: mek });

  
     
                     conn.ev.on("messages.upsert", async (msgUpdate) => {
        

                const mp3msg = msgUpdate.messages[0];
                if (!mp3msg.message || !mp3msg.message.extendedTextMessage) return;

                const selectedOption = mp3msg.message.extendedTextMessage.text.trim();

                if (
                    mp3msg.message.extendedTextMessage.contextInfo &&
                    mp3msg.message.extendedTextMessage.contextInfo.stanzaId === songmsg.key.id
                ) {
                
                            
                   await conn.sendMessage(from, { react: { text: "⬇️", key: mp3msg.key } });

                    switch (selectedOption) {
case "1":   

      
      
   await conn.sendMessage(from, { document: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", fileName: `${yts.title}.mp3`, contextInfo }, { quoted: mp3msg });   
      
      
break;
case "2":   
await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", contextInfo }, { quoted: mp3msg });
break;
case "3":   
await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg", ptt: true, contextInfo }, { quoted: mp3msg });
break;


default:
                            await conn.sendMessage(
                                from,
                                {
                                    text: "*ɪɴᴠᴀʟɪᴅ sᴇʟᴇᴄᴛɪᴏɴ ᴘʟᴇᴀsᴇ sᴇʟᴇᴄᴛ ʙᴇᴛᴡᴇᴇɴ.( 1 or 2 or 3) 🔴*",
                                },
                                { quoted: mp3msg }
                            );
             }}});
           
    } catch (e) {
        console.log(e);
        reply("*ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ.ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.🔁*");
    }
});
