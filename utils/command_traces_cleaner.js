const { bot } = require("../init");

async function deleteCommandMessage(msg) {
  console.log(bot);
  await bot.deleteMessage(
    msg.chat.id,
    msg.message_id
  )
}

module.exports.default = deleteCommandMessage;
