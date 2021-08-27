const db = require('croxydb');
const Discord = require('discord.js');
const client = new Discord.Client();
const { version } = require('moment');
const veri = require("../modloff/modloff-veri.json");
const sistem = require("../modloff/modloff-ayar.json");


module.exports = {
    name: 'isimler',
    aliases: ['isimler'],

    run: async(client, message, args) => {
        
        if(!veri.üstyt.some(id => message.member.roles.cache.has(id)) && !veri.register.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send("`Bu Komut İçin Yetkin Yok`").then(x => x.delete({timeout: 5000}));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("`Lütfen geçerli bir kullanıcı belirt.`").then(x => x.delete({timeout: 5000}))
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("`Daha önceden kayıt olmamış.`").then(x => x.delete({timeout: 5000}))
        const embed = new Discord.MessageEmbed()
            .setColor('ORANGE')
            .setTitle("Eski Kullanıcı isimleri")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`)
            .setFooter('Bir MODLOFF Harikası...')
            .setTimestamp()
        message.channel.send(embed).then(x => x.delete({timeout: 20000}))
        message.react(veri.emojiler.onay).catch();
    }
}