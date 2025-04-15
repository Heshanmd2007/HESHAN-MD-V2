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
    const cachedData = {}; // Simple in-memory cache
    const cacheKey = 'repo_info';

    try {
        // Check cache first
        if (cachedData[cacheKey] && (Date.now() - cachedData[cacheKey].timestamp < 3600000)) {
            const repoData = cachedData[cacheKey].data;
            await sendRepoInfo(conn, from, mek, m.sender, repoData, githubRepoURL);
            return;
        }

        // Extract username and repo name from the URL
        const urlMatch = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!urlMatch || urlMatch.length < 3) {
            throw new Error("Invalid GitHub repository URL format.");
        }

        const [, username, repoName] = urlMatch;

        // Try with GitHub token if available
        const ghToken = config.GITHUB_TOKEN || process.env.GITHUB_TOKEN;
        const headers = {
            'User-Agent': 'Heshan-MD-Bot',
            ...(ghToken && { 'Authorization': `token ${ghToken}` })
        };

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`, { headers });
        
        if (!response.ok) {
            if (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0') {
                const resetTime = new Date(parseInt(response.headers.get('x-ratelimit-reset')) * 1000);
                const timeLeft = Math.round((resetTime - Date.now()) / 60000);
                throw new Error(`GitHub API rate limit exceeded. Try again in ${timeLeft} minutes.`);
            }
            throw new Error(`GitHub API request failed: ${response.statusText}`);
        }

        const repoData = await response.json();
        
        // Cache the data
        cachedData[cacheKey] = {
            data: repoData,
            timestamp: Date.now()
        };

        await sendRepoInfo(conn, from, mek, m.sender, repoData, githubRepoURL);

    } catch (error) {
        console.error("Error in repo command:", error);
        // Fallback to static info if API fails
        const fallbackInfo = `
*BOT NAME:* HESHAN-MD-V2

*OWNER NAME:* Heshanmd2007

*GITHUB LINK:* ${githubRepoURL}

*DESCRIPTION:* A WhatsApp bot with rich features

*Note:* GitHub API limit reached - using cached info
*ʜᴇꜱʜᴀɴ ᴍᴅ*
        `.trim();
        
        try {
            await conn.sendMessage(from, {
                image: { url: 'https://i.ibb.co/gFrcJCDP/IMG-20250408-WA0074.jpg' },
                caption: fallbackInfo,
                contextInfo: { mentionedJid: [m.sender] }
            }, { quoted: mek });
        } catch (e) {
            await reply(fallbackInfo);
        }
    }
});

async function sendRepoInfo(conn, from, mek, sender, repoData, githubRepoURL) {
    const formattedInfo = `
*BOT NAME:* ${repoData.name || 'HESHAN-MD-V2'}

*OWNER NAME:* ${repoData.owner?.login || 'Heshanmd2007'}

*STARS:* ⭐ ${repoData.stargazers_count || 0}

*FORKS:* 🍴 ${repoData.forks_count || 0}

*GITHUB LINK:* ${repoData.html_url || githubRepoURL}

*DESCRIPTION:* ${repoData.description || 'A WhatsApp bot with rich features'}

*DON'T FORGET TO STAR ⭐ AND FORK 🍴*
*ʜᴇꜱʜᴀɴ ᴍᴅ*
    `.trim();

    await conn.sendMessage(from, {
        image: { url: 'https://i.ibb.co/gFrcJCDP/IMG-20250408-WA0074.jpg' },
        caption: formattedInfo,
        contextInfo: { mentionedJid: [sender] }
    }, { quoted: mek });

    await conn.sendMessage(from, {
        audio: { 
            url: 'https://github.com/Awais-star-a11y/TESTING-REPO/raw/main/VID-20250118-WA0022.mp3',
        },
        mimetype: 'audio/mp4',
        ptt: true,
        contextInfo: { mentionedJid: [sender] }
    }, { quoted: mek });
}
