const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You lack permission :x:");
    if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned :x:");
bUser.ban({
          reason: bReason,
        }).then(() => {
    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban Log")
    .setColor("RANDOM")
    .addField("Banned by:", `${message.author}`)
    .addField("In server:", `${message.guild.name}`)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);
          
message.channel.send(`${bUser} has been banned.`)
    bUser.send(banEmbed);
})
}

module.exports.help = {
  name:"ban"
}
