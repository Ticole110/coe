const Discord = require("discord.js")
const moment = require("moment")
const { ApplicationCommandOptionType, ActionRowBuilder, EmbedBuilder, ComponentType } = require('discord.js');


module.exports = {
    name: "patrulha",
    description: "Marcar sua ptr",
    type: 1,
    permissions: [],
    options: [
        {
            name: "badge",
            description: "Informe o numero da VTR.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "pessoal",
            description: "Informe o nome e id dos agentes COE: Haridade - 297 ...",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction, options, message) => {

        let amount1 = interaction.options.getInteger("badge");
        let amount2 = interaction.options.getString("pessoal");

        var canal = client.channels.cache.get(interaction.channel.id)
        interaction.reply('.').then(msg => interaction.deleteReply())
        let terminar = new ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId("terminar")
                .setLabel("Finalizar Ptr")
                .setStyle("Danger")
        )
        let name = interaction.options.getChannel("id")

        let embed = new EmbedBuilder()
            .setAuthor({ name: "Patrulha Iniciada" })
            .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .setFields(
                { name: "**Badge**", value: `${amount1}`, inline: false },
                { name: "**Agentes COE**", value: `${amount2}`, inline: false },
                { name: "**Iniciou:**", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                { name: "**Finalizou:**", value: 'Bate ponto ainda não finalizado', inline: true },
            )
            .setColor("0x151515")
        const msg = await canal.send({ embeds: [embed], components: [terminar] })

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button })

        collector.on('collect', async (i) => {

            if (i.user.id != interaction.user.id) return collected.reply({ content: `❌ \`|\` **Somente a pessoa que executou o comando (\`${interaction.user.tag}\`) pode interagir com ele.**`, ephemeral: true });

            let dataAtual = new Date(); //variável recebe a data atual
            let hora = dataAtual.toLocaleString('pt-BR', {day: 'numeric', month:'numeric', year: "numeric", hour: 'numeric', minute: "numeric", second: "numeric", hour12: false, timeZone: 'America/Sao_Paulo' });  //variavel pega hora dia mes minuto de sao paulo atual

            if (i.customId === "terminar") {
                const terminou = new EmbedBuilder()
                    .setAuthor({ name: "Patrulha Finalizada" })
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
                    .setFields(
                        { name: "**Badge**", value: `${amount1}`, inline: false },
                        { name: "**Agentes COE**", value: `${amount2}`, inline: false },
                        { name: "**Iniciou:**", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                        { name: "**Finalizou:**", value: `${hora}`, inline: true },
                    )
                    .setColor("0x151515")
                i.update({
                    embeds: [terminou],
                    components: []
                })
                interaction.reply({content: ``})
            }
        })
    }
};