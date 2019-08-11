const debug = require("debug")("jobs-bot:updateChannelAdmins");
const { setAllAdmins } = require("../admins");
const { isKeyword } = require("../validators");
const bot = require("../bot");

const keywords = new Set(["/update_admins"]);

async function handler(msg) {
  try {
    if (msg.chat.type === "private" && isKeyword(msg.text, keywords)) {
      const replyText = "Обновил всех админов";

      await Promise.all(setAllAdmins());
      await bot.sendMessage(msg.chat.id, replyText, {
        reply_to_message_id: msg.message_id
      });
    }
  } catch (err) {
    debug("handler:error", err, msg);
  }
}

module.exports = handler;
