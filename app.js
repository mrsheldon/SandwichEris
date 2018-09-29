const Eris = require("eris");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const fs = require('fs');

const config = require("./config.json");

var bot = new Eris(config.bot.token);

require("./utils/functions.js")(bot);

bot.commands = new Enmap();
bot.aliases = new Enmap();

const init = async () => {

    const cmdFiles = await readdir("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(f => {
        if (!f.endsWith(".js")) return;
        const response = bot.loadCommand(f);
        if (response) console.log(response);
    });

    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        const event = require(`./events/${file}`);
        bot.on(eventName, event.bind(null, bot));
        const mod = require.cache[require.resolve(`./events/${file}`)];
        delete require.cache[require.resolve(`./events/${file}`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
    });

    bot.on('error', (error) => {
        console.log(error)
    })

    bot.connect()
}

init();