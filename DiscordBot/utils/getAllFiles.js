const fs = require('fs');
const path = require('path');

module.exports = (dir, foldersOnly = false) => {
    let filenames = [];

    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const filePath = path.join(dir, file.name);

        if (foldersOnly) {
            if (file.isDirectory()) {
                filenames.push(filePath);
            }
        } else {
            if (file.isFile()) {
                filenames.push(filePath);
            }
        }
    }

    return filenames;
};
