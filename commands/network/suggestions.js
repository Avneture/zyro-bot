const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ">";
const bot = new commando.Client({
  commandPrefix: prefix
});
const ms = require("ms");

class suggestCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'suggest', 
      group: 'network',
      memberName: 'suggest',
      description: "Give the server some suggestions"
    });
  }

  async run(message,args)
  {
        let suggestargs = message.content.slice(prefix.length).split(/ + /); 

        let suggestmessage = suggestargs.join(" ").slice(8);

        if (!suggestmessage) return message.channel.send("Correct Usage: .suggest `<suggestion idea>`")
    
            var suggestembed = new Discord.RichEmbed()
            .setColor("#6a0dad")
            .setDescription(`\n@everyone | **Suggestion** \n\n:man_construction_worker: | ${message.author} - User ID: ${message.author.id} \n\n:bulb: | ${suggestmessage}`)
            .setFooter(`${message.author.username} | Zyro Network Bot created by hieu#6689`, `${message.author.displayAvatarURL}`)
            .setTimestamp()

            let logschannel = message.guild.channels.find(`name`, "suggestions-log");

            if(!logschannel) return message.channel.send("Couldn't find the `#suggestions-log` channel.");

            message.delete(3000);

            logschannel.send(suggestembed).then(function (message) {
                message.react("👍");
                message.react("👎");
              }).catch(function() {
                //Something
               });

        message.reply('Thanks for your suggestion(s). We will take in your suggestion(s) you within 24h');
  }
}

module.exports = suggestCommand
