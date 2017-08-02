const http = require("http");
const { bot, channelId, setChannelId } = require("./init");
const { admins, updateAdmins } = require("./admins");
const exec = require("./commands/index");

setChannelId()
  .then(() => updateAdmins(channelId()))
  .catch(() => console.warn("Init error"))
  .then(() => {
    bot.on("message", msg => exec(msg));
  });

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end();
});

server.listen(3000);
