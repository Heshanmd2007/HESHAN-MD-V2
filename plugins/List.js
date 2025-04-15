const config = require('../config')
const { cmd, commands } = require('../command');
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "list",
    alias: "allmenu",
    desc: "menu the bot",
    category: "menu",
    react: "⚡",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *${config.BOT_NAME}*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Mode : *[${config.MODE}]*
┃★│ Prifix : *[${config.PREFIX}]*
┃★│ Version : *v 2.0.0*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
╭━━〔 *Download Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}facebook
┃◈┃• ${config.PREFIX}mediafire
┃◈┃• ${config.PREFIX}tiktok
┃◈┃• ${config.PREFIX}twitter
┃◈┃• ${config.PREFIX}Insta
┃◈┃• ${config.PREFIX}apk
┃◈┃• ${config.PREFIX}img
┃◈┃• ${config.PREFIX}play
┃◈┃• ${config.PREFIX}play2
┃◈┃• ${config.PREFIX}audio
┃◈┃• ${config.PREFIX}video
┃◈┃• ${config.PREFIX}video2
┃◈┃• ${config.PREFIX}ytmp3
┃◈┃• ${config.PREFIX}ytmp4
┃◈┃• ${config.PREFIX}song
┃◈┃• ${config.PREFIX}darama
┃◈┃• ${config.PREFIX}gdrive
┃◈┃• ${config.PREFIX}smovie
┃◈┃• ${config.PREFIX}baiscope 
┃◈┃• ${config.PREFIX}ginisilia 
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Group Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}grouplink
┃◈┃• ${config.PREFIX}add
┃◈┃• ${config.PREFIX}remove
┃◈┃• ${config.PREFIX}kick
┃◈┃• ${config.PREFIX}promote 
┃◈┃• ${config.PREFIX}demote
┃◈┃• ${config.PREFIX}dismiss 
┃◈┃• ${config.PREFIX}revoke
┃◈┃• ${config.PREFIX}setgoodbye
┃◈┃• ${config.PREFIX}setwelcome
┃◈┃• ${config.PREFIX}delete 
┃◈┃• ${config.PREFIX}getpic
┃◈┃• ${config.PREFIX}ginfo
┃◈┃• ${config.PREFIX}delete 
┃◈┃• ${config.PREFIX}disappear on
┃◈┃• ${config.PREFIX}disappear off
┃◈┃• ${config.PREFIX}disappear 7D,24H
┃◈┃• ${config.PREFIX}allreq
┃◈┃• ${config.PREFIX}updategname
┃◈┃• ${config.PREFIX}updategdesc
┃◈┃• ${config.PREFIX}joinrequests
┃◈┃• ${config.PREFIX}senddm
┃◈┃• ${config.PREFIX}nikal
┃◈┃• ${config.PREFIX}mute
┃◈┃• ${config.PREFIX}unmute
┃◈┃• ${config.PREFIX}lockgc
┃◈┃• ${config.PREFIX}unlockgc
┃◈┃• ${config.PREFIX}invite
┃◈┃• ${config.PREFIX}tag
┃◈┃• ${config.PREFIX}hidetag
┃◈┃• ${config.PREFIX}tagall
┃◈┃• ${config.PREFIX}tagadmins
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Owner Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}owner
┃◈┃• ${config.PREFIX}menu
┃◈┃• ${config.PREFIX}menu2
┃◈┃• ${config.PREFIX}listcmd
┃◈┃• ${config.PREFIX}allmenu
┃◈┃• ${config.PREFIX}repo
┃◈┃• ${config.PREFIX}block
┃◈┃• ${config.PREFIX}unblock
┃◈┃• ${config.PREFIX}fullpp
┃◈┃• ${config.PREFIX}setpp
┃◈┃• ${config.PREFIX}restart
┃◈┃• ${config.PREFIX}shutdown
┃◈┃• ${config.PREFIX}updatecmd
┃◈┃• ${config.PREFIX}alive
┃◈┃• ${config.PREFIX}ping 
┃◈┃• ${config.PREFIX}gjid
┃◈┃• ${config.PREFIX}jid
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Fun Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}insult
┃◈┃• ${config.PREFIX}hack
┃◈┃• ${config.PREFIX}joke
┃◈┃• ${config.PREFIX}heart 
┃◈┃• ${config.PREFIX}happy 
┃◈┃• ${config.PREFIX}sad
┃◈┃• ${config.PREFIX}angry 
┃◈┃• ${config.PREFIX}shy
┃◈┃• ${config.PREFIX}kiss
┃◈┃• ${config.PREFIX}moon
┃◈┃• ${config.PREFIX}cunfuzed
┃◈┃• ${config.PREFIX}hand
┃◈┃• ${config.PREFIX}nikal
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Convert Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}sticker
┃◈┃• ${config.PREFIX}sticker2
┃◈┃• ${config.PREFIX}fancy
┃◈┃• ${config.PREFIX}take
┃◈┃• ${config.PREFIX}tomp3
┃◈┃• ${config.PREFIX}tts
┃◈┃• ${config.PREFIX}trt
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Ai Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}ai
┃◈┃• ${config.PREFIX}gpt
┃◈┃• ${config.PREFIX}meta
┃◈┃• ${config.PREFIX}blackbox
┃◈┃• ${config.PREFIX}gpt4
┃◈┃• ${config.PREFIX}bing
┃◈┃• ${config.PREFIX}copilot
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Main Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}ping
┃◈┃• ${config.PREFIX}ping2
┃◈┃• ${config.PREFIX}alive
┃◈┃• ${config.PREFIX}runtime
┃◈┃• ${config.PREFIX}uptime 
┃◈┃• ${config.PREFIX}repo
┃◈┃• ${config.PREFIX}owner
┃◈┃• ${config.PREFIX}menu
┃◈┃• ${config.PREFIX}menu2
┃◈┃• ${config.PREFIX}restart
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Anime Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}dog
┃◈┃• ${config.PREFIX}king
┃◈┃• ${config.PREFIX}animegirl
┃◈┃• ${config.PREFIX}animegirl
┃◈┃• ${config.PREFIX}animegirl1
┃◈┃• ${config.PREFIX}animegirl2
┃◈┃• ${config.PREFIX}animegirl3
┃◈┃• ${config.PREFIX}animegirl4
┃◈┃• ${config.PREFIX}animegirl5
┃◈└───────────┈⊷
╰──────────────┈⊷
╭━━〔 *Other Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ${config.PREFIX}fact
┃◈┃• ${config.PREFIX}define
┃◈┃• ${config.PREFIX}news
┃◈┃• ${config.PREFIX}movie
┃◈┃• ${config.PREFIX}weather
┃◈┃• ${config.PREFIX}srepo
┃◈┃• ${config.PREFIX}insult
┃◈┃• ${config.PREFIX}save
┃◈┃• ${config.PREFIX}wikipedia
┃◈┃• ${config.PREFIX}gpass
┃◈┃• ${config.PREFIX}githubstalk
┃◈┃• ${config.PREFIX}yts
┃◈┃• ${config.PREFIX}ytv
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.CAPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://i.ibb.co/gFrcJCDP/IMG-20250408-WA0074.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: 'HESHAN MD',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/VID-20250118-WA0022.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
