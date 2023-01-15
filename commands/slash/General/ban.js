const Discord = require("discord.js")



module.exports = {

  name: "banir", // Coloque o nome do comando

  description: "Banir um usuário do seu servidor", // Coloque a descrição do comando

  type: Discord.ApplicationCommandType.ChatInput,

  permissions: ['Administrator'],

  options: [

    {

        name: "usuario",

        description: "Mencione alguém para ser banido.",

        type: Discord.ApplicationCommandOptionType.User,

        required: true,

    },


    {

        name: "motivo",

        description: "Insira um motivo do banimento (opcional)",

        type: Discord.ApplicationCommandOptionType.String,

        required: false,

    }

],



  run: async (client, interaction) => {



    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {

        interaction.reply(`Você não possui a permissão **BANIR MEMBROS** para utilizar esse comando.`);

    } else {

        let userr = interaction.options.getUser("usuario");

        let user = interaction.guild.members.cache.get(userr.id)

        let motivo = interaction.options.getString("motivo");

        if (!motivo) motivo = "Não informado.";

        if (!user) return interaction.reply({ content: 'Insira um id ou usuário válido', ephemeral: true })

        let embed = new Discord.EmbedBuilder()

        .setColor("#00ff00")
        
        .setFooter({ text: 'Fatalyt® | Temos todos os direitos reservados©' })
        
         .setTimestamp()

                        .setThumbnail('https://imgur.com/HBkNyYD.gif')
        
        .setTitle("✅ - **__Usuário Banido com Sucesso__**")
        
        .setDescription(`
> ⚙️ **Usuário:** 
${user}

> 📝 **ID do usuário:** 
${user.id}
 
> 💭 **MOTIVAÇÃO**
${motivo}

> 📅 **TEMPO** 
Permanente 

> 👨‍🔧 **Autor:** 
${interaction.user} 
`);

        let erro = new Discord.EmbedBuilder()

        .setColor("#ff0000")

        .setDescription(`Não foi possível banir o usuário ${user} (\`${user.id}\`) do seu servidor!`);



        user.ban({ reason: [motivo] }).then( () => {

            interaction.reply({ embeds: [embed] })

        }).catch(e => {

            interaction.reply({ embeds: [erro] })

        })

    }



  }

}