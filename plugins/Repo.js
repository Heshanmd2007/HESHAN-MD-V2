const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/Heshanmd2007/HESHAN-MD-V2';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `*BOT NAME:*\n> ${repoData.name}\n\n*OWNER NAME:*\n> ${repoData.owner.login}\n\n*STARS:*\n> ${repoData.stargazers_count}\n\n*FORKS:*\n> ${repoData.forks_count}\n\n*GITHUB LINK:*\n> ${repoData.html_url}\n\n*DESCRIPTION:*\n> ${repoData.description || 'No description'}\n\n*DON'T STAR AND FORK*\n\n> *ʜᴇꜱʜᴀɴ ᴍᴅ*`;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://i.ibb.co/gFrcJCDP/IMG-20250408-WA0074.jpg` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: 'ʜᴇꜱʜᴀɴ ᴍᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send the audio file with context info
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/Awais-star-a11y/TESTING-REPO/raw/refs/heads/main/VID-20250118-WA0022.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '@newsletter',
                    newsletterName: 'ʜᴇꜱʜᴀɴ ᴍᴅ',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("*Sorry, something went wrong while fetching the repository information. Please try again later.*");
    }
});
