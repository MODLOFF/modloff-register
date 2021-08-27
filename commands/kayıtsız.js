const db = require('croxydb');
const Discord = require('discord.js');
const client = new Discord.Client();
const veri = require("../modloff/modloff-veri.json");
const sistem = require("../modloff/modloff-ayar.json");

module.exports = {
    name: 'kayıtsız',
    aliases: ['kayıtsız', 'unreg', 'unregister'],

    run: async(client, message, args) => {

        if(!veri.üstyt.some(id => message.member.roles.cache.has(id)) && !veri.altyt.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) 
        return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 5000 }));

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send("`Lütfen geçerli bir kullanıcı belirt.`").then(x => x.delete({timeout: 5000}))
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send("`Kullanıcı ile aynı yetkidesin yada senden yüksek.`").then(x => x.delete({timeout: 5000}))
        }
        member.roles.set(veri.kayıtsız)
        message.channel.send("`Kullanıcı kayıtsız kısmına atıldı.`").then(x => x.delete({timeout: 5000}))
        message.react(veri.emojiler.onay).catch();
        member.setNickname(`• İsim | Yaş`)
        db.delete(`isimler_${member.user.id}`)
        db.delete(`kayıt_${member.id}`)
    }
}