const { cmd } = require('../command');
const yts = require('yt-search');
const fg = require('api-dylux');

cmd({
    pattern: 'video',
    desc: 'download videos',
    react: "📽️",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('*Please enter a query or a URL!*');

        // Search or process URL
        let url, data;
        if (q.includes('youtu.be/') || q.includes('youtube.com/')) {
            url = q.trim();
            // Fetch video info for URLs
            const search = await yts({ videoId: url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0] });
            data = search.videos[0];
        } else {
            const search = await yts(q);
            data = search.videos[0];
            if (!data) return reply('*No results found!*');
            url = data.url;
        }

        // Validate YouTube URL
        if (!url.match(/youtu(be\.com|\.be)/)) {
            return reply('*Invalid YouTube URL!*');
        }

        let desc = `*📽️ HESHAN MD VIDEO DOWNLOADER . .⚙️*\n\n` +
                  `📽️⚙️ TITLE - ${data?.title || 'N/A'}\n` +
                  `📽️⚙️ VIEWS - ${data?.views || 'N/A'}\n` +
                  `📽️⚙️ TIME - ${data?.timestamp || 'N/A'}\n` +
                  `📽️⚙️ AGO - ${data?.ago || 'N/A'}\n\n` +
                  `*Reply With Option*\n` +
                  `1. Video (Normal)\n` +
                  `2. Video (Document)\n\n` +
                  `> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ʜᴇꜱʜᴀɴ ᴍᴅ`;

        const vv = await conn.sendMessage(from, { 
            image: { url: data?.thumbnail || '' }, 
            caption: desc 
        }, { quoted: mek });

        // Timeout after 60 seconds
        const timeout = setTimeout(() => {
            conn.ev.off('messages.upsert', handler);
            reply('*Response time expired*');
        }, 60000);

        const handler = async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg?.message?.extendedTextMessage) return;
            if (msg.key.remoteJid !== from) return;

            const context = msg.message.extendedTextMessage.contextInfo;
            if (!context || context.stanzaId !== vv.key.id) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();
            
            try {
                switch (selectedOption) {
                    case '1':
                        const video = await fg.ytv(url).catch(e => {
                            console.error('Video download error:', e);
                            throw new Error('Failed to download video');
                        });
                        await conn.sendMessage(from, { 
                            video: { url: video.dl_url }, 
                            mimetype: 'video/mp4',
                            caption: '> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ʜᴇꜱʜᴀɴ ᴍᴅ'
                        }, { quoted: mek });
                        break;
                        
                    case '2':
                        const videoDoc = await fg.ytv(url).catch(e => {
                            console.error('Video doc download error:', e);
                            throw new Error('Failed to download video document');
                        });
                        await conn.sendMessage(from, { 
                            document: { url: videoDoc.dl_url }, 
                            mimetype: 'video/mp4',
                            fileName: `${data?.title || 'video'}.mp4`,
                            caption: '> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ʜᴇꜱʜᴀɴ ᴍᴅ'
                        }, { quoted: mek });
                        break;
                        
                    default:
                        reply("Invalid option. Please reply with 1 or 2");
                        return;
                }
                
                await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
            } catch (e) {
                console.error(e);
                reply('Failed to process your request. Please try again later.');
                await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
            } finally {
                clearTimeout(timeout);
                conn.ev.off('messages.upsert', handler);
            }
        };

        conn.ev.on('messages.upsert', handler);

    } catch (e) {
        console.error('Video command error:', e);
        reply('An error occurred. Please try again later.');
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});
