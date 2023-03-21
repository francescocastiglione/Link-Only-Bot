const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const keepAlive = require("./server")

// detect links in messages
const regex = "((?:(http|https|Http|Https|rtsp|Rtsp):\\/\\/(?:(?:[a-zA-Z0-9\\$\\-\\_\\.\\+\\!\\*\\'\\(\\)"
  + "\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,64}(?:\\:(?:[a-zA-Z0-9\\$\\-\\_"
  + "\\.\\+\\!\\*\\'\\(\\)\\,\\;\\?\\&\\=]|(?:\\%[a-fA-F0-9]{2})){1,25})?\\@)?)?"
  + "((?:(?:[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}\\.)+"   // named host
  + "(?:"   // plus top level domain
  + "(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])"
  + "|(?:biz|b[abdefghijmnorstvwyz])"
  + "|(?:cat|com|coop|c[acdfghiklmnoruvxyz])"
  + "|d[ejkmoz]"
  + "|(?:edu|e[cegrstu])"
  + "|f[ijkmor]"
  + "|(?:gov|g[abdefghilmnpqrstuwy])"
  + "|h[kmnrtu]"
  + "|(?:info|int|i[delmnoqrst])"
  + "|(?:jobs|j[emop])"
  + "|k[eghimnrwyz]"
  + "|l[abcikrstuvy]"
  + "|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])"
  + "|(?:name|net|n[acefgilopruz])"
  + "|(?:org|om)"
  + "|(?:pro|p[aefghklmnrstwy])"
  + "|qa"
  + "|r[eouw]"
  + "|s[abcdeghijklmnortuvyz]"
  + "|(?:tel|travel|t[cdfghjklmnoprtvwz])"
  + "|u[agkmsyz]"
  + "|v[aceginu]"
  + "|w[fs]"
  + "|y[etu]"
  + "|z[amw]))"
  + "|(?:(?:25[0-5]|2[0-4]" // or ip address
  + "[0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\\.(?:25[0-5]|2[0-4][0-9]"
  + "|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1]"
  + "[0-9]{2}|[1-9][0-9]|[1-9]|0)\\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}"
  + "|[1-9][0-9]|[0-9])))"
  + "(?:\\:\\d{1,5})?)" // plus option port number
  + "(\\/(?:(?:[a-zA-Z0-9\\;\\/\\?\\:\\@\\&\\=\\#\\~"  // plus option query params
  + "\\-\\.\\+\\!\\*\\'\\(\\)\\,\\_])|(?:\\%[a-fA-F0-9]{2}))*)?"
  + "(?:\\b|$)";

const channelIDs = ['826965978444726283'];

// ready event (when it's connected to the server)
client.once("ready", () => {
  console.log('Logged in as ' + client.user.tag + '!');
})

// message event
client.on("messageCreate", msg => {
  if (!msg.content.match(regex) && channelIDs.includes(msg.channel.id)) {
    msg.delete();
  }
})

// client login to the server
const bot_token = process.env['TOKEN'];
keepAlive();
client.login(bot_token);