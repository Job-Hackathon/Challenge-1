const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')

module.exports = async (client, interaction) => {

    if (interaction.isButton() && interaction.customId == 'w') {

        try {

            const modal = new ModalBuilder()
            .setCustomId('cw')
            .setTitle('Destination Finder')

            const Airport = new TextInputBuilder()
            .setCustomId('airport')
            .setLabel('Airport Code (IATA)')
            .setStyle(TextInputStyle.Short)

            const Entfernung = new TextInputBuilder()
            .setCustomId('distance')
            .setLabel('Entfernung (km)')
            .setStyle(TextInputStyle.Short)

            const minTeamp = new TextInputBuilder()
            .setCustomId('mintemp')
            .setLabel('min. Temp (°C)')
            .setStyle(TextInputStyle.Short)

            const maxTemp = new TextInputBuilder()
            .setCustomId('maxtemp')
            .setLabel('max. Temp (°C)')
            .setStyle(TextInputStyle.Short)

            const actionrow1 = new ActionRowBuilder().addComponents(Airport);
            const actionrow2 = new ActionRowBuilder().addComponents(Entfernung);
            const actionrow3 = new ActionRowBuilder().addComponents(minTeamp);
            const actionrow4 = new ActionRowBuilder().addComponents(maxTemp);

            modal.addComponents(actionrow1, actionrow2, actionrow3, actionrow4);

            await interaction.showModal(modal)


        } catch (e) {
            console.error("New Runtime Exception: " + e);
        }

    }

}