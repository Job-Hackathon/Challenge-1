module.exports = async (client, guildId) => {

    let applicationsCommands;

    if (guildId) {
        const guild = await client.guilds.fetch(guildId);
        applicationsCommands = guild.commands;
    } else {
        applicationsCommands = await client.application.commands;
    }

    await applicationsCommands.fetch();
    return applicationsCommands;

};