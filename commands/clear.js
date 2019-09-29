const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {


if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Im sorry, You cant do that:x:");
    message.delete();
if(!args[0]) return message.channel.send("No perms");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Removed ${args[0]} messages!`).then(msg => msg.delete(5000));
    });
}

module.exports.help = {
    name: "clear",
  aliases: ["purge"]
}
