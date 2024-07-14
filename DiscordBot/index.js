const { Client, IntentsBitField } = require('discord.js');
const keys = require('./keys.json');
const eventHandler = require('./handlers/eventHandler');


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

eventHandler(client);

client.login(keys.token);