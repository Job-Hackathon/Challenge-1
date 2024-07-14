const { ButtonBuilder } = require('discord.js');
const axios = require('axios');


module.exports = async (client, interaction) => {

    if (interaction.isModalSubmit() && interaction.customId == 'cw') {

        const airport = interaction.fields.getTextInputValue('airport');
        const distance = interaction.fields.getTextInputValue('distance');
        const mintemp = interaction.fields.getTextInputValue('mintemp');
        const maxtemp = interaction.fields.getTextInputValue('maxtemp');

        try {

        
    let replystr = "# Job Destiniation Finder \n";

    axios.post('http://127.0.0.1:4000/api/v1/close-airports', {
        originAirportCode: airport,
        maxRadius: distance,
        targetWeather: "test",
        minimalTemperature: mintemp,
        maximalTemperature: maxtemp
    })
    .then(response => {

        if (Array.isArray(response.data)) {
            
            response.data.forEach((item, index) => {
                
                const str = "\n**Name:** " + item.destinationAirportName + "\n"
                + "**Code:** " + item.destinationAirportCode + "\n" +
                "**Distance:** " + Math.round(item.distance) + "km\n" + 
                "**Temperatur:** " + Math.round(item.locationTemperature) + "°C\n" + 
                "**Wetter:** " + item.target_weather + "\n"
            replystr = replystr + str;
            });
    

        } 
        interaction.reply({
            content: replystr,
            ephemeral: true
        });
        
    }).catch(error => {
        interaction.reply({
            content: "Es gab einen Fehler!",
            ephemeral: true
        });
        console.error('Error:', error);
    });
    
 


        } catch(e){
            console.error(e);
        }


    }

};