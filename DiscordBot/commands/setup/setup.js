const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedAssertions } = require("discord.js")
const CustomEmbed = require("../../components/CustomEmbed")

module.exports = {
    name: 'setup',
    description: 'Setup Job Hackathon challenge-1 system',
    devOnly: false,
    //testOnly: Boolean,
    //options: Object[],
    //deleted: false,

    callback: (client, interaction) => {

        try {
            const { embed, files } = CustomEmbed("Weather App ☁️", "Challenge 1 of the hackathon by Kevin Chromik")


            const btn = new ButtonBuilder()
            .setCustomId('w')
            .setLabel('Wetterdaten Abrufen')
            .setStyle(ButtonStyle.Primary)
    
    
            const websiteButton = new ButtonBuilder()
            .setLabel('WebApp')
            .setStyle(ButtonStyle.Link)
            .setURL("http://45.93.250.193/")
    
            const row = new ActionRowBuilder()
            .addComponents(btn, websiteButton)
    
    
            interaction.reply({
                content: "Discord Bot got successfully setup!",
                ephemeral: true
            })
    
            interaction.channel.send({
                embeds: [embed],
                //files: files,
                components: [row]
            });

        } catch (e) {
            console.error(e);
        }

    },
}