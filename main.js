const { bot, channel, channels, channelId, setChannelId } = require('./init');
const { admins, updateAdmins } = require('./admins');
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
