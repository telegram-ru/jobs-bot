const { bot, channelId } = require("../init");
const {
  isVacancy,
  isCV,
  isChannelAdmin,
  isKeyword,
  isReply
} = require("../validators");
const deleteCommandMessage = require("../utils/command_traces_cleaner").default;

const keywords = new Set(["в канал"]);

async function publishVacancy(msg) {
  console.log("publishVacancy");
  const replyText =
    "Вакансия опубликована в " + process.env.APP_TELEGRAM_CHANNEL;
  await bot.forwardMessage(
    channelId(),
    msg.chat.id,
    msg.reply_to_message.message_id
  );
  await bot.sendMessage(msg.chat.id, replyText, {
    reply_to_message_id: msg.reply_to_message.message_id
  });
  await deleteCommandMessage(msg);
}

async function activator(msg) {
  try {
    if (
      isReply(msg) &&
      (isVacancy(msg) || isCV(msg)) &&
      isKeyword(msg, keywords) &&
      isChannelAdmin(msg)
    ) {
      await publishVacancy(msg);
    }
  } catch (err) {
    console.warn("publishVacancy", err, msg);
  }
}

module.exports.activator = activator;
