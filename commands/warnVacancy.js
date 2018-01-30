const { bot } = require("../init");
const { isChannelAdmin, isKeyword, isReply } = require("../validators");
const deleteCommandMessage = require("../utils/command_traces_cleaner").default;

const keywords = new Set(["формат"]);

const channel = process.env.APP_TELEGRAM_CHANNEL;

const replyText = `
Привет! У нас есть [правила оформления вакансий](http://telegra.ph/jobs-rules-08-11): они помогают соискателям ориентироваться, а компаниям — привлекать людей.

После этого мы постим вакансию в канал [${channel}](https://t.me/${channel}). Если не отредактировать, то удалим через 5-10 минут.
`;

async function warnVacancy(msg) {
  console.log("warnVacancy");

  await bot.sendMessage(msg.chat.id, replyText, {
    reply_to_message_id: msg.reply_to_message.message_id,
    parse_mode: "Markdown",
    disable_web_page_preview: true
  });

  await deleteCommandMessage(msg);
}

async function activator(msg) {
  try {
    if (isReply(msg) && isKeyword(msg, keywords) && isChannelAdmin(msg)) {
      await warnVacancy(msg);
    }
  } catch (err) {
    console.warn("warnVacancy", err, msg);
  }
}

module.exports.activator = activator;
