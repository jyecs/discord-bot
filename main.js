const Discord = require('discord.js');
const TOKEN = "Unavailable";
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const fs = require('fs');
client.commands = new Discord.Collection();


client.login(TOKEN);

client.once('ready', () => {
    console.log('Bot Online');
});

const commandHandler = require("./commands.js");
client.on("messageCreate", (message) =>
{
  message.channel.send(message.content)  ;
})

