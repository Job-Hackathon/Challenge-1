const { ButtonBuilder } = require('discord.js');
const axios = require('axios');


module.exports = async (client, interaction) => {

    if (interaction.isModalSubmit() && interaction.customId == 'cw') {

        const airport = interaction.fields.getTextInputValue('airport');
        const distance = interaction.fields.getTextInputValue('distance');
        const mintemp = interaction.fields.getTextInputValue('mintemp');
        const maxtemp = interaction.fields.getTextInputValue('maxtemp');

        try {

                
    axios.post('http://127.0.0.1:4000/api/v1/close-airports', {
        originAirportCode: airport,
        maxRadius: distance,
        targetWeather: "test",
        minimalTemperature: mintemp,
        maximalTemperature: maxtemp
    })
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
 


        } catch(e){
            console.error(e);
        }


    }

};