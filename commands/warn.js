const debug = require("debug")("jobs-bot:warn");
const config = require("config");

const bot = require("../bot");
const { isChatAdmin, isKeyword, isReply } = require("../validators");

const keywords = new Set(["формат"]);
const reasonToWarn = {
  тег: "нужен хэштэг #вакансия",
  адрес: "адрес или хотя бы город",
  формат: "офис или удалёнка",
  занятость: "фуллтайм, парт-тайм или фриланс",
  вилка: "зарплатная вилка обязательна с обеих сторон",
  название: "название компании или кадрового агентства",
  контакты: "контакты, по которым можно связаться"
};

function escapeMarkdown(text) {
  return text.replace(/_/g, "\\_");
}

function getReplyText(channel, reasons = []) {
  const hasErrors = reasons.length > 0;
  const channelFormatted = escapeMarkdown(channel);
  const errors = reasons
    .filter(reason => reasonToWarn[reason])
    .map(reason => `• ${reasonToWarn[reason]}`)
    .join(";\n");
  const printErrors = hasErrors ? `\n\nНужно исправить:\n${errors}` : ``;

  return `
Привет! У нас есть [правила](https://teletype.in/@telegram-ru/r1WQe5F1m) оформления вакансий и резюме.

Отредактируйте и мы его разместим в канал ${channelFormatted}, или удалим через 5-10 минут если нет.${printErrors}
`;
}

async function warn(msg) {
  const { channel } = config.get(msg.chat.username);
  const [, ...reasons] = msg.text.split(" ");

  debug("warn", msg, channel);
  debug("warn:reasons", reasons);

  await bot.sendMessage(msg.chat.id, getReplyText(channel, reasons), {
    reply_to_message_id: msg.reply_to_message.message_id,
    parse_mode: "Markdown"
  });

  await bot.deleteMessage(msg.chat.id, msg.message_id);
}

async function handler(msg) {
  const [firstWordOfMessage] = msg.text.split(" ");
  debug({ firstWordOfMessage });
  debug({ msg });

  try {
    if (
      isReply(msg) &&
      isKeyword(firstWordOfMessage, keywords) &&
      isChatAdmin(msg)
    ) {
      await warn(msg);
    }
  } catch (err) {
    debug("handler:error", err, msg);
  }
}

module.exports = handler;
