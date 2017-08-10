const { bot } = require("../init");

async function deleteCommandMessage(msg) {
  await bot.deleteMessage(
    msg.chat.id,
    msg.message_id
  )
}

module.exports.default = deleteCommandMessage;
