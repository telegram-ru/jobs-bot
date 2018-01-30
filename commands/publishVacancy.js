const { bot, channelId } = require("../init");
const {
  isVacancy,
  isChannelAdmin,
  isKeyword,
  isReply
} = require("../validators");
const deleteCommandMessage = require("../utils/command_traces_cleaner").default;
const { storage } = require('../storage');

const channel = process.env.APP_TELEGRAM_CHANNEL;

const keywords = new Set(["канал", "в канал"]);
const replyText = `
Вакансия опубликована в канал ${channel}, спасибо за понимание правил
`;

async function publish(msg) {
  console.log("publishVacancy");
  storage.add(msg.reply_to_message);
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
      isVacancy(msg) &&
      isKeyword(msg, keywords) &&
      isChannelAdmin(msg)
    ) {
      await publish(msg);
    }
  } catch (err) {
    console.warn("publishVacancy", err, msg);
  }
}

module.exports.activator = activator;
