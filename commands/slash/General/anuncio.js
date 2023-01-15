const Discord = require("discord.js")

module.exports = {
  name: "anunciar", // Coloque o nome do comando
  description: "Envie um anuncio de forma personalizada.", // Coloque a descrição do comando
  type: 1,
  permissions: ['Administrator'],

  options: [
    {
        name: "canal",
        description: "Mencione o canal que  anuncio será enviado",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true
    },
    {
        name: "titulo",
        description: "Escreva um titulo para o anuncio.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true
    },
    {
        name: "desc",
        description: "Escreva uma descrição para o anuncio.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true  

    },
  ],
  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`Você não possui permissão para enviar um anuncio.`);
    } else {

        let canal = interaction.options.getChannel("canal")
        let titulo = interaction.options.getString("titulo")
        let desc = interaction.options.getString("desc")

        let e = new Discord.EmbedBuilder()
        .setColor('#ff0000')
        .setTitle(titulo)
        .setFooter({text: `Anúncio enviado por: ${interaction.user.tag} | RH- COE`})
        .setDescription(desc)

        canal.send({content: `@everyone`})
        canal.send({embeds: [e]})

        interaction.reply({content: `A mensagem foi enviada para ${canal} com sucesso!`, ephemeral: true})

    }
}}