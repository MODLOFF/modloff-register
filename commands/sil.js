const db = require('croxydb');
const Discord = require('discord.js');
const client = new Discord.Client();
const veri = require("../modloff/modloff-veri.json");
const sistem = require("../modloff/modloff-ayar.json");
module.exports = {
    name: 'sil',
    aliases: ['sil'],
    run: async function (client, message, args) {
        if(!veri.üstyt.some(id => message.member.roles.cache.has(id)) && !veri.altyt.some(id => message.member.roles.cache.has(id)) && !message.member.hasPermission('ADMINISTRATOR'))
            return message.channel.send(" `Yeterli Yetkiniz Yok.` ").then(msg => msg.delete({ timeout: 5000 }));
        if (!args[0])
            return message.channel.send(" `Lütfen siliceğim mesaj miktarını girin.` ").then(msg => msg.delete({ timeout: 5000 }));
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(` \` ${args[0]} Adet mesaj silindi\` `).then(msg => msg.delete({ timeout: 5000 }));
            message.react(veri.emojiler.onay).catch();

        });
    }
};

