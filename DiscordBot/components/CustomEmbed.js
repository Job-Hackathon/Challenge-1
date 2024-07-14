const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = (
    title = "Job", 
    description = "challange-1", 
    fields = [{ name: " ", value: " " }],
    thumbnail = "attachment://logo.png",
    url = "http://45.93.250.193/", 
    color = "Yellow", 
    author = { name: "JobTeam", iconURL: "attachment://logo2.png", url: "http://45.93.250.193/" },  
    footer = { text: "JobTeam • 2024", iconURL: "attachment://logo.png" }, 
    files = [new AttachmentBuilder("assets/img/logo.png"),new AttachmentBuilder("assets/img/logo2.png")]
) => {

const embed = new EmbedBuilder()
    .setTitle(title)
    .setURL(url)
    .setAuthor(author)
    .setDescription(description)
    .setColor(color)
    .setThumbnail(thumbnail)
    .addFields(fields)
    .setFooter(footer)

    return { embed, files };
    
};