const Discord = require('discord.js');
const db = require('croxydb');
const veri = require("../modloff/modloff-veri.json");
const sistem = require("../modloff/modloff-ayar.json");
const client = new Discord.Client();

module.exports = {
    name: 'erkek',
    aliases: ['erkek', 'e', 'man', 'boy'],
    run: async(client, message, args) => {

        if(!veri.register.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send("`Bu Komut İçin Yetkin Yok`").then(x => x.delete({timeout: 5000}))
        }
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("`Lütfen geçerli bir kullanıcı belirt.`").then(x => x.delete({timeout: 5000}))
      
        let name = args[1]
        if (!name) return message.channel.send("`Lütfen geçerli bir isim belirt.`").then(x => x.delete({timeout: 5000}))

        let age = args[2]
        if (!age) return message.channel.send("`Lütfen geçerli bir yaş belirt.`").then(x => x.delete({timeout: 5000}))

        if (db.fetch(`taglıAlım.${message.guild.id}`)) {                                                             
            if(!member.user.username.includes(veri.sunucutagı) && !member.roles.cache.has(veri.viprolü) && !member.roles.cache.has(veri.booosters)) {
            message.channel.send(` ${member} \` Kayıt olmak için tag almalısınız.\``).then(x => x.delete({timeout: 10000})) 
            return;
            }
                    }; 

        message.guild.members.cache.get(member.id).setNickname(`${veri.sunucutagı} ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (Erkek Kayıt)`);
        db.set(`kayıt_${member.id}`, true)
        db.add(`erkek_${message.author.id}`, 1)
        let erkek = member.roles.cache.filter(x => x.managed).map(x => x.id).concat(veri.erkek)
        member.roles.set(erkek).catch();
        message.channel.send(`${member} adlı kullanıcı\`${name} | ${age}\` ismi ile kayıt edildi.`).then(x => x.delete({timeout: 10000}))
        message.react(veri.emojiler.onay).catch();
        

        
    }
}