const Discord = require('discord.js');
const db = require('croxydb');
const client = new Discord.Client();
const veri = require("../modloff/modloff-veri.json");
const sistem = require("../modloff/modloff-ayar.json");

module.exports = {
    name: 'isim',
    aliases: ['isim', 'nick', 'name', 'i'],
    run: async(client, message, args) => {

        if(!client.veri.üstyt.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send("`Bu Komut İçin Yetkin Yok.`").then(x => x.delete({timeout: 5000}))
        }
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("`Lütfen geçerli bir kullanıcı belirt.`").then(x => x.delete({timeout: 5000}))
      
        let name = args[1]
        if (!name) return message.channel.send("`Lütfen geçerli bir isim belirt.`").then(x => x.delete({timeout: 5000}))

        let age = args[2]
        if (!age) return message.channel.send("`Lütfen geçerli bir yaş belirt.`").then(x => x.delete({timeout: 5000}))

        message.guild.members.cache.get(member.id).setNickname(`${veri.sunucutagı} ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (isim değiştirme)`);
        message.channel.send(`${member} adlı kullanıcının ismi \`${name} | ${age}\` olarak değiştirildi.`).then(x => x.delete({timeout: 10000}))
        message.react(veri.emojiler.onay).catch();

        
    }
}