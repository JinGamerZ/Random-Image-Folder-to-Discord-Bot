// random image folder to discord bot
// jake tanda

const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift();

    var number = -1; 
    var folder = -1; 

    if (config.folder.includes(command)) {
        folder = config.folder.indexOf(command);

        fs.readdir('./' + config.folder[folder], (err, files) => {
            number = files.length;

            if (!args.length) {
                imageNumber = Math.floor(Math.random() * number) + 1;
            } else {
                imageNumber = args[0];

                if (imageNumber > number) { 
                    return message.channel.send("Possible arguments: " + config.prefix + command + " [1-" + number + "]."); 
                }
            }

            message.channel.send ({files: ["./" + config.folder[folder] + "\\" + imageNumber + ".png"]} )
        });
    } else if (command === "random") {
        folder = Math.floor(Math.random() * config.folder.length);
        fs.readdir('./' + config.folder[folder], (err, files) => {
            number = files.length;
            imageNumber = Math.floor(Math.random() * number) + 1;
            message.channel.send ({files: ["./" + config.folder[folder] + "\\" + imageNumber + ".png"]} )
        });
    }
});

client.login(config.token);
