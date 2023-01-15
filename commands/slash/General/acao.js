const Discord = require("discord.js")
const moment = require("moment")
const { ApplicationCommandOptionType, ActionRowBuilder, EmbedBuilder, ComponentType } = require('discord.js');


module.exports = {
    name: "check-acao",
    description: "Check de ação",
    type: 1,
    permissions: [],
    options: [
        {
            name: "acao",
            description: "Informe a ação",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "escalado",
            description: "Quem escalou?",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "escalados",
            description: "Escalados:",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction, options, message) => {

        let amount1 = interaction.options.getString("acao");
        let amount2 = interaction.options.getUser("escalado");
        let amount3 = interaction.options.getString("escalados");

        var canal = client.channels.cache.get(interaction.channel.id)
        interaction.reply('.').then(msg => interaction.deleteReply())
        let Derrota = new ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId("Derrota")
                .setLabel("Derrota")
                .setStyle("Danger")
        )
        let Ganha = new ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId("Ganha")
                .setLabel("Vitoria")
                .setStyle("Success")
        )
        let name = interaction.options.getChannel("id")

        let embed = new EmbedBuilder()
            .setAuthor({ name: "Ação Iniciada" })
            .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .setFields(
                { name: "**Ação:**", value: `${amount1}`, inline: false },
                { name: "**Escalado:**", value: `${amount2}`, inline: false },
                { name: "**Escalados:**", value: `${amount3}`, inline: false },
                { name: "**Iniciou:**", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                { name: "**Finalizou:**", value: 'Ação ainda não foi finalizada', inline: true },
            )
            .setColor("0x151515")
        const msg = await canal.send({ embeds: [embed], components: [Derrota, Ganha] })

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button })

        collector.on('collect', async (i) => {

            if (i.user.id != interaction.user.id) return collected.reply({ content: `❌ \`|\` **Somente a pessoa que executou o comando (\`${interaction.user.tag}\`) pode interagir com ele.**`, ephemeral: true });

            let dataAtual = new Date(); //variável recebe a data atual
            let hora = dataAtual.toLocaleString('pt-BR', {day: 'numeric', month:'numeric', year: "numeric", hour: 'numeric', minute: "numeric", second: "numeric", hour12: false, timeZone: 'America/Sao_Paulo' });  //variavel pega hora dia mes minuto de sao paulo atual

            if (i.customId === "Derrota") {
                const derrota = new EmbedBuilder()
                    .setAuthor({ name: "Derrota" })
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
                    .setFields(
                        { name: "**Ação:**", value: `${amount1}`, inline: false },
                        { name: "**Escalado:**", value: `${amount2}`, inline: false },
                        { name: "**Escalados:**", value: `${amount3}`, inline: false },
                        { name: "**Iniciou:**", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                        { name: "**Finalizou:**", value: `${hora}`, inline: true },
                    )
                    .setColor("0x151515")
                i.update({
                    embeds: [derrota],
                    components: []
                })
                interaction.reply({content: ``})
            }

            if (i.customId === "Ganha") {
                const Ganha = new EmbedBuilder()
                    .setAuthor({ name: "Vitoria" })
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
                    .setFields(
                        { name: "**Ação:**", value: `${amount1}`, inline: false },
                        { name: "**Escalado:**", value: `${amount2}`, inline: false },
                        { name: "**Escalados:**", value: `${amount3}`, inline: false },
                        { name: "**Iniciou:**", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                        { name: "**Finalizou:**", value: `${hora}`, inline: true },
                    )
                    .setColor("0x151515")
                i.update({
                    embeds: [Ganha],
                    components: []
                })
                interaction.reply({content: ``})
            }

        })
    }
};