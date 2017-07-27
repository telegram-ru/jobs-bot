const opts = require('optimist').argv;
const TelegramBot = require('node-telegram-bot-api');

const token = opts.token;
const channel = opts.channel;

const bot = new TelegramBot(token, {polling: true});
const botName = '@javascript_jobs_publisher_bot';
const channels = new Map();

async function setChannelId() {
  console.log('setChannelId');
  try {
    const {id} = await bot.getChat(channel);
    channels.set(channel, id);
  } catch (err) {
    console.warn('setChannelId', err)
  }
}

module.exports.bot = bot;
module.exports.channelId = () => channels.get(channel);
module.exports.name = botName;
module.exports.setChannelId = setChannelId;
module.exports.channel = channel;
