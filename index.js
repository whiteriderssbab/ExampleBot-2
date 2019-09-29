//Consts
const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client({
	disableEveryone: true
});
const ms = require("ms");
let config = require('./config.json');
let cooldown = new Set();
let cdseconds = 5;
bot.commands = new Discord.Collection()
const db = require('quick.db')
let embed = new Discord.RichEmbed()

bot.once('ready', () => {
	console.log('Bots ready!');

});

//Command handler
const fs = require("fs")
let commandCount = 0;


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    if(props.help.aliases != null) {
      
      props.help.aliases.forEach(command => {
        bot.commands.set(command, props)
      })
      
    }
    bot.commands.set(props.help.name, props);
  });

});


bot.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type === "dm") return message.reply('Commands dont work in DMs :x:')
	if (message.guild) {
		require("./enmapFunctions/NewGuild.js")(message.guild);
		prefix = config.prefix
		if (!prefix) prefix === config.prefix
		if (!message.content.startsWith(prefix)) return;
		let messageArray = message.content.split(" ");
		let cmd = messageArray[0];
		let args = messageArray.slice(1);

		let commandfile = bot.commands.get(cmd.slice(prefix.length));
		if (commandfile) commandfile.run(bot, message, args, prefix);
	  
  
    }
})

bot.on("error", error => { console.error(error)})
bot.login(config.token);
