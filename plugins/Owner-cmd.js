const { cmd } = require('../command');
const config = require('../config');

// 1. Shutdown Bot
cmd({
    pattern: "shutdown",
    desc: "Shutdown the bot.",
    category: "owner",
    react: "🛑",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    await reply("🛑 Shutting down...");
    process.exit(0); // Exit with success code
});

// 2. Broadcast Message to All Groups
cmd({
    pattern: "broadcast",
    desc: "Broadcast a message to all groups.",
    category: "owner",
    react: "📢",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, args, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!args.length) return reply("📢 Please provide a message to broadcast.");
    
    const message = args.join(' ');
    try {
        const groups = await conn.groupFetchAllParticipating();
        const groupIds = Object.keys(groups);
        
        for (const groupId of groupIds) {
            await conn.sendMessage(groupId, { text: message }).catch(e => console.error(`Failed to send to ${groupId}:`, e));
        }
        reply(`📢 Broadcast sent to ${groupIds.length} groups.`);
    } catch (error) {
        reply(`❌ Broadcast failed: ${error.message}`);
    }
});

// 3. Set Profile Picture (Fixed Error Handling)
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted?.message?.imageMessage) return reply("❌ Please reply to an image.");
    
    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("✅ Profile picture updated successfully!");
    } catch (error) {
        reply(`❌ Failed to update: ${error.message}`);
    }
});

// 4. Block User
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted?.sender) return reply("❌ Reply to a user's message to block them.");
    
    try {
        await conn.updateBlockStatus(quoted.sender, 'block');
        reply(`🚫 User blocked: ${quoted.sender.split('@')[0]}`);
    } catch (error) {
        reply(`❌ Block failed: ${error.message}`);
    }
});

// 5. Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted?.sender) return reply("❌ Reply to a user's message to unblock them.");
    
    try {
        await conn.updateBlockStatus(quoted.sender, 'unblock');
        reply(`✅ User unblocked: ${quoted.sender.split('@')[0]}`);
    } catch (error) {
        reply(`❌ Unblock failed: ${error.message}`);
    }
});

// 6. Clear All Chats (Safer Implementation)
cmd({
    pattern: "clearchats",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    try {
        const chats = conn.chats.all();
        let deletedCount = 0;
        
        for (const chat of chats) {
            try {
                await conn.modifyChat(chat.jid, 'delete');
                deletedCount++;
            } catch (e) {
                console.error(`Failed to delete chat ${chat.jid}:`, e);
            }
        }
        reply(`🧹 Deleted ${deletedCount}/${chats.length} chats.`);
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

// 7. Get Bot JID
cmd({
    pattern: "jid",
    desc: "Get the bot's JID.",
    category: "owner",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    reply(`🤖 *Bot JID:* ${conn.user.jid}`);
});

// 8. Group JIDs List (Improved Formatting)
cmd({
    pattern: "gjid",
    desc: "Get the list of JIDs for all groups the bot is part of.",
    category: "owner",
    react: "📝",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    try {
        const groups = await conn.groupFetchAllParticipating();
        const groupList = Object.keys(groups).map(jid => `➤ ${jid.replace('@s.whatsapp.net', '')}`).join('\n');
        reply(`📝 *Groups (${Object.keys(groups).length})*:\n\n${groupList}`);
    } catch (error) {
        reply(`❌ Failed to fetch groups: ${error.message}`);
    }
});
