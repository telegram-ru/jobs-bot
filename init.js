const opts = require('optimist').argv;
const TelegramBot = require('node-telegram-bot-api');

const token = opts.token;
const channelId = opts.channel;

const bot = new TelegramBot(token, {polling: true});
const botName = '@javascript_jobs_publisher_bot';

module.exports.bot = bot;
module.exports.channelId = channelId;
module.exports.name = botName;
