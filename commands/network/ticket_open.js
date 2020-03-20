const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class ticketCommand extends commando.Command {
    constructor(client) 
    {
      super(client, {
        name: 'new', 
        group: 'network',
        memberName: 'new',
        description: "Creates a support ticket"
      });
    }
    async run(message, args)
    {
        let reasonargs = message.content.slice(prefix.length).split(/ + /); 

        let reason = reasonargs.join(" ").slice(4);

        if (!reason) return message.channel.send("Correct Usage: .new `<ticket reason>`");
            
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.reply("You already have a ticket open!");
        message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
            let role = message.guild.roles.find("name", "All Perms"); //➥ Support Team

        if (!message.member.roles.has(role.id)) return message.channel.send("You do not have the `➥ Support` role!");

            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                 SEND_MESSAGES: true,
                 READ_MESSAGES: true
            });
            message.channel.send(`:tickets: | Your ticket has been created, #${c.name}.`);

            c.send({embed: new Discord.RichEmbed()
                .setColor("#6a0dad")
                .setDescription(`\n@everyone | **Ticket** \n\n:joystick: **INTRODUCTION** | Hey ${message.author}!, your support ticket has been created! Please explain the reason for this ticket and we will respond within 24h. Thanks for your patience. \n\n:helicopter: **REASON** | ${reason} \n\n:mailbox_with_mail: **EXTRA** | If you would like to close the ticket because it has been resolved, feel free to type ".close"`)
                .setFooter(`${message.author.username} | Zyro Network Bot created by hieu#6689`, `${message.author.displayAvatarURL}`)
                .setTimestamp()});
        }).catch(console.error);
        }
}

module.exports = ticketCommand;
