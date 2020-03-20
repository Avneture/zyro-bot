const Discord = require("discord.js");
const commando = require('discord.js-commando')
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class announceCommand extends commando.Command {
  constructor(client) 
  {
    super(client, {
      name: 'announce', 
      group: 'network',
      memberName: 'announce',
      description: "Announces a message in #announcements"
    });
  }

  async run (message, args)
  {
    let announcementargs = message.content.slice(prefix.length).split(/ + /); 

    let announcementmessage = announcementargs.join(" ").slice(9);

    let announcementschannel = message.guild.channels.find(`name`, "announcements");

    if(!announcementschannel) return message.channel.send("Couldn't find the `#announcements` channel.");

    if (!announcementmessage) return message.channel.send("Correct Usage: .announce `<message>`");

    var supportteamrole = message.guild.roles.find(`name`, "➥ Zyro Bot Access"); 

    if (!message.member.roles.has(supportteamrole.id)) return message.channel.send("You do not have the `➥ Zyro Bot Access` role!");

    announcementschannel.send({embed: new Discord.RichEmbed()
      .setColor("#6a0dad")
      .setDescription(`\n@everyone | **Announcement** \n\n${announcementmessage} \n\nServer IP: **zyro.cc** \nStore: **store.zyro.cc** \nDiscord: **discord.zyro.cc** \nTwitter: **twitter.com/zyronetwork**`)
      .setFooter(`${message.author.username} | Zyro Network Bot created by hieu#6689`, `${message.author.displayAvatarURL}`)
      .setTimestamp()})
    
    announcementschannel.send('@everyone')
  .then(msg => {
    msg.delete(1000)
  })
  .catch();
  }
}

module.exports = announceCommand;
