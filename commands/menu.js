async function menu(sock, msg) {
  const texto = `
『🕷️』⸺͟͞ᴍᴇɴᴜ

ᴇᴀᴇ́ @pessoa, ᴇsᴄᴏʟʜᴇ ᴀɪ ᴏ ǫᴜᴇ ᴠᴏᴄᴇ̂ ǫᴜᴇʀ ᴜsᴀʀ 👇

👑 ᴅᴏɴᴀ ᴅᴏ ʙᴏᴛ

⚙️ ᴀᴅᴍɪɴɪsᴛʀᴀᴄ̧ᴀ̃ᴏ

🛡️ ᴘʀᴏᴛᴇᴄ̧ᴀ̃ᴏ

🕷️ ᴍᴇɴᴜ ғɪɢ

🕷️ ᴍᴇɴᴜ ɢʀᴜᴘᴏ

🕷️ ᴍᴇɴᴜ ᴜsᴜᴀ́ʀɪᴏ

🕷️ ᴍᴇɴᴜ ᴅɪᴠᴇʀsᴀ̃ᴏ

🕷️ ᴍᴇɴᴜ ᴄᴏɴғɪɢ

🕷️ ᴍᴇɴᴜ ᴅᴏᴡɴʟᴏᴀᴅ

ׄ’ʙɢᴋ ʙᴏᴛ
`;

  await sock.sendMessage(msg.key.remoteJid, {
    text: texto
  });
}

module.exports = menu;