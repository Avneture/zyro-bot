const commando = require('discord.js-commando');
const Discord = require('discord.js');
const prefix = ".";
const bot = new commando.Client({
    commandPrefix: prefix
});

class statusCommand extends commando.Command {
    constructor(client)
    {
      super(client, {
        name: 'status',
        group: 'network',
        memberName: 'status',
        description: 'Shows the status of the Zyro Network'
      });
    }

    async run(message)
    {
    
        var request = require("request");
        var mcIP = "zyro.cc";
        var mcPort = "25565";

        var url = "http://mcapi.us/server/status?ip=" + mcIP + "&port" + mcPort;
        request(url, function(err, response, body) {
            if (err) message.channel.send(err);

            body = JSON.parse(body);

            if(body.players.now){
                message.channel.send({embed: new Discord.RichEmbed()
                    .setColor("#6a0dad")
                    .setDescription(`\n:video_game: | The **ZYRO NETWORK** is currently online with **${body.players.now}** \n\n*:pushpin: connect via. zyro.cc*`)
                    .setThumbnail("https://pbs.twimg.com/profile_images/1184895332108394498/e1-bRfcs_400x400.jpg")
                    .setFooter(`${message.author.username} | Zyro Network Bot created by hieu#6689`, `${message.author.displayAvatarURL}`)
                    .setTimestamp()})
            }
            if(!body.players.now){
                message.channel.send({embed: new Discord.RichEmbed()
                    .setColor("#6a0dad")
                    .setDescription(`\n:beach_umbrella:  | The **ZYRO NETWORK** is currently **OFFLINE**. \n\n*:hourglass_flowing_sand: please check back soon!*`)
                    .setThumbnail("https://pbs.twimg.com/profile_images/1184895332108394498/e1-bRfcs_400x400.jpg")
                    .setFooter(`${message.author.username} | Zyro Network Bot created by hieu#6689`, `${message.author.displayAvatarURL}`)
                    .setTimestamp()})
            }
        })
    }
}

module.exports = statusCommand;
