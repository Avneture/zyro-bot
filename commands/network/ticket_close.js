const Discord = require("discord.js");
const commando = require('discord.js-commando');
const prefix = ".";
const bot = new commando.Client({
  commandPrefix: prefix
});

class closeCommand extends commando.Command {
    constructor(client) 
    {
      super(client, {
        name: 'close', 
        group: 'network',
        memberName: 'close',
        description: "Closes a support ticket"
      });
    }

    async run(message, args)
    {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use this command outside of a ticket channel.`);
        message.channel.send({embed: new Discord.RichEmbed()
            .setColor("#6a0dad")
            .setDescription(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`.confirm\`. This will time out in 10 seconds and be cancelled.`)
            .setFooter(`${message.author.username} | Zyro Network Bot created by hieu#6689`, `${message.author.displayAvatarURL}`)
            .setTimestamp()})
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '.confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
    }
}

module.exports = closeCommand;
