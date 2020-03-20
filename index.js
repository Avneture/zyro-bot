const commando = require("discord.js-commando");
const Discord = require("discord.js");
const prefix = ".";
const bot = new commando.Client({
    commandPrefix: prefix
});

bot.login(process.env.token);

bot.on('ready',function(){
    console.log(`Bot is now online @ Zyro Network Discord, with ${bot.users.size} users.`);
    bot.user.setActivity(`on zyro.cc | .status`, { type: '' });
});

bot.registry.registerGroup('network', 'Network');
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.registry.registerDefaults();

bot.on('guildMemberAdd', (member) => {
    const welcomechannel = member.guild.channels.find('name', `joins-log`);
    welcomechannel.send({embed: new Discord.RichEmbed()
        .setColor("#6a0dad")
        .setAuthor(`Welcome ${member.user.tag}`, "https://pbs.twimg.com/profile_images/1184895332108394498/e1-bRfcs_400x400.jpg")
        .setDescription(`Welcome to Zyro Network's Discord! Don't forget to read the rules! \n\n**SERVER INFORMATION** \nForums: https://zyro.cc \nStore: https://store.zyro.cc \nTwitter: https://twitter.com/zyronetwork \nServer IP: smok.gg`)
        .setThumbnail("https://pbs.twimg.com/profile_images/1184895332108394498/e1-bRfcs_400x400.jpg")
        .setFooter(" | Zyro Network Bot created by hieu#6689", "https://pbs.twimg.com/profile_images/1184895332108394498/e1-bRfcs_400x400.jpg")
        .setTimestamp()});
});

