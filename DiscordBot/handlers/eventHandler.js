const getAllFiles = require("../utils/getAllFiles");
const path = require('path');


module.exports = (client) => {

    const eventsFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);
    
    for (const eventFolder of eventsFolders ) {
        const eventFiles = getAllFiles(eventFolder);
        eventFiles.sort((a,b) => a > b);
     
        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

        client.on(eventName, async (arg) => {
            for (const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg)
            }
        });

    }

};