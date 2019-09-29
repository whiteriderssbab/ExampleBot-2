const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    message.delete();

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("That user does not exist here!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You lack the permissions :x:");
    if(kUser.hasPermission('KICK_MEMBERS')) return message.channel.send("That person can't be kicked.");
  kUser.kick({
          reason: kReason,
        }).then(() => {
    let kickEmbed = new Discord.RichEmbed()
   .setDescription("Kick Log")
    .setColor("RANDOM")
    .addField("Kicked by:", `${message.author}`)
    .addField("In server:", `${message.guild.name}`)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    
    message.channel.send(`${kUser} Has been kicked.`);
   kUser.send(kickEmbed)

})
}

module.exports.help = {
    name: "kick"
}
