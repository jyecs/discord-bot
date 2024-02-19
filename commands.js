
const prefix = "!"
const ping = require("./commands/ping.js")
const wr = require("./commands/wr.js")

const commands = {
    ping: ping,
    wr: wr,
};

module.exports = async function(message) {
    console.log("he" + message.content)
    if(!message.content.startsWith(prefix) || message.author.bot) return 

    let tokens = message.content.split(" ")
    let command = tokens.shift()
    if (command.charAt(0) === "!") {
        command = command.substring(1)
        commands[command](tokens)
    }

   } 