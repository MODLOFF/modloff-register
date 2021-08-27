const Discord = require('discord.js');
const db = require('croxydb');
client = new Discord.Client();
const veri = require("../modloff/modloff-veri.json");
const sistem = require("../modloff/modloff-ayar.json");

module.exports = {
    name: 'vip',
    aliases: ['special', 'vip'],
    run: async(client, message, args) => {

        if(!veri.üstyt.some(id => message.member.roles.cache.has(id)) && !veri.altyt.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 10000 }))

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("`Lütfen geçerli bir kullanıcı belirt.`").then(msg => msg.delete({ timeout: 10000 }))

        await message.guild.members.cache.get(member.id).roles.add(veri.viprolü)
        message.channel.send("`Rol verilmiştir.`").then(msg => msg.delete({ timeout: 10000 }))

    }
}