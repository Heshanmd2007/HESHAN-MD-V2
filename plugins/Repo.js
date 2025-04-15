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
        const urlMatch = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!urlMatch || urlMatch.length < 3) {
            throw new Error("Invalid GitHub repository URL format.");
        }

        const [, username, repoName] = urlMatch;

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, {
            headers: {
                'User-Agent': 'Heshan-MD-Bot' // GitHub API requires a user-agent
            }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed: ${response.statusText}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `
*BOT NAME:* ${repoData.name || 'N/A'}

*OWNER NAME:* ${repoData.owner?.login || 'N/A'}

*STARS:* ⭐ ${repoData.stargazers_count || 0}

*FORKS:* 🍴 ${repoData.forks_count || 0}

*GITHUB LINK:* ${repoData.html_url || githubRepoURL}

*DESCRIPTION:* ${repoData.description || 'No description available'}

*DON'T FORGET TO STAR ⭐ AND FORK 🍴*

*ʜᴇꜱʜᴀɴ ᴍᴅ*
        `.trim();

        // Send image with repository info
        await conn.sendMessage(from, {
            image: { url: 'https://i.ibb.co/gFrcJCDP/IMG-20250408-WA0074.jpg' },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

        // Send audio file
        await conn.sendMessage(from, {
            audio: { 
                url: 'https://github.com/Awais-star-a11y/TESTING-REPO/raw/main/VID-20250118-WA0022.mp3',
            },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender]
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        await reply(`❌ Error: ${error.message}\n\nYou can manually visit:\n${githubRepoURL}`);
    }
});
