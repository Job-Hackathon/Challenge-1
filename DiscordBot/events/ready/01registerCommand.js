const config = require('../../config.json');
const areCommandsDiffrent = require('../../utils/areCommandsDiffrent');
const getLocalCommands = require('../../utils/getLocalCommands');
const gettApplicationCommands = require('../../utils/getApplicationCommands');

module.exports = async (client) => {

    const localCommands = getLocalCommands();
    try {
        
        const localCommands = getLocalCommands();
        const applicationsCommands = await gettApplicationCommands(client, config.serverid);


        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;
        
            const existingCommand = await applicationsCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationsCommands.delete(existingCommand.id)
                    console.log(`Deleted command "${name}"`);
                    continue;
                }

                if (areCommandsDiffrent(existingCommand, localCommand)) {
                    await applicationsCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Edited Command "${name}"`)

                }

            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping Registring of command "${name}" as it's set to delete`);
                    continue;
                }

                await applicationsCommands.create({
                    name, 
                    description, 
                    options,
                });

                console.log(`Registerd command "${name}".`);

            }

        }

    } catch (error) {
        console.error(`There was an error (commandRegister): ${error}`)
    }

}