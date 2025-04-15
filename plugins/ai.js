const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt","gpt5"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await conn.sendMessage(from, { text: "OpenAI failed to respond. Please try again later." }, { quoted: mek });
            return;
        }

        await conn.sendMessage(from, { text: `🧠 *OpenAI Response:*\n\n${data.result}` }, { quoted: mek });
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await conn.sendMessage(from, { text: "An error occurred while communicating with OpenAI." }, { quoted: mek });
    }
});

cmd({
    pattern: "ai",
    alias: ["bot", "xd", "gpt", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await conn.sendMessage(from, { text: "AI failed to respond. Please try again later." }, { quoted: mek });
            return;
        }

        await conn.sendMessage(from, { text: `🤖 *AI Response:*\n\n${data.message}` }, { quoted: mek });
    } catch (e) {
        console.error("Error in AI command:", e);
        await conn.sendMessage(from, { text: "An error occurred while communicating with the AI." }, { quoted: mek });
    }
});

cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "👾",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await conn.sendMessage(from, { text: "DeepSeek AI failed to respond. Please try again later." }, { quoted: mek });
            return;
        }

        await conn.sendMessage(from, { text: `👾 *DeepSeek AI Response:*\n\n${data.answer}` }, { quoted: mek });
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await conn.sendMessage(from, { text: "An error occurred while communicating with DeepSeek AI." }, { quoted: mek });
    }
});
