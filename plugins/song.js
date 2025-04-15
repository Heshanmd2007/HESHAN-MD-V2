const { cmd } = require('../command');
const yts = require('yt-search');
const fg = require('api-dylux');

// -------- Song Download --------
cmd({
    pattern: 'song',
    desc: 'download songs',
    react: "🎶",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply('*Please enter a query or a url !*');

        // Search or process URL
        let url;
        if (q.includes('youtu.be/') || q.includes('youtube.com/')) {
            url = q.trim();
        } else {
            const search = await yts(q);
            const data = search.videos[0];
            if (!data) return reply('*No results found!*');
            url = data.url;
        }

        // Validate YouTube URL
        if (!url.match(/youtu(be\.com|\.be)/)) {
            return reply('*Invalid YouTube URL!*');
        }

        let desc = `*🎼 HESHAN MD SONG DOWNLOADER . .⚙️*\n\n` +
                   `🎼⚙️ TITLE - ${data?.title || 'N/A'}\n` +
                   `🎼⚙️ VIEWS - ${data?.views || 'N/A'}\n` +
                   `🎼⚙️ TIME - ${data?.timestamp || 'N/A'}\n` +
                   `🎼⚙️ AGO - ${data?.ago || 'N/A'}\n\n` +
                   `*Reply With Option*\n` +
                   `1. Audio (Normal)\n` +
                   `2. Audio (Document)\n\n` +
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
                        const audio = await fg.yta(url).catch(e => {
                            console.error('Audio download error:', e);
                            throw new Error('Failed to download audio');
                        });
                        await conn.sendMessage(from, { 
                            audio: { url: audio.dl_url }, 
                            mimetype: 'audio/mpeg',
                            caption: '> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ʜᴇꜱʜᴀɴ ᴍᴅ'
                        }, { quoted: mek });
                        break;
                        
                    case '2':
                        const audioDoc = await fg.yta(url).catch(e => {
                            console.error('Audio doc download error:', e);
                            throw new Error('Failed to download audio document');
                        });
                        await conn.sendMessage(from, { 
                            document: { url: audioDoc.dl_url }, 
                            mimetype: 'audio/mpeg',
                            fileName: `${data?.title || 'audio'}.mp3`,
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
        console.error('Command error:', e);
        reply('An error occurred. Please try again later.');
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    }
});
