const debug = require('debug')('jobs-bot:publishVacancy');
const config = require('config');

const bot = require('../bot');
const {
  isVacancy, isChatAdmin, isKeyword, isReply,
} = require('../validators');

const keywords = new Set(['канал', 'в канал']);

const escapeMarkdown = txt => txt.replace(/_/g, '\\_');

const formatAnnonce = (messageId, channel, { userId, userFirstName, username }) => {
  const channelName = channel.replace('@', '');
  const escapedChannelName = escapeMarkdown(channelName);
  const link = `[Вакансия](https://t.me/${channelName}/${messageId})`;
  const user = username ? `@${username}` : `[${userFirstName}](tg://user?id=${userId})`;

  return ` 🏌️ ${link} от ${escapeMarkdown(user)} опубликована в @${escapedChannelName}`;
};

const formatVacancy = (txt, chatName) => `
${txt}

—

👉 Обсуждение вакансии в чате @${chatName}
`;

async function publish(msg) {
  const { channel } = config.get(msg.chat.username);

  debug('publish', msg, channel);

  const commandMessageId = msg.message_id;
  // const vacancyMessageId = msg.reply_to_message.message_id;

  // send to channel
  const channelMessage = formatVacancy(msg.reply_to_message.text, msg.chat.username);
  const { message_id: channelMessageId } = await bot.sendMessage(channel, channelMessage);
  debug('publish:channelMessage', channelMessage);
  debug('publish:channelMessageId', channelMessageId);

  // send link from channel to chat
  const { id: userId, first_name: userFirstName, username } = msg.reply_to_message.from;
  const replyMessage = formatAnnonce(channelMessageId, channel, {
    userId,
    userFirstName,
    username,
  });

  const { message_id: chatMessageId } = await bot.sendMessage(msg.chat.id, replyMessage, {
    parse_mode: 'Markdown',
  });

  debug('publish:replyMessage', replyMessage);
  debug('publish:chatMessageId', chatMessageId);

  // delete messages
  await bot.deleteMessage(msg.chat.id, commandMessageId);
  // await bot.deleteMessage(msg.chat.id, vacancyMessageId);
}

async function handler(msg) {
  try {
    if (isReply(msg) && isVacancy(msg) && isKeyword(msg, keywords) && isChatAdmin(msg)) {
      await publish(msg);
    }
  } catch (err) {
    debug('handler:error', err, msg);
  }
}

module.exports = handler;
