const Discord = require('discord.js');
const db = require('croxydb');
client = new Discord.Client();
const veri = require("../modloff/modloff-veri.json");
const sistem = require("../modloff/modloff-ayar.json");

module.exports = {
    name: 'taglıalım',
    aliases: ['taglıalım'],
    run: async (client, message, args) => {


        if(!veri.üstyt.some(id => message.member.roles.cache.has(id)) && !veri.altyt.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 5000 }))

        if (!args[0]) {
            message.channel.send(` ${client.emojis.cache.get(veri.emojiler.iptal)} Yanlış kullanım doğrusu \n\n ${sistem.prefixx}taglıalım aç/kapat` ).then(x => x.delete({ timeout: 10000 }))
            return;
        }
        if (args[0] === "aç") {
            if (db.fetch(`taglıAlım.${message.guild.id}`))
                return message.channel.send(`${client.emojis.cache.get(veri.emojiler.iptal)} Taglı alım sistemi zaten aktif!`).then(x => x.delete({ timeout: 5000 }))
            db.set(`taglıAlım.${message.guild.id}`, "taglıAlım");
            message.channel.send(`${client.emojis.cache.get(veri.emojiler.onay)} Taglı alım sistemi aktif edildi!`).then(x => x.delete({ timeout: 5000 }))
            return;
        } else if (args[0] === "kapat") {
            if (!db.fetch(`taglıAlım.${message.guild.id}`))
                return message.channel.send(`${client.emojis.cache.get(veri.emojiler.onay)} Taglı alım sistemi zaten devre dışı!`).then(x => x.delete({ timeout: 5000 }))
            db.delete(`taglıAlım.${message.guild.id}`);
            message.channel.send(`${client.emojis.cache.get(veri.emojiler.onay)} Taglı alım sistemi devre dışı bırakıldı!`).then(x => x.delete({ timeout: 5000 }))
            return;
        };
    }

}