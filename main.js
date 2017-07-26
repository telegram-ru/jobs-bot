const bot = require('./init').bot;
const channel = require('./init').channel;
const channelId = require('./init').channelId;
const channels = require('./init').channels;
const setChannelId = require('./init').setChannelId;
const admins = require('./admins').admins;
const updateAdmins = require('./admins').updateAdmins;
const commands = require('./commands/index');

bot.on('message', async (msg) => {
  try {
    if (!channels.has(channel)) {
      await setChannelId();
      await updateAdmins(channelId())
    }
  } catch (err) {
    console.warn(err)
  }
  if (msg.chat.type === 'supergroup' && !admins.has(msg.chat.id)) {
    await updateAdmins(msg.chat.id);
  }
  try {
    commands.forEach(activator => activator(msg))
  } catch (err) {
    console.warn('main', err)
  }
});
