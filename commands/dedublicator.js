const { bot } = require("../init");
const { isVacancyNotReply } = require("../validators");
const { similarity } = require("../deduplicator")

const replyText = "Кажется, еще не прошло 24 часов с момомента последней публикации этой вакансии";

async function check(msg) {
  console.log("dedublicator");
  const similarities = similarity(msg);
  if (similarities.some(({ minhash, jaccard }) => (minhash > 90) || (jaccard > 90))) {
    await bot.sendMessage(msg.chat.id, replyText, {
      reply_to_message_id: msg.message_id
    });
  }
}

async function activator(msg) {
  try {
    if (isVacancyNotReply(msg)) {
      await check(msg);
    }
  } catch (err) {
    console.warn("dedublicator", err, msg);
  }
}

module.exports.activator = activator;
