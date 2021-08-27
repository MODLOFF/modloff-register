const db = require('croxydb');
const Discord = require('discord.js');
const client = new Discord.Client();
const veri = require("../modloff/modloff-veri.json");
const sistem = require("../modloff/modloff-ayar.json");


module.exports = {
    name: 'say',
    aliases: ['say'],
    run: async(client, message, args) => {
        if(!veri.üstyt.some(id => message.member.roles.cache.has(id)) && !veri.altyt.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 5000 }));
        const mapping = {
            '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`,                  
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`,
        };
        var boost1 = veri.booosters
        var tag1 = `${veri.sunucutagı}`
        const emoji = `${client.emojis.cache.get(veri.emojiler.hg)}`
        var etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == `${veri.etikettagı}`).size;
        var toplamAile = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == `${veri.etikettagı}`).size;
        var toplamüye = message.guild.memberCount
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var tag = message.guild.members.cache.filter(a => a.user.username.includes(tag1)).size
        var boost = message.guild.members.cache.filter(r=>r.roles.cache.has(boost1)).size
        var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
        var emoonline = `${online}`.split("").map(c => mapping[c] || c).join("")
        var emotag = `${tag}`.split("").map(c => mapping[c] || c).join("")
        var emoses = `${Sesli}`.split("").map(c => mapping[c] || c).join("")
        var emoetiket = `${etiket}`.split("").map(c => mapping[c] || c).join("")
        var emoboost = `${boost}`.split("").map(c => mapping[c] || c).join("")
        var emotoplam = `${toplamAile}`.split("").map(c => mapping[c] || c).join("")

        const embed = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))   
            .setDescription(`
            ${emoji} **Sunucumuz da** ${emotoplamüye} **kişi bulunmakta.**
            ${emoji} **Sunucumuz da** ${emoonline} **aktif kişi bulunmakta.**
            ${emoji} **Sunucumuz da** ${emotag} **taglı üye bulunmakta.**
            ${emoji} **Sunucumuzu boostlayan** ${emoboost} **kişi bulunmakta.**
            ${emoji} **Ses kanallarında** ${emoses} **kişi bulunmakta.**
            `)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setFooter('MODLOFF')
        message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
        message.react(veri.emojiler.onay).catch();
    }
}